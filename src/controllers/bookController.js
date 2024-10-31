const { validationResult } = require('express-validator');

const { Book } = require('../models');
const handleError = require('./../config/handleError');

const bookController = {
  /**
   * @api {post} /books Add a new book
   * @apiName AddBook
   * @apiGroup Books
   *
   * @apiParam {String} title Title of the book.
   * @apiParam {String} author Author of the book.
   * @apiParam {String} isbn ISBN number of the book.
   * @apiParam {Number} available_quantity Number of copies available.
   * @apiParam {String} shelf_location Location of the book on the shelf.
   *
   * @apiSuccess {Number} id Book's unique ID.
   * @apiSuccess {String} title Title of the book.
   * @apiSuccess {String} author Author of the book.
   * @apiSuccess {String} isbn ISBN number of the book.
   * @apiSuccess {Number} available_quantity Number of copies available.
   * @apiSuccess {String} shelf_location Location of the book on the shelf.
   *
   * @apiError (Error 400) BadRequest Unable to add book.
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while adding book.
   */
  addBook: async (req, res) => {
    try {
      const book = await Book.create(req.body);
      res.status(201).json(book);
    } catch (error) {
      handleError(res, error, 'adding book');
    }
  },

  /**
   * @api {get} /books Get all books
   * @apiName GetAllBooks
   * @apiGroup Books
   *
   * @apiSuccess {Object[]} books List of books.
   * @apiSuccess {Number} books.id Book's unique ID.
   * @apiSuccess {String} books.title Title of the book.
   * @apiSuccess {String} books.author Author of the book.
   * @apiSuccess {String} books.isbn ISBN number of the book.
   * @apiSuccess {Number} books.available_quantity Number of copies available.
   * @apiSuccess {String} books.shelf_location Location of the book on the shelf.
   *
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while fetching books.
   */
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.getAll();
      res.status(200).json(books);
    } catch (error) {
      handleError(res, error, 'fetching books');
    }
  },

  /**
   * @api {get} /books/search Search for books
   * @apiName SearchBooks
   * @apiGroup Books
   *
   * @apiParam {String} [title] Title of the book to search for.
   * @apiParam {String} [author] Author of the book to search for.
   * @apiParam {String} [isbn] ISBN number of the book to search for.
   *
   * @apiSuccess {Object[]} books List of matching books.
   * @apiSuccess {Number} books.id Book's unique ID.
   * @apiSuccess {String} books.title Title of the book.
   * @apiSuccess {String} books.author Author of the book.
   * @apiSuccess {String} books.isbn ISBN number of the book.
   * @apiSuccess {Number} books.available_quantity Number of copies available.
   * @apiSuccess {String} books.shelf_location Location of the book on the shelf.
   *
   * @apiError (Error 400) BadRequest Invalid search parameters.
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while searching for books.
   */
  search: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, author, isbn } = req.query;
      const books = await Book.searchBook(title, author, isbn);
      res.status(200).json(books);
    } catch (error) {
      handleError(res, error, 'searching for books');
    }
  },

  /**
   * @api {get} /books/:id Get a book by ID
   * @apiName GetBookById
   * @apiGroup Books
   *
   * @apiParam {Number} id Book's unique ID.
   *
   * @apiSuccess {Number} id Book's unique ID.
   * @apiSuccess {String} title Title of the book.
   * @apiSuccess {String} author Author of the book.
   * @apiSuccess {String} isbn ISBN number of the book.
   * @apiSuccess {Number} available_quantity Number of copies available.
   * @apiSuccess {String} shelf_location Location of the book on the shelf.
   *
   * @apiError (Error 404) NotFound Book not found.
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while fetching book.
   */
  getBookById: async (req, res) => {
    try {
      const book = await Book.getById(req.params.id);
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (error) {
      handleError(res, error, 'fetching book');
    }
  },

  /**
   * @api {put} /books/:id Update a book
   * @apiName UpdateBook
   * @apiGroup Books
   *
   * @apiParam {Number} id Book's unique ID.
   * @apiParam {String} [title] Title of the book.
   * @apiParam {String} [author] Author of the book.
   * @apiParam {String} [isbn] ISBN number of the book.
   * @apiParam {Number} [available_quantity] Number of copies available.
   * @apiParam {String} [shelf_location] Location of the book on the shelf.
   *
   * @apiSuccess {Number} id Book's unique ID.
   * @apiSuccess {String} title Title of the book.
   * @apiSuccess {String} author Author of the book.
   * @apiSuccess {String} isbn ISBN number of the book.
   * @apiSuccess {Number} available_quantity Number of copies available.
   * @apiSuccess {String} shelf_location Location of the book on the shelf.
   *
   * @apiError (Error 404) NotFound Book not found.
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while updating book.
   */
  updateBook: async (req, res) => {
    try {
      const updatedBook = await Book.update(req.params.id, req.body);
      if (updatedBook) {
        res.status(200).json(updatedBook);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (error) {
      handleError(res, error, 'updating book');
    }
  },

  /**
   * @api {delete} /books/:id Delete a book
   * @apiName DeleteBook
   * @apiGroup Books
   *
   * @apiParam {Number} id Book's unique ID.
   *
   * @apiSuccess (204) NoContent Successfully deleted the book.
   *
   * @apiError (Error 404) NotFound Book not found.
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while deleting book.
   */
  deleteBook: async (req, res) => {
    try {
      const deleted = await Book.delete(req.params.id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (error) {
      handleError(res, error, 'deleting book');
    }
  },
};

module.exports = bookController;
