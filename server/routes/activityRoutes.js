const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const Activity = require("../models/Activity");
const {
  EMISSION_FACTORS,
  MONEY_FACTORS,
  UNIT_CONVERSIONS,
} = require("../constants");

// @desc    Add a new activity
// @route   POST /api/activities
// @access  Private
router.post("/", protect, async (req, res) => {
  // ... existing POST route logic remains unchanged ...
  const { type, subtype, value } = req.body;

  if (!type || !subtype || !value) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  try {
    let co2;
    let cost;
    let standardValue = value;

    if (type === "lpg" && subtype === "cylinder") {
      standardValue = value * UNIT_CONVERSIONS.lpg_cylinder_kg;
    }

    if (type === "electricity" || type === "lpg") {
      co2 = standardValue * EMISSION_FACTORS[type];
      cost = standardValue * MONEY_FACTORS[type];
    } else {
      co2 = standardValue * EMISSION_FACTORS[type][subtype];
      cost = standardValue * MONEY_FACTORS[type][subtype];
    }

    if (co2 === undefined || cost === undefined) {
      return res
        .status(400)
        .json({ message: "Invalid activity type or subtype" });
    }

    const activity = new Activity({
      user: req.user._id,
      type,
      subtypes: { name: subtype },
      value,
      co2: co2.toFixed(2),
      cost: cost.toFixed(2),
    });

    const createdActivity = await activity.save();
    res.status(201).json(createdActivity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Get logged-in user's activities
// @route   GET /api/activities
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
// @desc    Get user's activity summary for the last 7 days
// @route   GET /api/activities/summary/week
// @access  Private
router.get("/summary/week", protect, async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const summary = await Activity.aggregate([
      { $match: { user: req.user._id, createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalCO2: { $sum: "$co2" },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, date: "$_id", totalCO2: 1 } },
    ]);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
// @desc    Get user's activity summary for the last 30 days
// @route   GET /api/activities/summary/month
// @access  Private
router.get("/summary/month", protect, async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const summary = await Activity.aggregate([
      { $match: { user: req.user._id, createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: "$type",
          totalCO2: { $sum: "$co2" },
        },
      },
      { $project: { _id: 0, type: "$_id", totalCO2: 1 } },
    ]);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
// @desc    Get user's activity summary
// @route   GET /api/activities/summary
// @access  Private
router.get("/summary", protect, async (req, res) => {
  try {
    const summary = await Activity.aggregate([
      // Stage 1: Match documents for the logged-in user
      {
        $match: { user: req.user._id },
      },
      // Stage 2: Group by activity type and sum the co2 and cost
      {
        $group: {
          _id: "$type", // Group by the 'type' field (e.g., 'transport', 'food')
          totalCO2: { $sum: "$co2" },
          totalCost: { $sum: "$cost" },
        },
      },
      // Stage 3: (Optional) Rename _id to 'type' for a cleaner output
      {
        $project: {
          _id: 0,
          type: "$_id",
          totalCO2: 1,
          totalCost: 1,
        },
      },
    ]);

    res.json(summary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;
