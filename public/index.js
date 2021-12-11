// DEPENDENCIES
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "mysqlabc123",
    database: "emp_tracker_db",
  },
  console.log(`Connected to the emp_tracker_db database.`)
);

// FUNCTIONS
const displayDepartments = async () => {
  const results = await db.promise().query(`SELECT * FROM department`);
  console.table(results[0]);
  start();
};

const displayAllRoles = () => {
  db.query(
    `SELECT role.title, role.salary, role.id, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id`,
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      start();
    }
  );
};

const displayAllEmployees = () => {
  db.query(
    `SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, manager.last_name AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`,
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);

      start();
    }
  );
};

const addDepartment = async () => {
  const { newDepartment } = await inquirer.prompt([
    {
      type: "input",
      name: "newDepartment",
      message: "What department would you like to add?",
    },
  ]);
  const departmentInsert = await db
    .promise()
    .query(`INSERT INTO department (name) VALUES ("${newDepartment}")`);
  start();
};

const addRole = async () => {
  const departments = await db
    .promise()
    .query(`SELECT id, name FROM department`);

  const newRole = await inquirer.prompt([
    {
      type: "input",
      name: "role",
      message: "What's the new role title?",
    },
    {
      type: "input",
      name: "salary",
      message: "What's the new role salary?",
    },
    {
      type: "list",
      name: "department_id",
      message: "Please select employee department",
      choices: departments[0].map((department) => ({
        name: department.name,
        value: department.id,
      })),
    },
  ]);
  const roleInsert = await db
    .promise()
    .query(
      `INSERT INTO role (title, salary, department_id) VALUES ("${newRole.role}","${newRole.salary}",${newRole.department_id})`
    );
  start();
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
      type: "input",
      name: "last_name",
      message: "What's their last name?",
    },
    {
      type: "list",
      name: "role_id",
      message: "Please select employee role",
      choices: roles[0].map((role) => ({ name: role.title, value: role.id })),
    },
    {
      type: "list",
      name: "manager_id",
      message: "Please select employee manager ID",
      choices: managers[0].map((manager) => ({
        name: manager.title,
        value: manager.id,
      })),
    },
  ]);
  const employeeInsert = await db
    .promise()
    .query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${newEmployee.first_name}","${newEmployee.last_name}",${newEmployee.role_id},${newEmployee.manager_id})`
    );
  start();
};

const start = async () => {
  const { userChoice } = await inquirer.prompt([
    {
      type: "list",
      name: "userChoice",
      message: "What would you like to do?",
      choices: [
        "viewAllDepartments",
        "displayAllRoles",
        "displayAllEmployees",
        "addDepartment",
        "addRole",
        "addEmployee",
      ],
    },
  ]);
  switch (userChoice) {
    case "viewAllDepartments":
      return displayDepartments();
    case "displayAllRoles":
      return displayAllRoles();
    case "displayAllEmployees":
      return displayAllEmployees();
    case "addDepartment":
      return addDepartment();
    case "addRole":
      return addRole();
    case "addEmployee":
      return addEmployee();
    default:
      console.log("this is the default");
  }
};

// const updateDepartments = async () => {
//   const results = await db.promise().query(`SELECT * FROM department`);
//   console.table(results[0]);
//   start();
// };

// trigger prompt
start();

module.exports = inquirer;
