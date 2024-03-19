const express = require("express");
const router = express.Router();
const AnalyticsService = require("../services/analytics.service");
let converter = require("json-2-csv");
const fs = require("fs");
const path = require("path");

// Define route handlers
router.get("/overdue", async (req, res) => {
  try {
    let overdueBooks = await AnalyticsService.getOverdueLastMonth();
    res.status(200).send(overdueBooks);
  } catch (err) {
    console.log("AnalyticsService.getOverdueLastMonth() failed⭕");
    throw err;
  }
});

router.get("/", async (req, res) => {
  try {
    const reservations = await AnalyticsService.getReservationsLastMonth();
    res.status(200).send(reservations);
  } catch (err) {
    console.log("AnalyticsService.getReservationsLastMonth() failed⭕");
    throw err;
  }
});

router.get("/report", async (req, res) => {
  try {
    const { from, to } = req.query;
    console.debug("📈🔶/report from,to", { from, to });
    const reservations = await AnalyticsService.getReservationsWithPeriod(
      from,
      to
    );
    const csv = await converter.json2csv(reservations);

    const filename = `report_${Date.now()}.csv`;
    const reportsDir = path.join(__dirname, "reports");
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir);
    }
    const filePath = path.join(reportsDir, filename);
    console.debug("filePath: ",filePath)
    fs.writeFileSync(filePath, csv);

    // Return the hyperlink to access the saved CSV file
    const fileUrl = `/reports/${filename}`;
    console.debug("fileUrl: ",fileUrl)
    res.status(200).send(`Report Saved: ${fileUrl}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating report.");
  }
});
module.exports = router;
