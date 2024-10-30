const express = require('express');
const { bookController } = require('../controllers');

const router = express.Router();

router.post('/', bookController.addBook);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
