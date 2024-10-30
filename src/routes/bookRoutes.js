const express = require('express');
const { bookController } = require('../controllers');

const router = express.Router();

router.post('/', bookController.addBook);
// Define other routes (GET, PUT, DELETE) for books

module.exports = router;
