const { postgresClient } = require("../clients/index");
const { createBorrowerModifyQuery } = require("../helpers/updateQuery.helper");
const getCurrentLine = require("get-current-line");
const InternalError = require("../Error/InternalServer.error");

class BorrowersModel {
  static async getAllBorrowers() {
    try {
      const data = await postgresClient.query(`
      SELECT *
      FROM borrower
      `);
      console.log("borrowers data", data);
      const books = data.rows;
      return books;
    } catch (err) {
      console.log("🔴\nmy object: %o\n🔴", getCurrentLine.default());
      throw new InternalError(`🧔⭕DB ERROR :  ${bookData}  not working`);
    }
  }

  static async insertBorrower(borrowerInfo) {
    try {
      console.log("🧔borrower model", borrowerInfo);
      await postgresClient.query(
        `
        INSERT 
        INTO borrower (email, name)
        VALUES ($1, $2)
         `,
        [borrowerInfo.email, borrowerInfo.name]
      );
      console.log("🧔Inserted data succeffly");
    } catch (err) {
      console.log("🔴\nmy object: %o\n🔴", getCurrentLine.default());
      throw new InternalError(`🧔⭕DB ERROR :  ${bookData}  not working`);
    }
  }

  static async deleteBorrower(email) {
    try {
      let result = await postgresClient.query(
        `
        DELETE
        FROM borrower
        WHERE email = $1';
        `,
        [email]
      );
      return result;
    } catch (err) {
      console.log("🔴\nmy object: %o\n🔴", getCurrentLine.default());
      throw new InternalError(`🧔⭕DB ERROR :  ${bookData}  not working`);
    }
  }

  static async updateBorrower(email, updates) {
    try {
      const sqlCommand = createBorrowerModifyQuery(email, updates);
      console.log("🧔 modify borrower SQL🖌: \n", sqlCommand);
      const data = await postgresClient.query(sqlCommand);
      console.log("🧔 modify borrower result🖌: \n", data);
      return data;
    } catch (err) {
      console.log("🔴\nmy object: %o\n🔴", getCurrentLine.default());
      throw new InternalError(
        `🧔⭕DB ERROR :  ${(email, updates)}  not working`
      );
    }
  }

  static async searchBorrower(email) {
    try {
      const data = await postgresClient.query(
        `
        SELECT *
        FROM borrower 
        WHERE email = $1;`,
        [email]
      );
      const books = data.rows;
      return books;
    } catch (err) {
      console.log("🔴\nmy object: %o\n🔴", getCurrentLine.default());
      throw new InternalError(`🧔⭕DB ERROR :  ${bookData}  not working`);
    }
  }
}

module.exports = BorrowersModel;
