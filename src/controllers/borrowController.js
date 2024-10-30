const { Borrow } = require('../models');

const borrowController = {
  addBorrower: async (req, res) => {
    try {
      const borrower = await Borrow.create(req.body);
      res.status(201).json(borrower);
    } catch (error) {
      res.status(500).json({ error: 'Error adding borrower' });
    }
  },
  // Add more controller methods here
};

module.exports = borrowController;
