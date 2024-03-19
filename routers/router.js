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
router.use("/reservations", reservationsController);
router.use("/analytics", analyticsController);

module.exports = router;
