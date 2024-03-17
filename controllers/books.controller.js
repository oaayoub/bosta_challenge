const express = require('express');
const getCurrentLine = require('get-current-line')
const router = express.Router();
const { pool } = require('../dbClient')
// Define route handlers
router.get('/list', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM book')
        res.status(200).send(data.rows)
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
        await pool.query('INSERT INTO book (title, ISBN,author, available_quantity,shelf_location) VALUES ($1, $2,$3,$4,$5)', [title,ISBN,author,parsed_quantity,shelf_location])
        console.log("Inserted data succeffly 1️⃣")
        res.status(200).send("🔵Book inserted succefully🔵")
    } catch (err) {
        console.log("🔴\nmy object: %o\n🔴",getCurrentLine.default())
        res.sendStatus(500)
    }
});

// Add other CRUD operations (update, delete) as needed

module.exports = router;