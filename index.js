const inquirer = require('inquirer');
const Department = require("./lib/departments");

function mainMenu() {
const menuChoices = ['view all departments' , 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
inquirer
  .prompt([
    /* Pass your questions in here */
    {
        type: 'list',
        name: 'selection',
        message: "What do you want to do?",
        choices: menuChoices
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    if (answers.selection.indexOf('department')){
       const department = new Department();
       department.view();
    }
  })
  .catch((error) => console.log(error));
}

mainMenu();






