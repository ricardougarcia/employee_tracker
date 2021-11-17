const express = require("express");
const prompt = require("./public/prompt");
const mysql = require("mysql2");
const cTable = require("console.table");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// turn on routes
// app.use(routes);

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

app.get("/role", (req, res) => {
  // GET a response from server that pulls all movies
  db.query("SELECT * FROM emp_tracker_db.role", function (err, results) {
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT} 🚀`);
});
