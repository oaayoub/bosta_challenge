const Model = require("../models/books.model");

class Service {
  static async getAllBooks() {
    return await Model.getAllBooks();
  }

  static async searchForBook(bookInfo) {
    console.log("search for book 🔍: ", bookInfo);
    switch (true) {
      case bookInfo.author !== undefined:
        return await Model.getBookByAuthor(bookInfo.author);

      case bookInfo.ISBN !== undefined:
        return await Model.getBookByISBN(bookInfo.ISBN);

      case bookInfo.title !== undefined:
        return await Model.getBookByTitle(bookInfo.title);

      default:
        throw new Error("Invalid book info provided.");
    }
  }

  static async insertBook(bookData) {
    return await Model.insertBook(bookData);
  }

  static async modifyBook(ISBN, update) {
    return await Model.updateBook(ISBN, update);
  }

  static async deleteBook(ISBN) {
    return await Model.deleteBook(ISBN);
  }
}

module.exports = Service;
