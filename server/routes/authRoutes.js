const express = require("express");
const router = express.Router();

// @desc    Register a new user
// @route   POST /api/auth/signup
router.post("/signup", (req, res) => {
  res.json({ message: "User signup route" });
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
router.post("/login", (req, res) => {
  res.json({ message: "User login route" });
});

module.exports = router;
