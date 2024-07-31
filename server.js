import sqlite3 from "sqlite3";

const sqlite = sqlite3.verbose();

// open the database
let db = new sqlite.Database("./db/sample.db", (err) => {
  if (err) {
    console.error(err.message);
  }
});


// insert one row into the langs table
db.run(`INSERT INTO langs(name) VALUES(?)`, ["C"], function (err) {
  if (err) {
    return console.log(err.message);
  }
  // get the last insert id
  console.log(`A row has been inserted with rowid ${this.lastID}`);
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Close the database connection.");
});
