import sqlite3 from "sqlite3"

const sqlite = sqlite3.verbose();

// open the database
let db = new sqlite.Database(":memory:", (err) => {
  if (err) {
    console.error(err.message);
  }
});

db.serialize(() => {
  // Queries scheduled here will be serialized.
  db.run("CREATE TABLE greetings(message text)")
    .run(
      `INSERT INTO greetings(message)
          VALUES('Hi'),
                ('Hello'),
                ('Welcome')`
    )
    .each(`SELECT message FROM greetings`, (err, row) => {
      if (err) {
        throw err;
      }
      console.log(row.message);
    });
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});

// Notice that if you don’t place three statements in the serialize() method, all the three statements may execute in parallel which would cause an error.