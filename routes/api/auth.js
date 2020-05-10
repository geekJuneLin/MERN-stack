const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const User = require("../../models/User");

// @route   POST /api/auth
// @return  {token, user}
// @desc    Autheticate the user
// @access  Public
router.route("/").post((req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    res.status(400).json({ error: "please enter all the fields!" });
  }

  // Check existing user
  User.findOne({ email }).then((user) => {
    if (!user) res.status(400).json({ error: "User does not exist!" });

    // Validating password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ error: "password does not match!" });

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

// @route   GET /api/auth/user
// @desc    Get the user info by the provided token
// @access  Private
router.route("/user").get(auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
