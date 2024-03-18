const express = require("express");
const getCurrentLine = require('get-current-line')
const router = express.Router();
const Service = require("../services/borrowers.service");
const generateBorrowerToken = require("../helpers/jwt.helper");

// Define route handlers
router.get("/list", async (req, res) => {
  try {
    const borrowers = await Service.getAllBorrowers();
    res.status(200).send(borrowers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    const borrowerInfo = { name, email };
    Service.addBorrower(borrowerInfo);
    var token = generateBorrowerToken(borrowerInfo);
    res.status(200).send({token})
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.delete("/", async (req, res) => {
  try {
    const {email} = req.body;
    const borrowers = await Service.deleteBorrower(email)
    res.status(200).send("🧔🕹 🔶borrowers DELETED succefully🔶\n")
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "🧔🕹Internal Server Error" });
  }
});


router.put("/", async (req, res) => {
  const { email,name } = req.body;
  try {
      const borrowerData = { email,name };
      console.log("borrower data", borrowerData)
      const status = await Service.updateBorrower(email,borrowerData)
      res.status(200).send("🧔🕹 borrowers Updated succefully 🖌")
  } catch (err) {
      console.log("🔴\nmy object: %o\n🔴",getCurrentLine.default())
      res.sendStatus(500)
  }
});

module.exports = router;
