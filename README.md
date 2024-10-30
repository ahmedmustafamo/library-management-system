# library-management-system
Design and implement a simple library management system to manage books and borrowers.

## Functional Requirements

### Books:
- [ ] Add a book with details like title, author, ISBN, available quantity, and shelf location.
- [ ] Update a book’s details.
- [ ] Delete a book.
- [ ] List all books.
- [ ] Search for a book by title, author, or ISBN.

### Borrowers:
- [ ] Register a borrower with details like name, email, and registered date (Keep the user details as simple as possible).
- [ ] Update borrower’s details.
- [ ] Delete a borrower.
- [ ] List all borrowers.
- [ ] Borrowing Process:
- [ ] A borrower can check out a book. The system should keep track of which books are checked out and by whom.
- [ ] A borrower can return a book.
- [ ] A borrower can check the books they currently have.
- [ ] The system should keep track of due dates for the books and list books that are overdue.

## Non-functional Requirements
- [ ] Performance: The system should be optimized for reading operations since searching and listing books/borrowers will be frequent operations.
- [ ] Scalability: The system design should support the addition of new features in the future, like reservations or reviews.
- [ ] Security: Ensure that user inputs are validated to prevent SQL injection or other potential security threats.

## TODO (Optional):
- [ ] The system can show analytical reports of the borrowing process in a specific period and export the borrowing process data in CSV or Xlsx sheet formats e.x.
- [ ] Exports all overdue borrows of the last month.
- [ ] Exports all borrowing processes of the last month.
- [ ] Implement rate limiting for the API to prevent abuse. (Choose only two endpoints to apply the rate-limiting).
- [ ] Dockerizing the application using docker-compose.
- [ ] Implement basic authentication for the API.
- [ ] Add unit tests (Adding unit tests for only one module shall be enough, choose the easiest one).

## Technical Requirements
1. **Programming**: NodeJs.
2. **Documentation**: Use Swagger UI interface to deal with the APIs.
3. **Database**: Use a relational database system (e.g., PostgreSQL, MySQL).
4. **API**: Implement a RESTful API to support all the above operations.
5. **Error Handling**: The system should gracefully handle errors and provide meaningful feedback.

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
