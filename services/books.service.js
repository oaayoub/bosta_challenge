const {BooksModel} = require("../models/index");

class BookService {
  
  static async getAllBooks() {
    return await BooksModel.getAllBooks();
  }

  static async searchForBook(bookInfo) {
    console.log("search for book 🔍: ", bookInfo);
    //TODO: refactor this to make it check all them and return best answer
    switch (true) {
      case bookInfo.ISBN !== undefined:
        return await BooksModel.getBookByISBN(bookInfo.ISBN);

      case bookInfo.title !== undefined:
        return await BooksModel.getBookByTitle(bookInfo.title);

      case bookInfo.author !== undefined:
        return await BooksModel.getBookByAuthor(bookInfo.author);

      default:
        throw new Error("Invalid book info provided.");
    }
  }

  static async insertBook(bookData) {
    return await BooksModel.insertBook(bookData);
  }

  static async modifyBook(ISBN, update) {
    return await BooksModel.updateBook(ISBN, update);
  }

  static async deleteBook(ISBN) {
    return await BooksModel.deleteBook(ISBN);
  }
}

module.exports = BookService;
