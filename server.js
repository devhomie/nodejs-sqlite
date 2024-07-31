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

// insert rows into the langs table with the data from the following languages array:
let languages = ["C++", "Python", "Java", "C#", "Go"];

// To construct the INSERT statement, we use the map() method to map 
// each element in the languages array into (?) and then join all placeholders together.
let placeholders = languages.map((language) => "(?)").join(",");
let sql = "INSERT INTO langs(name) VALUES " + placeholders;

// output the INSERT statement
console.log(sql);

db.run(sql, languages, function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Rows inserted ${this.changes}`);
  console.log(this);
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Close the database connection.");
});
