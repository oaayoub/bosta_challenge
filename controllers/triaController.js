const {pool} = require('../db.js')
const registerView = async (req, res) => {
    res.send("<h1>new called</h1>" );
}
// For View 
const loginView = async (req, res) => {
    res.send({"setup" : "omar logges in"});

}
const basicView = async (req, res) => {

    res.send({"login" : "omar logges in"});

}

const send = async (req, res) => {
    res.send({"send" : "omar logges in"});
    try {
        const data = await pool.query('SELECT * FROM schools')
        res.status(200).send(data.rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

const ins = async (req, res) => {

    const { name, location } = req.body
    try {
        await pool.query('INSERT INTO schools (name, address) VALUES ($1, $2)', [name, location])
        res.status(200).send({ message: "Successfully added child" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

const setup = async (req, res) => {
    console.log("setup called")
    res.send({"setup" : "omar logges in"});

    try {
        await pool.query('CREATE TABLE schools( id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))')
        console.log("passed")
        res.send("Successfully created table")
    } catch (err) {
        console.log("failed",err)
        res.send(`omar failed setup ${err}`)
    }
}

module.exports =  {
    registerView,
    loginView,
    basicView,
    send,
    setup,
    ins
};