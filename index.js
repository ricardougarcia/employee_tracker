// DEPENDENCIES
const inquirer = require("inquirer");
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

// FUNCTIONS
const displayDepartments = () => {
  console.log("I'm going to display the departments");
  // will print array of objects as table to console. This is not departments atm.
  db.query(`SELECT * FROM department`, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    // return to start prompt again
    start();
  });
};

const displayAllRoles = () => {
  // console.log(
  //   "I'm going to display all job titles, role ids, the department, and salary"
  // );
  // this is not pulling any data?
  db.query(
    `USE emp_tracker_db;
    SELECT role.title AS title, role.salary AS salary, role.id AS id, department.name AS department FROM role JOIN department ON role.department_id = department.id`,
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      // return to start prompt again
      start();
    }
  );
};

const displayAllEmployees = () => {
  console.log(
    "I'm going to display with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to"
  );
  // this is pulling employees but is missing department (also id is null)?
  db.query(`SELECT * FROM employee`, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    // return to start prompt again
    start();
  });
};

const addDepartment = (userInput) => {
  console.log(userInput);
  // db.connect(function (err) {
  //   if (err) throw err;
  //   console.log("connect method working");
  //   const add = `INSERT INTO department (name) VALUES (${userInput})`;
  // });
};

const exit = () => {
  process.kill();
};

const start = () => {
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        type: "list",
        name: "userChoice",
        message: "What would you like to do?",
        choices: [
          "viewAllDepartments",
          "displayAllRoles",
          "displayAllEmployees",
          "addDepartment",
          "exit",
        ],
      },
    ])
    .then(({ userChoice }) => {
      // console.log(userChoice);

      switch (userChoice) {
        case "viewAllDepartments":
          return displayDepartments();
        case "exit":
          return exit();
        case "displayAllRoles":
          return displayAllRoles();
        case "displayAllEmployees":
          return displayAllEmployees();
        case "addDepartment":
          inquirer
            .prompt([
              {
                type: "input",
                name: "newDepartment",
                message: "What department would you like to add?",
              },
            ])
            .then((userInput) => {
              addDepartment(userInput);
            });
        // it appears it isjumping to the default but still calling the function after the user submits
        default:
          console.log("this is the default");
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
};

// trigger prompt
start();

// USER INTERACTIONS

module.exports = inquirer;
