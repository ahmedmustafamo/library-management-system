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
  getAll: async () => {
    const result = await pool.query('SELECT * FROM books');
    return result.rows;
  },
  getById: async (id) => {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    return result.rows[0];
  },
  update: async (id, bookData) => {
    const { title, author, isbn, available_quantity, shelf_location } = bookData;
    const result = await pool.query(
      'UPDATE books SET title = $1, author = $2, isbn = $3, available_quantity = $4, shelf_location = $5 WHERE id = $6 RETURNING *',
      [title, author, isbn, available_quantity, shelf_location, id]
    );
    return result.rows[0];
  },
  delete: async (id) => {
    const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  },
};

module.exports = Book;
