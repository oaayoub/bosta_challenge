const express = require("express");
const router = express.Router();
const Service = require("../services/borrowers.service");
const authenticator = require("../middlewares/authenticator.middleware");

// Define route handlers
router.get("/list",authenticator, async (req, res) => {
  try {
    const borrowers = await Service.getAllBorrowers();
    res.status(200).send(borrowers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// Define route handlers
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    const borrowerInfo = { name, email };
    Service.addBorrower(borrowerInfo);
    var token = Service.generateBorrowerToken(borrowerInfo);
    res.status(200).send({token})
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
