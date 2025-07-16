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

module.exports = router;
