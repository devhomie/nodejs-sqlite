import sqlite3 from "sqlite3"

const sqlite = sqlite3.verbose();

// open the database
let db = new sqlite.Database(
  "./chinook.db",
  sqlite.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the chinook database.");
  }
);
// *********** .all() METHOD EXAMPLE
let sqlALL = `SELECT DISTINCT Name name FROM playlists
ORDER BY name`;

db.all(sqlALL, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row.name);
  });
});
// *********** .all() METHOD EXAMPLE


// *********** .get() METHOD EXAMPLE
let sqlGET = `SELECT PlaylistId id,
Name name
FROM playlists
WHERE PlaylistId  = ?`;
let playlistId = 5;

// first row only
db.get(sqlGET, [playlistId], (err, row) => {
  if (err) {
    return console.error(err.message);
  }
  return row
  ? console.log(row.id, row.name)
  : console.log(`No playlist found with the id ${playlistId}`);
  
});
// *********** .get() METHOD EXAMPLE


db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});