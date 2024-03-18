const postgresClient = require("../clients/postgresClient");
const { createBookModifyQuery } = require("../helpers/updateQuery.helper");
const InternalError = require("../Error/Internal.error");
const getCurrentLine = require("get-current-line");

class BookModel {
  static async getAllBooks() {
    try {
      const data = await postgresClient.query("SELECT * FROM book");
      const books = data.rows;
      return books;
    } catch (err) {
      throw new InternalError(
        `📚⭕DB ERROR : SELECT * FROM book; not working`
      );
    }
  }

  static async getBookByISBN(ISBN) {
    try {
      const data = await postgresClient.query(
        `SELECT * FROM book WHERE ISBN = '${ISBN}';`
      );
      const books = data.rows;
      return books;
    } catch (err) {
      console.log("🔴\nmy object: %o\n🔴", getCurrentLine.default());
      throw new InternalError(
        `📚⭕DB ERROR : SELECT * FROM book WHERE ISBN = '${ISBN}'; not working`
      );
    }
  }

  static async getBookByAuthor(author) {
    try {
      console.log("get book by author");
      const data = await postgresClient.query(
        `SELECT * FROM book WHERE author LIKE '%${author}%';`
      );
      const books = data.rows;
      console.log("get book by author res", books);
      return books;
    } catch (err) {
      console.log("🔴\nmy object: %o\n🔴", getCurrentLine.default());
      throw new InternalError(
        `📚⭕DB ERROR : SELECT * FROM book WHERE author LIKE '%${author}%';  not working`
      );
    }
  }

  static async getBookByTitle(title) {
    try {
      const data = await postgresClient.query(
        `SELECT * FROM book WHERE title LIKE '%${title}%';`
      );
      const books = data.rows;
      return books;
    } catch (err) {
      console.log("🔴\nmy object: %o\n🔴", getCurrentLine.default());
      throw new InternalError(
        `📚⭕DB ERROR :  SELECT * FROM book WHERE title LIKE '%${title}%';  not working`
      );
    }
  }

  static async updateBook(ISBN, updates) {
    try {
      console.log("modeBook updateBook : ", ISBN, updates);
      const sqlCommand = createBookModifyQuery(ISBN, updates);
      const data = await postgresClient.query(sqlCommand);
      const books = data.rows;
      console.log("📚modify book SQL🖌: \n", sqlCommand);
      console.log("📚modify book result🖌: \n", books);
      return books;
    } catch (err) {
      console.log("🔴\nmy object: %o\n🔴", getCurrentLine.default());
      throw new InternalError(
        `📚⭕DB ERROR :  SELECT * FROM book WHERE title LIKE '%${title}%';  not working`
      );
    }
  }

  static async deleteBook(ISBN) {
    try {
      let res = await postgresClient.query(
        `DELETE FROM book WHERE ISBN = '${ISBN}';`
      );
      console.log("IMP:: ", res);
      return res;
    } catch (err) {
      console.log("🔴\nmy object: %o\n🔴", getCurrentLine.default());
      throw new InternalError(
        `📚⭕DB ERROR :  SELECT * FROM book WHERE title LIKE '%${title}%';  not working`
      );
    }
  }

  static async insertBook(bookData) {
    try {
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
    } catch (err) {
      console.log("🔴\nmy object: %o\n🔴", getCurrentLine.default());
      throw new InternalError(`📚⭕DB ERROR :  ${bookData}  not working`);
    }
  }
}

module.exports = BookModel;
