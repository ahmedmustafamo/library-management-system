const express = require('express');
const { bookController } = require('../controllers');
const { validateSearch } = require('./../validators/bookValidator')
const limiter = require('./../config/rateLimiting')

const router = express.Router();

router.post('/', bookController.addBook);
router.get('/', limiter, bookController.getAllBooks);
router.get('/search', validateSearch, bookController.search);
router.get('/:id', limiter, bookController.getBookById);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
