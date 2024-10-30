const { query } = require('express-validator');

// Input validation middleware
const validateSearch = [
    query('title').isString().trim(),
    query('author').isString().trim(),
    query('isbn').isString().trim(),
];

module.exports = {
    validateSearch
};