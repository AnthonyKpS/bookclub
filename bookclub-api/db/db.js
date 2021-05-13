const sqlite3 = require('sqlite3').verbose()

// Creating the database and connecting to it
let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('In-memory database created and connected to.');
});

module.exports = db
