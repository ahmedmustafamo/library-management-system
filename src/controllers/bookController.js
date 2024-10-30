const { validationResult } = require('express-validator');

const { Book } = require('../models');
const handleError = require('./../config/handleError')

const bookController = {
  addBook: async (req, res) => {
    try {
      const book = await Book.create(req.body);
      res.status(201).json(book);
    } catch (error) {
      handleError(res, error, 'adding book')
    }
  },
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.getAll();
      res.status(200).json(books);
    } catch (error) {
      handleError(res, error, 'fetching books')
    }
  },
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
      handleError(res, error, 'saerching for books')
    }
  },
  getBookById: async (req, res) => {
    try {
      const book = await Book.getById(req.params.id);
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (error) {
      handleError(res, error, 'fetching book')
    }
  },
  
  updateBook: async (req, res) => {
    try {
      const updatedBook = await Book.update(req.params.id, req.body);
      if (updatedBook) {
        res.status(200).json(updatedBook);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (error) {
      handleError(res, error, 'updating book')
    }
  },
  
  deleteBook: async (req, res) => {
    try {
      const deleted = await Book.delete(req.params.id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (error) {
      handleError(res, error, 'deleting book')
    }
  },
};

module.exports = bookController;
