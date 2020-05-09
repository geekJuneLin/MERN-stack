const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const User = require("../../models/User");

// @route   POST /api/users
// @desc    Register new user
// @access  Public
router.route("/").post((req, res) => {
  const { name, password, email } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400).json({ error: "please enter all fields!" });
  }

  // Check user
  User.findOne({ email }).then((user) => {
    if (user) {
      res.status(400).json({ error: `user already exists!` });
    }
  });

  var newUser = new User({
    name: name,
    password: password,
    email: email,
  });

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      if (err) throw err;
      newUser.password = hash;
      newUser.save().then((user) => {
        jwt.sign(
          {
            id: user.id,
          },
          config.get("jwtSecret"),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user,
            });
          }
        );
      });
    });
  });
});

// @route   POST /api/users/auth
// @desc    Get the user
// @access  Private
router.route("/auth").get(auth, (req, res) => {
  console.log(req);
  res.status(400).json({ success: true });
});

module.exports = router;
