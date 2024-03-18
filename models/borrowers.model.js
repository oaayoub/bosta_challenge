const postgresClient = require("../clients/postgresClient");
const borrowerHelper = require("../helpers/borrower.helper");
class Model {
  static async getAllBorrowers() {
    const data = await postgresClient.query("SELECT * FROM borrower");
    console.log("borrowers data", data);
    const books = data.rows;
    return books;
  }

  static async insertBorrower(borrowerInfo) {
    console.log("🧔borrower model", borrowerInfo);
    await postgresClient.query(
      "INSERT INTO borrower (email, name) VALUES ($1, $2)",
      [borrowerInfo.email, borrowerInfo.name]
    );
    console.log("🧔Inserted data succeffly");
  }

  static async deleteBorrower(email) {
    let result = await postgresClient.query(
      `DELETE FROM borrower WHERE email = '${email}';`
    );
    return result;
  }

  static async updateBorrower(email, updates) {
    const sqlCommand = borrowerHelper(email, updates);
    console.log("🧔 modify borrower SQL🖌: \n", sqlCommand);
    const data = await postgresClient.query(sqlCommand);
    console.log("🧔 modify borrower result🖌: \n", data);
    return data;
  }
}

module.exports = Model;
