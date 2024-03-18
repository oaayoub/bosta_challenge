const Model = require('../models/books.model')

class Service {
    static async getAllBooks() {
        return Model.getAllBooks()
    }

    static async getBookByISBN() {
        return Model.getBookByISBN()

    }

    static async getBookByAuthor() {
        return Model.getBookByAuthor()
    }

    static async insertBook(bookData) {
        return Model.insertBook(bookData)
    }
}

module.exports = Service;