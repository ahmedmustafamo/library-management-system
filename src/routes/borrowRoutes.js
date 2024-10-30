const express = require('express');
const { borrowController } = require('../controllers');

const router = express.Router();

router.post('/', borrowController.addBorrower);
// Define other routes (GET, PUT, DELETE) for borrowers

module.exports = router;
