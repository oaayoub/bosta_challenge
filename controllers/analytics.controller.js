const express = require('express');
const router = express.Router();

// Define route handlers
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.send("get / called by omar");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
module.exports = router;