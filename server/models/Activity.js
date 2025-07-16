const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Establishes a connection to the User model
    },
    type: {
      type: String,
      required: true,
      enum: ["transport", "electricity", "food", "water", "lpg"],
    },
    // This flexible field can store specific details for each type
    subtypes: {
      type: Map,
      of: String,
    },
    // The value entered by the user
    value: {
      type: Number,
      required: true,
    },
    // The calculated CO2 emission for this activity
    co2: {
      type: Number,
      required: true,
    },
    // The calculated monetary cost for this activity
    cost: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
