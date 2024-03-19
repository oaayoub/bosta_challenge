const {AnalyticsModel} = require("../models/index");

class AnalyticsService {
    static async getOverdueLastMonth(){
        console.debug("Service 📈g etOverdueLastMonth")
        return await AnalyticsModel.getOverDueReservationsWithPeriod()
    }
    static async getReservationsLastMonth(){
        console.debug("Service 📈 getReservationsLastMonth")
        return await AnalyticsModel.getReservationsWithPeriod()
    }
    static async getReservationsWithPeriod(from,to){
        console.debug("Service 📈 getReservationsWithPeriod")
        return await AnalyticsModel.getReservationsWithPeriod(from,to)
    }
}

module.exports = AnalyticsService;
