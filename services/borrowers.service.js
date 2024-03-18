const Model = require("../models/borrowers.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class BorrowerService {
  static async getAllBorrowers() {
    return await Model.getAllBorrowers();
  }

  static async addBorrower(borrowerInfo) {
    return await Model.insertBorrower(borrowerInfo);
  }

  static async updateBorrower(email, borrowerInfo) {
    return await Model.updateBorrower(email, borrowerInfo);
  }

  static async deleteBorrower(email) {
    return await Model.deleteBorrower(email);
  }

  static async searchBorrower(email) {
    return await Model.searchBorrower(email);
  }
}

module.exports = BorrowerService;
