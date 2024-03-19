const { postgresClient } = require("../clients/index");
const getCurrentLine = require("get-current-line");
const InternalError = require("../Error/InternalServer.error");

class ReservationsModel {
  static async getAllReservations() {
    try {
      const data = await postgresClient.query(`
      SELECT * 
      FROM borrow_books
      `);
      const reservations = data.rows;
      return reservations;
    } catch (err) {
      console.log("🔴\nmy object: %o\n🔴", getCurrentLine.default());
      throw new InternalError(
        `🔖⭕DB ReservationsModel ERROR : getAllReservations`
      );
    }
  }

  static async getAllReservationsOfBorrower(borrower_id) {
    try {
      const data = await postgresClient.query(
        `SELECT * 
        FROM borrow_books 
        WHERE borrower_id = '${borrower_id}';`
      );
      const reservations = data.rows;
      return reservations;
    } catch (err) {
      console.log("🔴\nmy object: %o\n🔴", getCurrentLine.default());
      throw new InternalError(
        `🔖⭕DB ReservationsModel ERROR getAllReservationsOfBorrower:  ${borrower_id}`
      );
    }
  }

  static async returnBook(ISBN, borrower_id) {
    try {
      const query = {
        text: `
        DELETE 
        FROM borrow_books 
        WHERE ISBN = $1 
        AND borrower_id = $2`,
        values: [ISBN, borrower_id],
      };

      const { rows } = await postgresClient.query(query);
      return rows;
    } catch (err) {
      console.log("🔴\nmy object: %o\n🔴", getCurrentLine.default());
      throw new InternalError(
        `🔖⭕DB ReservationsModel ERROR returnBook:  ${(ISBN, borrower_id)} `
      );
    }
  }

  static async reserveBook(ISBN, borrower_id) {
    try {
      const currentTimestamp = new Date().toISOString();

      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      const thirtyDaysFromNowTimestamp = thirtyDaysFromNow.toISOString();
      console.debug("🔖reserveBook",[ISBN, borrower_id, currentTimestamp, thirtyDaysFromNowTimestamp])
      await postgresClient.query(
        `
        INSERT 
        INTO borrow_books (ISBN, borrower_id, valid_from, valid_to) 
        VALUES ($1, $2,$3,$4)
        `,
        [ISBN, borrower_id, currentTimestamp, thirtyDaysFromNowTimestamp]
      );
      console.log("🔖Inserted data succeffly");
    } catch (err) {
      console.log("🔴\nmy object: %o\n🔴", getCurrentLine.default());
      throw new InternalError(
        `🔖⭕DB ReservationsModel ERROR reserveBook:  ${(ISBN, borrower_id)} `
      );
    }
  }
}

module.exports = ReservationsModel;
