// Create Books Table
const createBooksTable = `
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(100) NOT NULL,
        isbn VARCHAR(20) UNIQUE NOT NULL,
        available_quantity INTEGER NOT NULL,
        shelf_location VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

const tableIndexes = `
      CREATE INDEX IF NOT EXISTS idx_books_title ON books(title);
      CREATE INDEX IF NOT EXISTS idx_books_author ON books(author);
      CREATE INDEX IF NOT EXISTS idx_books_isbn ON books(isbn);
`;

module.exports = createBooksTable + tableIndexes;