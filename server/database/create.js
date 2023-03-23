// Create a new sqlite3 database
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");

// Create a new table
db.serialize(function () {
  db.run(
    "CREATE TABLE IF NOT EXISTS vragen (id INTEGER PRIMARY KEY AUTOINCREMENT, vraag TEXT, opties TEXT, juiste_optie TEXT)"
  );
});

// Close the database
db.close();
