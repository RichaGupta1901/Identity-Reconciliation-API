// setting up the /identify route: (a POST route) for user identification
const express = require('express');
const router = express.Router();
const { identifyingUser } = require('../controllers/identifyController');

router.post('/identify', identifyingUser);

module.exports = router;