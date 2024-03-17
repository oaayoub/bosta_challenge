const express = require('express');
const {registerView, loginView , basicView,send,setup,ins} = require('../controllers/triaController');
const router = express.Router();
router.get('/register', registerView);
router.get('/login', loginView);
router.get('/send', send);
router.get('/ins', ins);
router.get('/setup', setup);
router.get('/', basicView);
module.exports = router;