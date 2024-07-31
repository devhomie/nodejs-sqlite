import sqlite3 from "sqlite3"

const sqlite = sqlite3.verbose();

// open the database
let db = new sqlite.Database(":memory:", (err) => {
  if (err) {
    console.error(err.message);
  }
});

db.parallelize(() => {
  dbSum(1, 1, db);
  dbSum(2, 2, db);
  dbSum(3, 3, db);
  dbSum(4, 4, db);
  dbSum(5, 5, db);
});
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});

function dbSum(a, b, db) {
  db.get("SELECT (? + ?) sum", [a, b], (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(`The sum of ${a} and ${b} is ${row.sum}`);
  });
}

// As you see in the output, the order of execution is not the same as it was called in the program.

// Notice that the statements execute in parallel, therefore, each time you run the program, the order of execution may be different.