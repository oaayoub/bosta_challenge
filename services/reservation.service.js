const ReservationModel = require("../models/reservations.model");

class ReservationService {

  static async getAllReservations() {
    return await ReservationModel.getAllReservations();
  }
}

module.exports = ReservationService;
