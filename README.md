# Notes on this Node.js and Sqlite


## To query data in SQLite database from a Node.js application, you use these steps:

    1. Open a database connection.
    2. Execute a SELECT statement and process the result set.
    3. Close the database connection.

## Querying all rows with all() omethod

The `all()` method allows you to execute an **SQL** query with specified parameters and call a callback to access the rows in the result set.

The following is the signature of the all() method:

```javascript
db.all(sql,params,(err, rows ) => {
    // process rows here    
});
```

- The `err` argument stores the error detail in case there was an error occurred during the execution of the query.
- Otherwise, the `err` will be `null`.
- If the **query** is executed successfully, the `rows` argument contains the result set.

Because the `all()` **method** retrieves all rows and places them in the memory, therefore, for the large result set, you should use the `each(`) **method**.

The following example illustrates **how to query data** from the **playlists table** in the sample database using the `all()` **method**:

```javascript
const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('./db/chinook.db');

let sql = `SELECT DISTINCT Name name FROM playlists
           ORDER BY name`;

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row.name);
  });
});

// close the database connection
db.close();
```