// Create Borrowed Books Table
const createBorrowedBooksTable = `
      CREATE TABLE IF NOT EXISTS borrowed_books (
        id SERIAL PRIMARY KEY,
        borrower_id INTEGER REFERENCES borrowers(id) ON DELETE CASCADE,
        book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
        due_date TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
module.exports = createBorrowedBooksTable;