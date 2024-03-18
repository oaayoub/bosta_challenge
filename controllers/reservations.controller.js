const express = require('express');
const router = express.Router();
const reservationService = require('../services/reservation.service')

// Define route handlers
router.get('/list', async (req, res) => {
    try {
        const allResrevations = await reservationService.getAllReservations();
        res.status(201).json(allResrevations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const email = req.email
        const allResrevations = await reservationService.getAllReservationsOfBorrower(email);
        res.status(201).json(allResrevations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    const bookInfo = { ISBN,title,author } = req.body;
    const email = req.email
    try {
        const newReservation = await reservationService.reserveBook(bookInfo,email);
        res.status(201).json(newReservation);
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
        const bookReturnStatus = await reservationService.returnBook(ISBN,email);
        res.status(201).json(bookReturnStatus);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Add other CRUD operations (update, delete) as needed

module.exports = router;