const express = require('express');
const booksController = require('../controllers/books.controller');
const borrowersController = require('../controllers/borrowers.controller');
const reservationsController = require('../controllers/reservations.controller');
const analyticsController = require('../controllers/analytics.controller');

const router = express.Router();

router.use('/books', booksController);
router.use('/borrowers', borrowersController);
router.use('/reservation', reservationsController);
router.use('/analytics', analyticsController);

module.exports = router;