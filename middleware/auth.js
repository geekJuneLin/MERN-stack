const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json({ error: "no token, no authorisation!" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // Add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: "token is not found!" });
  }
}

module.exports = auth;
