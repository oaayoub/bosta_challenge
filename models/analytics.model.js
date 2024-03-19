const { postgresClient } = require("../clients/index");
const InternalError = require("../Error/InternalServer.error");

class AnalyticsModel {
  static async getReservationsWithPeriod(from = undefined, to = undefined) {
    const thirtyDaysBefore = new Date();
    thirtyDaysBefore.setDate(thirtyDaysBefore.getDate() - 30);
    const thirtyDaysFromNowTimestamp = thirtyDaysBefore.toISOString();

    if (to === undefined) to = new Date().toISOString();
    if (from === undefined) from = thirtyDaysFromNowTimestamp;
    console.debug("📈📈AnalyticsModel from , to", { from: from, to: to });
    try {
      const data = await postgresClient.query(
        `
          SELECT * 
          FROM borrow_books 
          WHERE valid_from 
          BETWEEN $1 AND $2;
          `,
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

  static async getOverDueReservationsWithPeriod(from = undefined, to = undefined) {
    const thirtyDaysBefore = new Date();
    thirtyDaysBefore.setDate(thirtyDaysBefore.getDate() - 30);
    const thirtyDaysFromNowTimestamp = thirtyDaysBefore.toISOString();

    if (to === undefined) to = new Date().toISOString();
    if (from === undefined) from = thirtyDaysFromNowTimestamp;
    console.debug(
      "📈getOverDueReservationsWithPeriod📈AnalyticsModel from , to",
      { from: from, to: to }
    );

    try {
      const data = await postgresClient.query(
        `
          SELECT * 
          FROM borrow_books 
          WHERE valid_to 
          BETWEEN $1 AND $2
          AND NOW() > valid_to
          AND return_date>valid_to;
          `,
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
