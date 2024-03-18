const express = require('express');
const getCurrentLine = require('get-current-line')
const router = express.Router();
const Service = require('../services/books.service')

// Define route handlers
router.get('/list', async (req, res) => {
    try {
        var books = await Service.getAllBooks()
        res.status(200).send(books)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});
// add book
router.post('/add', async (req, res) => {
    const { title, ISBN, author, available_quantity,shelf_location } = req.query;
    const parsed_quantity = parseInt(available_quantity); // Parse to integer
    try {
        const bookData = { title, ISBN, author, available_quantity: parsed_quantity, shelf_location };
        Service.insertBook(bookData)
        res.status(200).send("🔵Book inserted succefully🔵")
    } catch (err) {
        console.log("🔴\nmy object: %o\n🔴",getCurrentLine.default())
        res.sendStatus(500)
    }
});


module.exports = router;