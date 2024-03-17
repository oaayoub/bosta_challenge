const express = require('express');
const router = express.Router();

// Define route handlers
router.get('/', async (req, res) => {
    try {
        // const books = await Book.find();
        res.send("get / called by omar --- reservations");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// router.post('/', async (req, res) => {
//     const { title, author, isbn } = req.body;
//     if (!title || !author || !isbn) {
//         return res.status(400).json({ message: 'Missing required fields' });
//     }

//     try {
//         const newBook = await Book.create({ title, author, isbn });
//         res.status(201).json(newBook);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// Add other CRUD operations (update, delete) as needed

module.exports = router;