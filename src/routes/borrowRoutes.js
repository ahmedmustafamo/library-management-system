const express = require('express');
const { borrowController } = require('../controllers');

const router = express.Router();

router.post('/', borrowController.addBorrow);
router.put('/:id', borrowController.updateBorrow);
router.delete('/:id', borrowController.deleteBorrow);
router.get('/', borrowController.listBorrows);
router.post('/checkout', borrowController.checkOutBook);
router.post('/return', borrowController.returnBook);
router.get('/:borrowerId/borrowed-books', borrowController.listBorrowedBooks);
router.get('/:borrowerId/overdue-books', borrowController.listOverdueBooks);


module.exports = router;
