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
  // Add more controller methods here
};

module.exports = bookController;
