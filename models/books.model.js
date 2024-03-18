const postgresClient = require("../clients/postgresClient");
const bookHelper = require("../helpers/books.helper");

class Model {
  static async getAllBooks() {
    const data = await postgresClient.query("SELECT * FROM book");
    const books = data.rows;
    return books;
  }

  static async getBookByISBN(ISBN) {
    const data = await postgresClient.query(
      `SELECT * FROM book WHERE ISBN = '${ISBN}';`
    );
    const books = data.rows;
    return books;
  }

  static async getBookByAuthor(author) {
    const data = await postgresClient.query(
      `SELECT * FROM book WHERE author LIKE '%${author}%';`
    );
    const books = data.rows;
    return books;
  }

  static async getBookByTitle(title) {
    const data = await postgresClient.query(
      `SELECT * FROM book WHERE title LIKE '%${title}%';`
    );
    const books = data.rows;
    return books;
  }

  static async updateBook(ISBN, updates) {
    const sqlCommand = bookHelper(ISBN, updates);
    const data = await postgresClient.query(sqlCommand);
    const books = data.rows;
    console.log("📚modify book SQL🖌: \n", sqlCommand);
    console.log("📚modify book result🖌: \n", books);
    return books;
  }

  static async deleteBook(ISBN) {
    let res = await postgresClient.query(
      `DELETE FROM book WHERE ISBN = '${ISBN}';`
    );
    console.log("IMP:: ",res)
    return res;
  }

  static async insertBook(bookData) {
    await postgresClient.query(
      "INSERT INTO book (title, ISBN,author, available_quantity,shelf_location) VALUES ($1, $2,$3,$4,$5)",
      [
        bookData.title,
        bookData.ISBN,
        bookData.author,
        bookData.available_quantity,
        bookData.shelf_location,
      ]
    );
    console.log("📚Inserted data succeffly");
  }
}

module.exports = Model;
