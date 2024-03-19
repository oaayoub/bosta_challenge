const { postgresClient } = require("../clients/index");
const InternalError = require("../Error/InternalServer.error");

class AnalyticsModel {
  static async getReservationsWithPeriod(from = null, to = null) {
    const thirtyDaysBefore = new Date();
    thirtyDaysBefore.setDate(thirtyDaysBefore.getDate() - 30);
    const thirtyDaysFromNowTimestamp = thirtyDaysBefore.toISOString();

    if (to === null) to = new Date().toISOString();
    if (from === null) from = thirtyDaysFromNowTimestamp;
    console.debug("📈📈AnalyticsModel from , to", { from: from, to: to });
    try {
      const data = await postgresClient.query(
        `SELECT * 
          FROM borrow_books 
          WHERE valid_from 
          BETWEEN $1 AND $2;`,
        [from, to]
      );

      const reservations = data.rows;
      console.debug("📈📈AnalyticsModel reservations", reservations);

      return reservations;
    } catch (err) {
      console.error(err);
      throw new InternalError(
        `🔖⭕DB ReservationsModel ERROR getReservationsWithPeriod: ${err.message}`
      );
    }
  }

  static async getOverDueReservationsWithPeriod(from = null, to = null) {
    const thirtyDaysBefore = new Date();
    thirtyDaysBefore.setDate(thirtyDaysBefore.getDate() - 30);
    const thirtyDaysFromNowTimestamp = thirtyDaysBefore.toISOString();

    if (to === null) to = new Date().toISOString();
    if (from === null) from = thirtyDaysFromNowTimestamp;
    console.debug(
      "📈getOverDueReservationsWithPeriod📈AnalyticsModel from , to",
      { from: from, to: to }
    );

    try {
      const data = await postgresClient.query(
        `SELECT * 
          FROM borrow_books 
          WHERE valid_to 
          BETWEEN $1 AND $2;`,
        [from, to]
      );
      const reservations = data.rows;
      console.debug("📈📈AnalyticsModel reservations", reservations);
      return reservations;
    } catch (err) {
      console.error(err);
      throw new InternalError(
        `🔖⭕DB ReservationsModel ERROR getReservationsWithPeriod: ${err.message}`
      );
    }
  }
}

module.exports = AnalyticsModel;
