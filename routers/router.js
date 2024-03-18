const express = require("express");

const {
  booksController,
  analyticsController,
  borrowersController,
  reservationsController,
} = require("../controllers/index");

const router = express.Router();
router.use("/books", booksController);
router.use("/borrowers", borrowersController);
router.use("/reservation", reservationsController);
router.use("/analytics", analyticsController);

module.exports = router;
