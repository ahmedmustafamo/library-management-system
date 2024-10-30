const pool = require('./../config/db');
const { bookTable, borrowedBooksTable, borrowTble, userTable } = require('./db');

const createTables = async () => {
  try {
    // Execute the queries
    await pool.query(userTable);
    await pool.query(bookTable);
    await pool.query(borrowTble);
    await pool.query(borrowedBooksTable);
    
    console.log('Tables created successfully');
  } catch (err) {
    console.error('Error creating tables', err.stack);
  }
};

module.exports = createTables;
