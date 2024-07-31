# Notes on Node.js and SQLite


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

***

## Query the first row in the result set

>When you know that the result set contains zero or one row 
>>e.g., querying a row based on the **primary key** or querying with only one **aggregate function** such as **count, sum, max, min,** etc.
>
>you can use the `get()` method of Database object.

***

## Query rows with each() method

>The `each()` method executes an SQL query with specified **parameters** and **calls a callback** *for* **every row** in the **result set**.

The following illustrates the each() method:

```javascript

db.each(sql,params, (err, result) => {
   // process each row here
});

```

>If the result set is empty, the callback is never called. 
>
>In case there is an error, the err parameter contains detailed information.

***

DATE: 2024-07-31

TIME: 15:59:05

***

## Controlling the Execution Flow of Statements

Learning how to control the execution flow of statements.

>The `sqlite3` module provides you with **two methods** for **controlling** the *execution* flow of statements. 
>>The `serialize()` method allows you to execute statements in serialized mode
>>
>>while the `parallelize()` method executes the statements in parallel.

### Executing statement in serialized mode with Database.serialize

>The `serialize()` method puts the *execution mode* into **serialized mode**.
>>It means that only one statement can execute at a time. 
>
>Other statements will wait in a **queue** until all the previous statements are executed.

It’s safe to nest the `serialize()` method as follows:

```javascript

db.serialize(() => {
  // queries will execute in serialized mode
  db.serialize(() => {
    // queries will execute in serialized mode
  });
  // queries will execute in serialized mode
});


```

Suppose, you want to execute the following three statements in sequence:

    1. Create a new table.
    2. Insert data into the table.
    3. Query data from the table.

To do this, you place these statements in the serialize() method as follows:

```javascript

const sqlite3 = require('sqlite3').verbose();

// open the database connection
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error(err.message);
  }
});

db.serialize(() => {
  // Queries scheduled here will be serialized.
  db.run('CREATE TABLE greetings(message text)')
    .run(`INSERT INTO greetings(message)
          VALUES('Hi'),
                ('Hello'),
                ('Welcome')`)
    .each(`SELECT message FROM greetings`, (err, row) => {
      if (err){
        throw err;
      }
      console.log(row.message);
    });
});

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
});


```

***

### Executing statements in parallel with Database.parallelize

>If you want the scheduled queries to execute in **parallel**, you place them in the `parallelize()` method.

Similar to the serialize() method, it is safe to nest the parallelize() method as follows:

```javascript

db.parallelize(() => {
  // queries will execute in parallel mode
  db.parallelize(() => {
    // queries will execute in parallel mode
  });
  // queries will execute in parallel mode
});


```

***
DATE: 2024-07-31

TIME: 16:50:23
***

## Inserting Data Into an SQLite Table from a Node.js Application

Learning how to insert one or more row into an SQLite table from a Node.js application.


To insert data into an SQLite table from a Node.js application, you follow these steps:

    1. Open a database connection.
    2. Execute an INSERT statement.
    3. Close the database connection.

To execute an `INSERT` statement, you use the `run()` method of the Database object:

```javascript

db.run(sql, params, function(err){
  // 
});

```

>The `run()` method executes an `INSERT` statement with **specified parameters** and calls a **callback** afterwards.
>
>If an error occurred, you can **find the detailed information** in the `err` argument of the **callback** function.