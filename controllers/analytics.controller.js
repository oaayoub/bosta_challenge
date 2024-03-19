const express = require("express");
const router = express.Router();
const AnalyticsService = require("../services/analytics.service");

// Define route handlers
router.get("/overdue", async (req, res) => {
  try {
    let overdueBooks =  await AnalyticsService.getOverdueLastMonth()
    res.status(200).send(overdueBooks)
  } 
  catch (err) {
    console.log("AnalyticsService.getOverdueLastMonth() failed⭕")
    throw err
  }
});

// Define route handlers
router.get("/", async (req, res) => {
  try {
    const reservations = await AnalyticsService.getReservationsLastMonth()
    res.status(200).send(reservations)
  } 
  catch (err) {
    console.log("AnalyticsService.getReservationsLastMonth() failed⭕")
    throw err
  }
});
module.exports = router;
