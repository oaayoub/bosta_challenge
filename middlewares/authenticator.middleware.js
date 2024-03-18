const jwt = require("jsonwebtoken");
require('dotenv').config()

function authenticate(req, res, next) {
  var token = req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("decoded email 🔑: ",decoded.email)
    req.email = decoded.email;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authenticate;
