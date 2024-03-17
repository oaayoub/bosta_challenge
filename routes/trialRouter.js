const express = require('express');
const {registerView, loginView , basicView} = require('../controllers/triaController');
const router = express.Router();
router.get('/register', registerView);
router.get('/login', loginView);
router.get('/', basicView);
module.exports = router;