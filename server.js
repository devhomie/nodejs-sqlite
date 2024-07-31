import sqlite3 from "sqlite3"

const sqlite = sqlite3.verbose();

// open the database
let db = new sqlite.Database("./db/sample.db", (err) => {
  if (err) {
    console.error(err.message);
  }
});


db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});
