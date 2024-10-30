// Create Borrowers Table
const createBorrowersTable = `
      CREATE TABLE IF NOT EXISTS borrowers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        registered_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

module.exports = createBorrowersTable;