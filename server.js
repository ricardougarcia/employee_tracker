const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "mysqlabc123",
    database: "emp_tracker_db",
  },
  console.log(`Connected to the emp_tracker_db database.`)
);

// Query database
db.query("SELECT * FROM emp_tracker_db", function (err, results) {
  console.log(results);
});

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT} 🚀`);
});
