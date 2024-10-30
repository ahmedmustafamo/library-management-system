const pool = require('../config/db');

const Book = {
  create: async (book) => {
    const { title, author, isbn, available_quantity, shelf_location } = book;
    const result = await pool.query(
      'INSERT INTO books (title, author, isbn, available_quantity, shelf_location) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, author, isbn, available_quantity, shelf_location]
    );
    return result.rows[0];
  },
  // Add more CRUD operations here
};

module.exports = Book;
