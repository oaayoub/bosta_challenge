const BorrowersModel = require("../models/borrowers.model");

require("dotenv").config();

class BorrowerService {
  static async getAllBorrowers() {
    return await BorrowersModel.getAllBorrowers();
  }

  static async addBorrower(borrowerInfo) {
    return await BorrowersModel.insertBorrower(borrowerInfo);
  }

  static async updateBorrower(email, borrowerInfo) {
    return await BorrowersModel.updateBorrower(email, borrowerInfo);
  }

  static async searchBorrower(email) {
    return await BorrowersModel.searchBorrower(email);
  }
}

module.exports = BorrowerService;
