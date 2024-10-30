const pool = require('../config/db');

const Borrower = {
  create: async (borrower) => {
    const { name, email, registered_date } = borrower;
    const result = await pool.query(
      'INSERT INTO borrowers (name, email, registered_date) VALUES ($1, $2, $3) RETURNING *',
      [name, email, registered_date]
    );
    return result.rows[0];
  },
  update: async (id, updates) => {
    const { name, email } = updates;
    const result = await pool.query(
      'UPDATE borrowers SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );
    return result.rows[0];
  },
  delete: async (id) => {
    const result = await pool.query(
      'DELETE FROM borrowers WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  },
  getAll: async () => {
    const result = await pool.query('SELECT * FROM borrowers');
    return result.rows;
  },
  checkOutBook: async (borrowerId, bookId) => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // Set due date 14 days from now
    const result = await pool.query(
      'INSERT INTO borrowed_books (borrower_id, book_id, due_date) VALUES ($1, $2, $3) RETURNING *',
      [borrowerId, bookId, dueDate]
    );
    return result.rows[0];
  },
  returnBook: async (borrowerId, bookId) => {
    await pool.query(
      'DELETE FROM borrowed_books WHERE borrower_id = $1 AND book_id = $2',
      [borrowerId, bookId]
    );
  },
  getBorrowedBooks: async (borrowerId) => {
    const result = await pool.query(
      'SELECT * FROM borrowed_books WHERE borrower_id = $1',
      [borrowerId]
    );
    return result.rows;
  },
  getOverdueBooks: async (borrowerId) => {
    const result = await pool.query(
      'SELECT * FROM borrowed_books WHERE borrower_id = $1 AND due_date < NOW()',
      [borrowerId]
    );
    return result.rows;
  }
};

module.exports = Borrower;
