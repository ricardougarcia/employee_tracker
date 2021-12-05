const express = require("express");
const mysql = require("mysql2");
const cTable = require("console.table");

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
