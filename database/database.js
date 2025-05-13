import sqlite3 from "sqlite3";
const sqlite = sqlite3.verbose();

// Database connection callback function
const connected = (err) => {
    if (err) {
        console.log(err.message);
        return;
    }
};

// Create a new database object
const db = new sqlite.Database(
    "./database/database.db",
    sqlite3.OPEN_READWRITE,
    connected
);

// Create the patients table if it doesn't exist
let sql = `CREATE TABLE IF NOT EXISTS patients (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	surname TEXT NOT NULL,
	cnp TEXT NOT NULL	
)`;

// Execute the SQL statement
db.run(sql, [], (err) => {
    // Check for errors
    if (err) {
        console.log(err.message);
        return;
    }
});

export default db;
