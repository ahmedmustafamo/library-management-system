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
  searchBook: async (title, author, isbn) => {
    const query = [];
    const values = [];
    let queryString = 'SELECT * FROM books WHERE';

    if (title) {
      query.push(`title ILIKE $${query.length + 1}`);
      values.push(`%${title}%`);
    }
    if (author) {
      query.push(`author ILIKE $${query.length + 1}`);
      values.push(`%${author}%`);
    }
    if (isbn) {
      query.push(`isbn = $${query.length + 1}`);
      values.push(isbn);
    }

    if (query.length === 0) {
      return [];
    }

    queryString += ' ' + query.join(' AND ');
    const result = await pool.query(queryString, values);
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
