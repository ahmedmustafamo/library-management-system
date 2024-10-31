# library-management-system
Design and implement a simple library management system to manage books and borrowers.

## Steps to run the application locally:
1. install `docker`
2. add `.env` file on your directory and add the following variables into it
```bash
JWT_SECRET=mySuperSecretKey
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_db
NODE_ENV=development
DEFAULT_DOMAIN=your_default_domain_here.com
```
## Unit Tests
- run `docker-compose up`
- run `docker exec -it lms-app npm test`

## Swagger UI
- **Note**: it's not ready to expose requests from it. you can run the app locally and use any REST client "eg. Postman"
- You can find it under `/api-docs`

## Schema Diagram

Here's a simple diagram to show the created tables and its relations
```bash
+--------------------+
|       books        |
+--------------------+
| id (PK)            |
| title              |
| author             |
| isbn               |
| available_quantity |
| shelf_location     |
| created_at         |
+--------------------+

+---------------------+
|      borrowers      |
+---------------------+
| id (PK)             |
| name                |
| email               |
| registered_date     |
+---------------------+

+-----------------------+
|    borrowed_books     |
+-----------------------+
| id (PK)               |
| borrower_id (FK)      |
| book_id (FK)          |
| due_date              |
| created_at            |
+-----------------------+

+-------------------+
|       users       |
+-------------------+
| id (PK)           |
| username          |
| email             |
| password          |
| created_at        |
+-------------------+
```
Relationships:
- borrowed_books.borrower_id -> borrowers.id
- borrowed_books.book_id -> books.id

## Implemented APIs
```js
/auth APIs
/**
 * @api {post} /auth/register Register a new user
 * @apiName RegisterUser
 * @apiGroup Auth
 *
 * @apiParam {String} username User's username.
 * @apiParam {String} email User's email.
 * @apiParam {String} password User's password.
 *
 * @apiSuccess {Number} id User's unique ID.
 * @apiSuccess {String} username User's username.
 * @apiSuccess {String} email User's email.
 * @apiSuccess {String} created_at User's account creation date.
 *
 * @apiError (Error 400) BadRequest Unable to register user.
 * @apiError (Error 500) InternalServerError Error while creating user.
 */

 /**
 * @api {post} /auth/login Log in a user
 * @apiName LoginUser
 * @apiGroup Auth
 *
 * @apiParam {String} email User's email.
 * @apiParam {String} password User's password.
 *
 * @apiSuccess {String} token JWT token for authenticated user.
 *
 * @apiError (Error 401) Unauthorized Invalid credentials.
 * @apiError (Error 500) InternalServerError Error during login process.
 */

/books APIs
/**
   * @api {post} /books Add a new book
   * @apiName AddBook
   * @apiGroup Books
   *
   * @apiParam {String} title Title of the book.
   * @apiParam {String} author Author of the book.
   * @apiParam {String} isbn ISBN number of the book.
   * @apiParam {Number} available_quantity Number of copies available.
   * @apiParam {String} shelf_location Location of the book on the shelf.
   *
   * @apiSuccess {Number} id Book's unique ID.
   * @apiSuccess {String} title Title of the book.
   * @apiSuccess {String} author Author of the book.
   * @apiSuccess {String} isbn ISBN number of the book.
   * @apiSuccess {Number} available_quantity Number of copies available.
   * @apiSuccess {String} shelf_location Location of the book on the shelf.
   *
   * @apiError (Error 400) BadRequest Unable to add book.
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while adding book.
   */

  /**
   * @api {get} /books Get all books
   * @apiName GetAllBooks
   * @apiGroup Books
   *
   * @apiSuccess {Object[]} books List of books.
   * @apiSuccess {Number} books.id Book's unique ID.
   * @apiSuccess {String} books.title Title of the book.
   * @apiSuccess {String} books.author Author of the book.
   * @apiSuccess {String} books.isbn ISBN number of the book.
   * @apiSuccess {Number} books.available_quantity Number of copies available.
   * @apiSuccess {String} books.shelf_location Location of the book on the shelf.
   *
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while fetching books.
   */
  /**
   * @api {get} /books/search Search for books
   * @apiName SearchBooks
   * @apiGroup Books
   *
   * @apiParam {String} [title] Title of the book to search for.
   * @apiParam {String} [author] Author of the book to search for.
   * @apiParam {String} [isbn] ISBN number of the book to search for.
   *
   * @apiSuccess {Object[]} books List of matching books.
   * @apiSuccess {Number} books.id Book's unique ID.
   * @apiSuccess {String} books.title Title of the book.
   * @apiSuccess {String} books.author Author of the book.
   * @apiSuccess {String} books.isbn ISBN number of the book.
   * @apiSuccess {Number} books.available_quantity Number of copies available.
   * @apiSuccess {String} books.shelf_location Location of the book on the shelf.
   *
   * @apiError (Error 400) BadRequest Invalid search parameters.
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while searching for books.
   */
  /**
   * @api {get} /books/:id Get a book by ID
   * @apiName GetBookById
   * @apiGroup Books
   *
   * @apiParam {Number} id Book's unique ID.
   *
   * @apiSuccess {Number} id Book's unique ID.
   * @apiSuccess {String} title Title of the book.
   * @apiSuccess {String} author Author of the book.
   * @apiSuccess {String} isbn ISBN number of the book.
   * @apiSuccess {Number} available_quantity Number of copies available.
   * @apiSuccess {String} shelf_location Location of the book on the shelf.
   *
   * @apiError (Error 404) NotFound Book not found.
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while fetching book.
   */
  /**
   * @api {put} /books/:id Update a book
   * @apiName UpdateBook
   * @apiGroup Books
   *
   * @apiParam {Number} id Book's unique ID.
   * @apiParam {String} [title] Title of the book.
   * @apiParam {String} [author] Author of the book.
   * @apiParam {String} [isbn] ISBN number of the book.
   * @apiParam {Number} [available_quantity] Number of copies available.
   * @apiParam {String} [shelf_location] Location of the book on the shelf.
   *
   * @apiSuccess {Number} id Book's unique ID.
   * @apiSuccess {String} title Title of the book.
   * @apiSuccess {String} author Author of the book.
   * @apiSuccess {String} isbn ISBN number of the book.
   * @apiSuccess {Number} available_quantity Number of copies available.
   * @apiSuccess {String} shelf_location Location of the book on the shelf.
   *
   * @apiError (Error 404) NotFound Book not found.
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while updating book.
   */
  /**
   * @api {delete} /books/:id Delete a book
   * @apiName DeleteBook
   * @apiGroup Books
   *
   * @apiParam {Number} id Book's unique ID.
   *
   * @apiSuccess (204) NoContent Successfully deleted the book.
   *
   * @apiError (Error 404) NotFound Book not found.
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while deleting book.
   */
  
/borrowers APIs
/**
   * @api {post} /borrows Add a new borrower
   * @apiName AddBorrow
   * @apiGroup Borrowers
   *
   * @apiParam {String} name Name of the borrower.
   * @apiParam {String} email Email of the borrower.
   * @apiParam {Date} registered_date Date the borrower registered.
   *
   * @apiSuccess {Number} id Borrower's unique ID.
   * @apiSuccess {String} name Name of the borrower.
   * @apiSuccess {String} email Email of the borrower.
   * @apiSuccess {Date} registered_date Date the borrower registered.
   *
   * @apiError (Error 400) BadRequest Unable to add borrower.
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while adding borrower.
   */
  /**
   * @api {put} /borrows/:id Update a borrower
   * @apiName UpdateBorrow
   * @apiGroup Borrowers
   *
   * @apiParam {Number} id Borrower's unique ID.
   * @apiParam {String} [name] Updated name of the borrower.
   * @apiParam {String} [email] Updated email of the borrower.
   *
   * @apiSuccess {Number} id Borrower's unique ID.
   * @apiSuccess {String} name Name of the borrower.
   * @apiSuccess {String} email Email of the borrower.
   *
   * @apiError (Error 404) NotFound Borrower not found.
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while updating borrower.
   */
  /**
   * @api {delete} /borrows/:id Delete a borrower
   * @apiName DeleteBorrow
   * @apiGroup Borrowers
   *
   * @apiParam {Number} id Borrower's unique ID.
   *
   * @apiSuccess {String} message Confirmation message.
   *
   * @apiError (Error 404) NotFound Borrower not found.
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while deleting borrower.
   */
  /**
   * @api {get} /borrows Get all borrowers
   * @apiName ListBorrows
   * @apiGroup Borrowers
   *
   * @apiSuccess {Object[]} borrows List of borrowers.
   * @apiSuccess {Number} borrows.id Borrower's unique ID.
   * @apiSuccess {String} borrows.name Name of the borrower.
   * @apiSuccess {String} borrows.email Email of the borrower.
   * @apiSuccess {Date} borrows.registered_date Date the borrower registered.
   *
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while fetching borrowers.
   */
  /**
   * @api {post} /borrows/checkout Check out a book
   * @apiName CheckOutBook
   * @apiGroup Borrowers
   *
   * @apiParam {Number} borrowId Borrower's unique ID.
   * @apiParam {Number} bookId Book's unique ID.
   *
   * @apiSuccess {Object} result Details of the borrowed book.
   * @apiSuccess {Number} result.borrower_id Borrower's unique ID.
   * @apiSuccess {Number} result.book_id Book's unique ID.
   * @apiSuccess {Date} result.due_date Due date for returning the book.
   *
   * @apiError (Error 400) BadRequest Unable to check out book.
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while checking out book.
   */
  /**
   * @api {post} /borrows/return Return a book
   * @apiName ReturnBook
   * @apiGroup Borrowers
   *
   * @apiParam {Number} borrowId Borrower's unique ID.
   * @apiParam {Number} bookId Book's unique ID.
   *
   * @apiSuccess {String} message Confirmation message.
   *
   * @apiError (Error 400) BadRequest Unable to return book.
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while returning book.
   */
  /**
   * @api {get} /borrows/:borrowId/borrowedBooks List borrowed books
   * @apiName ListBorrowedBooks
   * @apiGroup Borrowers
   *
   * @apiParam {Number} borrowId Borrower's unique ID.
   *
   * @apiSuccess {Object[]} books List of borrowed books.
   * @apiSuccess {Number} books.borrower_id Borrower's unique ID.
   * @apiSuccess {Number} books.book_id Book's unique ID.
   * @apiSuccess {Date} books.due_date Due date for returning the book.
   *
   * @apiError (Error 404) NotFound Borrower not found.
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while fetching borrowed books.
   */
  /**
   * @api {get} /borrows/:borrowId/overdueBooks List overdue books
   * @apiName ListOverdueBooks
   * @apiGroup Borrowers
   *
   * @apiParam {Number} borrowId Borrower's unique ID.
   *
   * @apiSuccess {Object[]} overdueBooks List of overdue books.
   * @apiSuccess {Number} overdueBooks.borrower_id Borrower's unique ID.
   * @apiSuccess {Number} overdueBooks.book_id Book's unique ID.
   * @apiSuccess {Date} overdueBooks.due_date Due date for returning the book.
   *
   * @apiError (Error 404) NotFound Borrower not found.
   * @apiError (Error 401) Unauthorized Token not valid or expired.
   * @apiError (Error 500) InternalServerError Error while fetching overdue books.
   */
  
```
## Functional Requirements

### Books:
- [x] Add a book with details like title, author, ISBN, available quantity, and shelf location.
- [x] Update a book’s details.
- [x] Delete a book.
- [x] List all books.
- [x] Search for a book by title, author, or ISBN.

### Borrowers:
- [x] Register a borrower with details like name, email, and registered date (Keep the user details as simple as possible).
- [x] Update borrower’s details.
- [x] Delete a borrower.
- [x] List all borrowers.
- [x] Borrowing Process:
- [x] A borrower can check out a book. The system should keep track of which books are checked out and by whom.
- [x] A borrower can return a book.
- [x] A borrower can check the books they currently have.
- [x] The system should keep track of due dates for the books and list books that are overdue.

## Non-functional Requirements
- [x] Performance: The system should be optimized for reading operations since searching and listing books/borrowers will be frequent operations.
- [x] Scalability: The system design should support the addition of new features in the future, like reservations or reviews.
- [x] Security: Ensure that user inputs are validated to prevent SQL injection or other potential security threats.
    - Applied it only on /books/search API as a sample by make all parameters' validation required

## TODO (Optional):
- [ ] The system can show analytical reports of the borrowing process in a specific period and export the borrowing process data in CSV or Xlsx sheet formats e.x.
- [ ] Exports all overdue borrows of the last month.
- [ ] Exports all borrowing processes of the last month.
- [x] Implement rate limiting for the API to prevent abuse. (Choose only two endpoints to apply the rate-limiting).
- [x] Dockerizing the application using docker-compose.
- [x] Implement basic authentication for the API.
- [x] Add unit tests (Adding unit tests for only one module shall be enough, choose the easiest one).

## Technical Requirements
1. **Programming**: NodeJs.
2. **Documentation**: Use Swagger UI interface to deal with the APIs.
3. **Database**: Use a relational database system (e.g., PostgreSQL, MySQL).
4. **API**: Implement a RESTful API to support all the above operations.
5. **Error Handling**: The system should gracefully handle errors and provide meaningful feedback.
