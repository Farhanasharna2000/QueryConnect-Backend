const express = require("express");
const router = express.Router();
const User=require("../models/User")

// Save user after registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, photoURL } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "User already exists" });
    }

    const newUser = new User({ name, email, photoURL });
    await newUser.save();
    res.status(201).json({ message: "User saved to DB" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
