const { Borrow } = require('../models');

const borrowController = {
  addBorrower: async (req, res) => {
    try {
      const borrower = await Borrower.create(req.body);
      res.status(201).json(borrower);
    } catch (error) {
      res.status(500).json({ error: 'Error adding borrower' });
    }
  },
  updateBorrower: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedBorrower = await Borrower.update(id, req.body);
      if (updatedBorrower) {
        res.json(updatedBorrower);
      } else {
        res.status(404).json({ error: 'Borrower not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating borrower' });
    }
  },
  deleteBorrower: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBorrower = await Borrower.delete(id);
      if (deletedBorrower) {
        res.json({ message: 'Borrower deleted' });
      } else {
        res.status(404).json({ error: 'Borrower not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error deleting borrower' });
    }
  },
  listBorrowers: async (req, res) => {
    try {
      const borrowers = await Borrower.getAll();
      res.json(borrowers);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching borrowers' });
    }
  },
  // Add methods for book borrowing and returning
  checkOutBook: async (req, res) => {
    try {
      const { borrowerId, bookId } = req.body;
      const result = await Borrower.checkOutBook(borrowerId, bookId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Error checking out book' });
    }
  },
  returnBook: async (req, res) => {
    try {
      const { borrowerId, bookId } = req.body;
      await Borrower.returnBook(borrowerId, bookId);
      res.status(200).json({ message: 'Book returned successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error returning book' });
    }
  },
  listBorrowedBooks: async (req, res) => {
    try {
      const { borrowerId } = req.params;
      const books = await Borrower.getBorrowedBooks(borrowerId);
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching borrowed books' });
    }
  },
  listOverdueBooks: async (req, res) => {
    try {
      const { borrowerId } = req.params;
      const overdueBooks = await Borrower.getOverdueBooks(borrowerId);
      res.json(overdueBooks);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching overdue books' });
    }
  }
};

module.exports = borrowController;
