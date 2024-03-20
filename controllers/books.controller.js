const express = require('express');
const getCurrentLine = require('get-current-line')
const router = express.Router();
const BooksService = require('../services/books.service')

// Define route handlers
router.get('/list', async (req, res) => {
    try {
        var books = await BooksService.getAllBooks()
        res.status(200).send(books)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

// Search for book by ISBN , Title or Author
router.get('/', async (req, res) => {
    try {
        const bookInfo = { ISBN,title,author } = req.query;
        console.log("search for book controller 🕹: ",bookInfo)
        var books = await BooksService.searchForBook(bookInfo)
        res.status(200).send(books)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});


// add book
router.post('/add', async (req, res) => {
    const { title, ISBN, author, available_quantity,shelf_location } = req.body;
    const parsed_quantity = parseInt(available_quantity); // Parse to integer
    try {
        const bookData = { title, ISBN, author, available_quantity: parsed_quantity, shelf_location };
        BooksService.insertBook(bookData)
        res.status(200).send("🔵Book inserted succefully🔵")
    } catch (err) {
        console.log("🔴\nmy object: %o\n🔴",getCurrentLine.default())
        res.sendStatus(500)
    }
});

// modify book
router.put('/', async (req, res) => {
    const { title, ISBN, author, available_quantity,shelf_location } = req.body;
    const parsed_quantity = parseInt(available_quantity); // Parse to integer
    try {
        const bookData = { title, author, available_quantity: parsed_quantity, shelf_location };
        const books = await BooksService.modifyBook(ISBN,bookData)
        res.status(200).send("🔵Book inserted succefully🔵\n",books,"\n")
    } catch (err) {
        console.log("🔴\nmy object: %o\n🔴",getCurrentLine.default())
        console.error("🔴🔴🔴🔴🔴🔴",err)
        res.sendStatus(500)
    }
});

// delete book
router.delete('/', async (req, res) => {
    const {ISBN} = req.body;
    try {
        const bookData = {ISBN};
        const books = await BooksService.deleteBook(ISBN)
        res.status(200).send("🔶Book DELETED succefully🔶\n",books,"\n")
    } catch (err) {
        console.log("🔴\nmy object: %o\n🔴",getCurrentLine.default())
        res.sendStatus(500)
    }
});



module.exports = router;