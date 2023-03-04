const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user");

const router = new express.Router();

router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    let user = new User({
      email: req.body.email,
      password: hashedPassword,
      type: req.body.type,
    });
    user = await user.save();
    res.status(201).json({
      message: "User created",
      type: user.type,
      id: user._id,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    //console.log(user);
    if (!user) {
      res.status(401).json({
        message: "Auth failed!",
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
      res.status(200).json({
        message: "Login Successful",
        type: user.type,
        id: user._id,
      });
    } else {
      res.send("Invalid Password!");
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
