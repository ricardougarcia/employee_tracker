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
};

const exit = () => {
  process.kill();
};
// USER INTERACTIONS
inquirer
  .prompt([
    /* Pass your questions in here */
    {
      type: "list",
      name: "userChoice",
      message: "What would you like to do?",
      choices: ["viewAllDepartments", "exit"],
      // filter: function (answer) {
      //   return answer.options;
      // },
    },
  ])
  .then(({ userChoice }) => {
    // console.log(answer);

    // Use switch case for each option selected
    switch (userChoice) {
      case "viewAllDepartments":
        // code block
        return displayDepartments();
      case "exit":
        return exit();
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

module.exports = inquirer;
