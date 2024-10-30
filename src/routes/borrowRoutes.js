const express = require('express');
const { borrowController } = require('../controllers');

const router = express.Router();

router.post('/', borrowController.addBorrower);
router.put('/:id', borrowController.updateBorrower);
router.delete('/:id', borrowController.deleteBorrower);
router.get('/', borrowController.listBorrowers);
router.post('/checkout', borrowController.checkOutBook);
router.post('/return', borrowController.returnBook);
router.get('/:borrowerId/borrowed-books', borrowController.listBorrowedBooks);
router.get('/:borrowerId/overdue-books', borrowController.listOverdueBooks);


module.exports = router;
