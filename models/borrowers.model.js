const postgresClient = require('../clients/postgresClient')

class Model {
    static async getAllBorrowers() {
        const data = await postgresClient.query('SELECT * FROM borrower')
        console.log("borrowers data", data)
        const books = data.rows
        return books
    }

    static async insertBorrower(borrowerInfo) {
        console.log("borrower model" , borrowerInfo)
        await postgresClient.query
            (
                'INSERT INTO borrower (email, name) VALUES ($1, $2)',
                [borrowerInfo.email, borrowerInfo.name]
            )
        console.log("Inserted data succeffly 2️⃣")
    }
}

module.exports = Model;