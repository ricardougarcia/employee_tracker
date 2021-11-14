const inquirer = require("inquirer");

inquirer.prompt([
  {
    type: "input",
    message: "what's your name",
    name: "name",
  },
]);

module.exports = prompt;
