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
    - Applied it only on /books/search API as a sample by make all parameters required

## TODO (Optional):
- [ ] The system can show analytical reports of the borrowing process in a specific period and export the borrowing process data in CSV or Xlsx sheet formats e.x.
- [ ] Exports all overdue borrows of the last month.
- [ ] Exports all borrowing processes of the last month.
- [x] Implement rate limiting for the API to prevent abuse. (Choose only two endpoints to apply the rate-limiting).
- [x] Dockerizing the application using docker-compose.
- [-] Implement basic authentication for the API.
- [ ] Add unit tests (Adding unit tests for only one module shall be enough, choose the easiest one).

## Technical Requirements
1. **Programming**: NodeJs.
2. **Documentation**: Use Swagger UI interface to deal with the APIs.
3. **Database**: Use a relational database system (e.g., PostgreSQL, MySQL).
4. **API**: Implement a RESTful API to support all the above operations.
5. **Error Handling**: The system should gracefully handle errors and provide meaningful feedback.
