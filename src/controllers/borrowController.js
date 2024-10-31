const { Borrow } = require('../models');
const handleError = require('./../config/handleError');

const borrowController = {
  /**
   * @api {post} /borrows Add a new borrower
   * @apiName AddBorrow
   * @apiGroup Borrowers
   *
   * @apiParam {String} name Name of the borrower.
   * @apiParam {String} email Email of the borrower.
   * @apiParam {Date} registered_date Date the borrower registered.
   *
   * @apiSuccess {Number} id Borrower's unique ID.
   * @apiSuccess {String} name Name of the borrower.
   * @apiSuccess {String} email Email of the borrower.
   * @apiSuccess {Date} registered_date Date the borrower registered.
   *
   * @apiError (Error 400) BadRequest Unable to add borrower.
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while adding borrower.
   */
  addBorrow: async (req, res) => {
    try {
      const borrow = await Borrow.create(req.body);
      res.status(201).json(borrow);
    } catch (error) {
      handleError(res, error, 'adding borrow');
    }
  },

  /**
   * @api {put} /borrows/:id Update a borrower
   * @apiName UpdateBorrow
   * @apiGroup Borrowers
   *
   * @apiParam {Number} id Borrower's unique ID.
   * @apiParam {String} [name] Updated name of the borrower.
   * @apiParam {String} [email] Updated email of the borrower.
   *
   * @apiSuccess {Number} id Borrower's unique ID.
   * @apiSuccess {String} name Name of the borrower.
   * @apiSuccess {String} email Email of the borrower.
   *
   * @apiError (Error 404) NotFound Borrower not found.
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while updating borrower.
   */
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
      handleError(res, error, 'updating borrow');
    }
  },

  /**
   * @api {delete} /borrows/:id Delete a borrower
   * @apiName DeleteBorrow
   * @apiGroup Borrowers
   *
   * @apiParam {Number} id Borrower's unique ID.
   *
   * @apiSuccess {String} message Confirmation message.
   *
   * @apiError (Error 404) NotFound Borrower not found.
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while deleting borrower.
   */
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
      handleError(res, error, 'deleting borrow');
    }
  },

  /**
   * @api {get} /borrows Get all borrowers
   * @apiName ListBorrows
   * @apiGroup Borrowers
   *
   * @apiSuccess {Object[]} borrows List of borrowers.
   * @apiSuccess {Number} borrows.id Borrower's unique ID.
   * @apiSuccess {String} borrows.name Name of the borrower.
   * @apiSuccess {String} borrows.email Email of the borrower.
   * @apiSuccess {Date} borrows.registered_date Date the borrower registered.
   *
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while fetching borrowers.
   */
  listBorrows: async (req, res) => {
    try {
      const borrows = await Borrow.getAll();
      res.json(borrows);
    } catch (error) {
      handleError(res, error, 'fetching borrows');
    }
  },

  /**
   * @api {post} /borrows/checkout Check out a book
   * @apiName CheckOutBook
   * @apiGroup Borrowers
   *
   * @apiParam {Number} borrowId Borrower's unique ID.
   * @apiParam {Number} bookId Book's unique ID.
   *
   * @apiSuccess {Object} result Details of the borrowed book.
   * @apiSuccess {Number} result.borrower_id Borrower's unique ID.
   * @apiSuccess {Number} result.book_id Book's unique ID.
   * @apiSuccess {Date} result.due_date Due date for returning the book.
   *
   * @apiError (Error 400) BadRequest Unable to check out book.
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while checking out book.
   */
  checkOutBook: async (req, res) => {
    try {
      const { borrowId, bookId } = req.body;
      const result = await Borrow.checkOutBook(borrowId, bookId);
      res.status(200).json(result);
    } catch (error) {
      handleError(res, error, 'checking out book');
    }
  },

  /**
   * @api {post} /borrows/return Return a book
   * @apiName ReturnBook
   * @apiGroup Borrowers
   *
   * @apiParam {Number} borrowId Borrower's unique ID.
   * @apiParam {Number} bookId Book's unique ID.
   *
   * @apiSuccess {String} message Confirmation message.
   *
   * @apiError (Error 400) BadRequest Unable to return book.
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while returning book.
   */
  returnBook: async (req, res) => {
    try {
      const { borrowId, bookId } = req.body;
      await Borrow.returnBook(borrowId, bookId);
      res.status(200).json({ message: 'Book returned successfully' });
    } catch (error) {
      handleError(res, error, 'returning book');
    }
  },

  /**
   * @api {get} /borrows/:borrowId/borrowedBooks List borrowed books
   * @apiName ListBorrowedBooks
   * @apiGroup Borrowers
   *
   * @apiParam {Number} borrowId Borrower's unique ID.
   *
   * @apiSuccess {Object[]} books List of borrowed books.
   * @apiSuccess {Number} books.borrower_id Borrower's unique ID.
   * @apiSuccess {Number} books.book_id Book's unique ID.
   * @apiSuccess {Date} books.due_date Due date for returning the book.
   *
   * @apiError (Error 404) NotFound Borrower not found.
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while fetching borrowed books.
   */
  listBorrowedBooks: async (req, res) => {
    try {
      const { borrowId } = req.params;
      const books = await Borrow.getBorrowedBooks(borrowId);
      res.json(books);
    } catch (error) {
      handleError(res, error, 'fetching borrowed books');
    }
  },

  /**
   * @api {get} /borrows/:borrowId/overdueBooks List overdue books
   * @apiName ListOverdueBooks
   * @apiGroup Borrowers
   *
   * @apiParam {Number} borrowId Borrower's unique ID.
   *
   * @apiSuccess {Object[]} overdueBooks List of overdue books.
   * @apiSuccess {Number} overdueBooks.borrower_id Borrower's unique ID.
   * @apiSuccess {Number} overdueBooks.book_id Book's unique ID.
   * @apiSuccess {Date} overdueBooks.due_date Due date for returning the book.
   *
   * @apiError (Error 404) NotFound Borrower not found.
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while fetching overdue books.
   */
  listOverdueBooks: async (req, res) => {
    try {
      const { borrowId } = req.params;
      const overdueBooks = await Borrow.getOverdueBooks(borrowId);
      res.json(overdueBooks);
    } catch (error) {
      handleError(res, error, 'fetching overdue books');
    }
  }
};

module.exports = borrowController;
