const { Borrow } = require('../models');
const handleError = require('./../config/handleError')

const borrowController = {
  addBorrow: async (req, res) => {
    try {
      const borrow = await Borrow.create(req.body);
      res.status(201).json(borrow);
    } catch (error) {
      handleError(res, error, 'adding borrow')
    }
  },
  updateBorrow: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedBorrow = await Borrow.update(id, req.body);
      if (updatedBorrow) {
        res.json(updatedBorrow);
      } else {
        res.status(404).json({ error: 'Borrow not found' });
      }
    } catch (error) {
      handleError(res, error, 'updating borrow')
    }
  },
  deleteBorrow: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBorrow = await Borrow.delete(id);
      if (deletedBorrow) {
        res.json({ message: 'Borrow deleted' });
      } else {
        res.status(404).json({ error: 'Borrow not found' });
      }
    } catch (error) {
      handleError(res, error, 'deleting borrow')
    }
  },
  listBorrows: async (req, res) => {
    try {
      const borrows = await Borrow.getAll();
      res.json(borrows);
    } catch (error) {
      handleError(res, error, 'fetching borrows')
    }
  },
  // Add methods for book borrowing and returning
  checkOutBook: async (req, res) => {
    try {
      const { borrowId, bookId } = req.body;
      const result = await Borrow.checkOutBook(borrowId, bookId);
      res.status(200).json(result);
    } catch (error) {
      handleError(res, error, 'checking out book')
    }
  },
  returnBook: async (req, res) => {
    try {
      const { borrowId, bookId } = req.body;
      await Borrow.returnBook(borrowId, bookId);
      res.status(200).json({ message: 'Book returned successfully' });
    } catch (error) {
      handleError(res, error, 'returning book')
    }
  },
  listBorrowedBooks: async (req, res) => {
    try {
      const { borrowId } = req.params;
      const books = await Borrow.getBorrowedBooks(borrowId);
      res.json(books);
    } catch (error) {
      handleError(res, error, 'fetching borrowed books')
    }
  },
  listOverdueBooks: async (req, res) => {
    try {
      const { borrowId } = req.params;
      const overdueBooks = await Borrow.getOverdueBooks(borrowId);
      res.json(overdueBooks);
    } catch (error) {
      handleError(res, error, 'fetching overdue books')
    }
  }
};

module.exports = borrowController;
