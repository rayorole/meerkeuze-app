var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("database.db");

db.serialize(function () {
  db.run("ALTER TABLE vragen ADD COLUMN score INTEGER DEFAULT 0");
});
