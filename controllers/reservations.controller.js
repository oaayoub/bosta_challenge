const express = require('express');
const router = express.Router();
const ReservationsService = require('../services/reservation.service')
const BorrowersReservationsService = require('../services/borrowers_reservations.service')
const httpStatusCodes = require('../constants/statusCodes.constants')
// Define route handlers
router.get('/list', async (req, res) => {
    try {
        const allResrevations = await ReservationsService.getAllReservations();
        res.status(200).json(allResrevations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const email = req.email
        const allResrevations = await BorrowersReservationsService.getAllReservationsOfBorrower(email);
        res.status(200).json(allResrevations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    const bookInfo = { ISBN,title,author } = req.body;
    const email = req.email
    try {
        const newReservation = await BorrowersReservationsService.reserveBook(bookInfo,email);
        res.status(204).json({ message: httpStatusCodes[204] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete('/', async (req, res) => {
    const {ISBN} = req.body;
    const email = req.email
    try {
        console.log("🔖🕹ISBN: ",ISBN)
        const bookReturnStatus = await BorrowersReservationsService.returnBook(ISBN,email);
        console.log("🔖🕹bookReturnStatus: ",bookReturnStatus)
        res.status(204).json({ message: httpStatusCodes[204] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;