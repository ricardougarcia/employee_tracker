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
const displayDepartments = async () => {
  console.log("I'm going to display the departments");
  // will print array of objects as table to console. This is not departments atm.
  const results = await db.promise().query(`SELECT * FROM department`);
  console.table(results[0]);
  // return to start prompt again
  start();
};

const displayAllRoles = () => {
  // console.log(
  //   "I'm going to display all job titles, role ids, the department, and salary"
  // );
  // this is not pulling any data?
  db.query(
    `SELECT role.title, role.salary, role.id, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id`,
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
  // this is pulling employees but is missing department (also id is null)?
  db.query(
    `SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, manager.last_name AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`,
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

const addDepartment = (userInput) => {
  console.log(userInput);
  // db.connect(function (err) {
  //   if (err) throw err;
  //   console.log("connect method working");
  //   const add = `INSERT INTO department (name) VALUES (${userInput})`;
  // });
};
const addEmployee = async () => {
  const roles = await db.promise().query(`SELECT id, title FROM role`);
  const managers = await db
    .promise()
    .query(`SELECT last_name, id FROM employee`);

  const newEmployee = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What's their first name?",
    },
    {
      type: "list",
      name: "role_id",
      message: "Please select employee role",
      choices: roles[0].map((role) => ({ name: role.title, value: role.id })),
    },
  ]);
  console.log(newEmployee);
};

const exit = () => {
  process.kill();
};

const start = async () => {
  const { userChoice } = await inquirer.prompt([
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
        "addEmployee",
        "exit",
      ],
    },
  ]);
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
    case "addEmployee":
      return addEmployee();
    default:
      console.log("this is the default");
  }
};

// trigger prompt
start();

// USER INTERACTIONS

module.exports = inquirer;
