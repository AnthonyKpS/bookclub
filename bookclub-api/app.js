// Express
const express = require('express')
const app = express()

// Cors
const cors = require('cors')
app.use(cors())

// Sqlite3 Database
const db = require('./db/db.js')
let tableName = "books"
let tableCreationQuery = `
    CREATE TABLE ${tableName} (
        id INTEGER NOT NULL PRIMARY KEY,
        author TEXT NOT NULL,
        title TEXT NOT NULL,
        genre TEXT NOT NULL,
        price FLOAT NOT NULL
    );`
db.run(tableCreationQuery, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log(`"${tableName}" table was created successfully.`)
})

// Json Parser
const jsonParser = express.json()

// Jsonschema validator
const Validator = require('jsonschema').Validator
const v = new Validator()
const bookInsertionRequestSchema = require('./models/BookInsertionRequest.json')

// Routes
app.get('/', (req, res) => { indexController() })

app.post('/books', jsonParser, (req, res) => { booksPostController(req, res) })

app.get('/books', (req, res) => { booksGetController(req, res) })

// Controllers
const indexController = () => {
    res.send(`Bookclub is listening at http://localhost:${port}`)
}

const booksPostController = async (req, res) => {

    // Validate the request body
    let validity = v.validate(req.body, bookInsertionRequestSchema).valid
    if (!validity) {
        res.json({
            book_insertion: false,
            message: "The request's body does not correspond to the correct request body for a book insertion."
        })
    }

    // Create a "local" book obj
    let newBook = {
        author: req.body.author,
        title: req.body.title,
        genre: req.body.genre,
        price: req.body.price
    }

    // Insert the new book into the Database
    const insertion = await insertBook(newBook)
    if (insertion) {
        res.json({
            book_insertion: true,
            message: "You added a book."
        })
    } else {
        res.json({
            book_insertion: false,
            message: insertion
        })
    }
}

const booksGetController = async (req, res) => {

    // Check for a keyword
    // DISCLAIMER: The keyword should be sanitized here.
    const keyword = req.query.keyword
    if (keyword) {

        // Do the search and return the results
        const search = await searchByKeyword(keyword)
        res.json({
            books: search
        })
    } else {
        // Otherwise return all of the available books
        const search = await returnAllBooks()
        res.json({
            books: search
        })
    }
}

// Database Interaction Functions
function insertBook(book) {

    return new Promise((resolve, reject) => {

        // Prepare the sql insertion query
        let insertionQuery = `
            INSERT INTO ${tableName}(author, title, genre, price) 
            VALUES(?, ?, ?, ?)
        `
        db.run(insertionQuery, [book.author, book.title, book.genre, book.price], (err) => {
            if (err) {
                reject(err.message)
            }
            resolve(true)
        })
    })
}

function searchByKeyword(keyword) {

    return new Promise((resolve, reject) => {

        // Prepare the sql search query
        let searchQuery = `
            SELECT id, author, title, genre, price 
            FROM ${tableName}
            WHERE title LIKE ?
        `
        db.all(searchQuery, ['%' + keyword + '%'], (err, rows) => {
            if (err) {
                reject(err.message)
            }
            resolve(rows)
        })
    })
}

function returnAllBooks() {

    return new Promise((resolve, reject) => {

        let showAllQuery = `
            SELECT *
            FROM ${tableName}
        `
        db.all(showAllQuery, [], (err, rows) => {
            if (err) {
                reject(err.message)
            }
            resolve(rows)
        })
    })
}

// Start the server
const port = 3000
app.listen(port, () => {
    console.log(`Bookclub is listening at http://localhost:${port}`)
})