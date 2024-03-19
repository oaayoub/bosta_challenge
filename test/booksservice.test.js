const chai = require("chai");
const { expect } = chai;
var sinon = require("sinon");
const BooksModel = require("../models/books.model");
const BookService = require("../services/books.service");

const expectedBookFromISBN = { title: "Book 1", ISBN: "12345" };
sinon.stub(BooksModel, "getBookByISBN").resolves(expectedBookFromISBN);
const expectedBooks = [{ title: "Book 1" }, { title: "Book 2" }];
sinon.stub(BooksModel, "getAllBooks").resolves(expectedBooks);
const expectedBookFromTitle = { title: "Book 2", ISBN: "67890" };
sinon.stub(BooksModel, "getBookByTitle").resolves(expectedBookFromTitle);
const expectedBookFromAuthor = { title: "Book 3", author: "Author" };
sinon.stub(BooksModel, "getBookByAuthor").resolves(expectedBookFromAuthor);

describe("BookService", () => {
  it("should return all books", async () => {
    const result = await BookService.getAllBooks();
    expect(result).to.deep.equal(expectedBooks);
  });
  describe("should search For Book", () => {
    it("should return book by ISBN", async () => {
      const bookInfo = { ISBN: "12345" };
      const result = await BookService.searchForBook(bookInfo);
      expect(result).to.deep.equal(expectedBookFromISBN);
    });

    it("should return book by title", async () => {
      const bookInfo = { title: "Book 2" };
      const result = await BookService.searchForBook(bookInfo);
      expect(result).to.deep.equal(expectedBookFromTitle);
    });

    it("should return book by author", async () => {
      const bookInfo = { author: "Author" };
      const result = await BookService.searchForBook(bookInfo);
      expect(result).to.deep.equal(expectedBookFromAuthor);
    });

    it("should throw error for invalid book info", async () => {
      const bookInfo = {};
      try {
        await BookService.searchForBook(bookInfo);
        chai.assert.fail("Expected an error to be thrown");
      } catch (error) {
        expect(error.message).to.equal("Invalid book info provided.");
      }
    });
  });
});
