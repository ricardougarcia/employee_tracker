const inquirer = require("inquirer");

inquirer
  .prompt([
    /* Pass your questions in here */
    {
      type: "list",
      name: "options",
      message: "What would you like to do?",
      choices: [
        "viewAllDepartments",
        "choice2",
        "choice3",
        "choice4",
        "choice5",
        "choice6",
        "choice7",
      ],
      // filter: function (answer) {
      //   return answer.options;
      // },
    },
  ])
  .then((answer) => {
    // console.log(answer);

    // Use switch case for each option selected
    switch (answer.options) {
      case "viewAllDepartments":
        // code block
        console.log("great choice!");
        break;
      case 2:
        // code block
        break;
      case 3:
        // code block
        break;
      case 4:
        // code block
        break;
      case 5:
        // code block
        break;
      case 6:
        // code block
        break;
      case 7:
        // code block
        break;
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
