const postgresClient  = require('../clients/postgresClient')

class Model {
    static async getAllBooks() {
        const data = await postgresClient.query('SELECT * FROM book')
        const books = data.rows
        return books
    }

    static async getBookByISBN() {

    }

    static async getBookByAuthor() {

    }

    static async insertBook(bookData) {
        console.log("model" , bookData)
        await postgresClient.query
            (
                'INSERT INTO book (title, ISBN,author, available_quantity,shelf_location) VALUES ($1, $2,$3,$4,$5)',
                [bookData.title, bookData.ISBN, bookData.author, bookData.available_quantity, bookData.shelf_location]
            )
        console.log("Inserted data succeffly 1️⃣")
    }


}

module.exports = Model;