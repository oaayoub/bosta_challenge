const postgresClient = require("../clients/postgresClient");

class ReservationsModel {
  static async getAllReservations() {
    const data = await postgresClient.query("SELECT FROM borrow_books");
    const reservations = data.rows;
    return reservations;
  }

  static async getAllReservationsOfBorrower(borrower_id) {
    const data = await postgresClient.query(
      `SELECT * FROM borrow_books WHERE borrower_id = '${borrower_id}';`
    );
    const reservations = data.rows;
    return reservations;
  }

  static async returnBook(ISBN, borrower_id) {
    const query = {
      text: "DELETE FROM borrow_books WHERE ISBN = $1 AND borrower_id = $2",
      values: [ISBN, borrower_id],
    };

    try {
      const { rows } = await postgresClient.query(query);
      return rows;
    } catch (error) {
      console.error("Error in returning book:", error);
      throw error;
    }
  }

  static async reserveBook(ISBN, borrower_id) {
    const currentTimestamp = new Date().toISOString();

    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    const thirtyDaysFromNowTimestamp = thirtyDaysFromNow.toISOString();

    await postgresClient.query(
      "INSERT INTO borrow_books (ISBN, borrower_id, valid_from, valid_to) VALUES ($1, $2,$3,$4)",
      [ISBN, borrower_id, currentTimestamp, thirtyDaysFromNowTimestamp]
    );
    console.log("📚Inserted data succeffly");
  }
}

module.exports = ReservationsModel;
