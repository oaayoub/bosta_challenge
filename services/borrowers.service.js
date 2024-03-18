const Model = require("../models/borrowers.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class Service {
  static async getAllBorrowers() {
    return await Model.getAllBorrowers();
  }

  static async addBorrower(borrowerInfo) {
    return await Model.insertBorrower(borrowerInfo);
  }

  static generateBorrowerToken(borrowerInfo) {
    const payload = { email: borrowerInfo.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    return token
  }
}

module.exports = Service;
