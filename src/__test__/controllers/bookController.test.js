const request = require('supertest');
const express = require('express');
const { bookController } = require('../../controllers');
const Book = require('./../../models/bookModel');

const app = express();
app.use(express.json());
app.post('/books', bookController.addBook);
app.get('/books', bookController.getAllBooks);

jest.mock('./../../models/bookModel');

describe('Book API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /books', () => {
    it('should add a book and return it', async () => {
      const newBook = { title: 'Test Book', author: 'Author' };
      Book.create.mockResolvedValue(newBook);

      const response = await request(app)
        .post('/books')
        .send(newBook);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newBook);
      expect(Book.create).toHaveBeenCalledWith(newBook);
    });

    it('should handle errors when adding a book', async () => {
      const newBook = { title: 'Test Book', author: 'Author' };
      const errorMessage = 'Error on adding book.';
      Book.create.mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .post('/books')
        .send(newBook);

      expect(response.status).toBe(500);
      expect(response.body).toEqual(expect.objectContaining({ message: errorMessage }));
    });
  });

  describe('GET /books', () => {
    it('should return all books', async () => {
      const books = [{ title: 'Test Book 1', author: 'Author 1' }, { title: 'Test Book 2', author: 'Author 2' }];
      Book.getAll.mockResolvedValue(books);

      const response = await request(app)
        .get('/books');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(books);
    });

    it('should handle errors when fetching books', async () => {
      const errorMessage = 'Error on fetching books.';
      Book.getAll.mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .get('/books');

      expect(response.status).toBe(500); // Assuming your error handling returns 500
      expect(response.body).toEqual(expect.objectContaining({ message: errorMessage }));
    });
  });
});
