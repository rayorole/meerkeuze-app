const express = require("express");
const cors = require("cors");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database/database.db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  db.all("SELECT * FROM vragen ORDER BY score desc;", (err, rows) => {
    if (err) {
      res.json(err.message);
      console.log(err.message);
      return;
    }
    res.json(rows);
  });
});

app.post("/", (req, res) => {
  const { vraag, opties, juiste_optie } = req.body;

  db.run(
    "INSERT INTO vragen (vraag, opties, juiste_optie) VALUES (?, ?, ?)",
    [vraag, JSON.stringify(opties), juiste_optie],
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    }
  );

  res.json("Data added");
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  db.all(`SELECT * FROM vragen WHERE id = ${id}`, (err, rows) => {
    if (err) {
      res.json(err.message);
      console.log(err.message);
      return;
    }
    res.json(rows);
  });
});

// Update score by one when correct answer is given
app.put("/:id", (req, res) => {
  const id = req.params.id;
  db.run(`UPDATE vragen SET score = score + 1 WHERE id = ${id}`, (err) => {
    if (err) {
      res.json(err.message);
      console.log(err.message);
      return;
    }
    res.json("Score updated");
  });
});

app.listen(3000, () => {
  console.log("Server running on port http://localhost:3000/");
});
