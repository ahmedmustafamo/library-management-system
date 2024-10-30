const bookTable = require('./book');
const borrowTble = require('./borrow');
const borrowedBooksTable = require('./borrowedBooks');
const userTable = require('./user');

module.exports = {
  bookTable,
  borrowTble,
  userTable,
  borrowedBooksTable
};
