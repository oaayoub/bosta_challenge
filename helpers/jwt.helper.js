const jwt = require("jsonwebtoken");

function generateBorrowerToken(borrowerInfo) {
  const payload = { email: borrowerInfo.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "4d",
  });
  return token;
}

module.exports = generateBorrowerToken;
