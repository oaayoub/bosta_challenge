const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticator(req, res, next) {
  try {
    console.log("/borrowers".includes(req.url))
    console.log(req.url)
    if ("/borrowers".includes(req.url) && req.method === "POST") {
      next();
    } else {
      var token = req.headers.authorization.split(" ")[1];
      if (!token) return res.status(401).json({ error: "Access denied" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log("decoded email 🔑: ", decoded.email);
      req.email = decoded.email;
      next();
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = {authenticator};
