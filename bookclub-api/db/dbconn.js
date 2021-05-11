const sqlite3 = require('sqlite3').verbose()

// Setting up the database connection and creating the required table
let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('In-memory database connection was successfull.');
});

module.exports = db