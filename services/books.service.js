const BookModel = require("../models/books.model");

class Service {
  static async getAllBooks() {
    return await BookModel.getAllBooks();
  }

  static async searchForBook(bookInfo) {
    console.log("search for book 🔍: ", bookInfo);
    //TODO: refactor this to make it check all them and return best answer 
    switch (true) {
      case bookInfo.ISBN !== undefined:
        return await BookModel.getBookByISBN(bookInfo.ISBN);

      case bookInfo.title !== undefined:
        return await BookModel.getBookByTitle(bookInfo.title);

      case bookInfo.author !== undefined:
        return await BookModel.getBookByAuthor(bookInfo.author);

      default:
        throw new Error("Invalid book info provided.");
    }
  }

  static async insertBook(bookData) {
    return await BookModel.insertBook(bookData);
  }

  static async modifyBook(ISBN, update) {
    return await BookModel.updateBook(ISBN, update);
  }

  static async deleteBook(ISBN) {
    return await BookModel.deleteBook(ISBN);
  }
}

module.exports = Service;
