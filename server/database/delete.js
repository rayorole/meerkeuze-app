// Create a new sqlite3 database
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");

// Create a new table
db.serialize(function () {
  db.run("DELETE FROM vragen;");
});

// Close the database
db.close();
