const { Book } = require('../models');

const bookController = {
  addBook: async (req, res) => {
    try {
      const book = await Book.create(req.body);
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ error: 'Error adding book' });
    }
  },
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.getAll();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching books' });
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
      res.status(500).json({ error: 'Error fetching book' });
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
      res.status(500).json({ error: 'Error updating book' });
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
      res.status(500).json({ error: 'Error deleting book' });
    }
  },
};

module.exports = bookController;
