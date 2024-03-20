const {BooksModel} = require("../models/index");
const {redisClient} = require("../clients/index");
const redisKeys = require("../constants/redisKeys.constants");
class BookService {
  
  static async getAllBooks() {
    var cachedBooks = await redisClient.getCached(redisKeys[0])
    console.debug("🔶📝 service getAllBooks :: ",cachedBooks)
    if(cachedBooks!==null){
      try {
        var parsedData = await JSON.parse(cachedBooks);
        console.debug("Prased data :::",parsedData)
        return parsedData
      }
      catch(e){
        console.error("couldnt parse data")
      }
      return cachedBooks
    }
    var books = await BooksModel.getAllBooks();
    console.debug("🔶📝 service writing  :: ",books)
    redisClient.writeData(redisKeys[0],books)
    return 
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
    redisClient.invalidateKey(redisKeys[0])
    return await BooksModel.insertBook(bookData);
  }

  static async modifyBook(ISBN, update) {
    redisClient.invalidateKey(redisKeys[0])
    return await BooksModel.updateBook(ISBN, update);
  }

  static async deleteBook(ISBN) {
    redisClient.invalidateKey(redisKeys[0])
    return await BooksModel.deleteBook(ISBN);
  }
}

module.exports = BookService;
