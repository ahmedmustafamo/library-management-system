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
  // Add more CRUD operations here
};

module.exports = Borrower;
