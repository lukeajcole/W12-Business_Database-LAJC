const inquirer = require('inquirer');
const Department = require("./lib/departments");
const Employees = require('./lib/employees');
const menuChoices = ['view all departments' , 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'All Done!']

class Business {
  constructor (menuItems, roles, departments, managers) {
    this.menuItems = menuItems;
    this.roles = ["Production Supervisor","Quality Analyst","Systems Analyst","IS Director"]
    this.departments = ['Production', 'Quality', 'Information Systems']
    this.employees = ['Nick Brown', 'Carolyn Kennedy', 'Luke Cole','Jason Guhse', 'NONE']
  }


  mainMenu () {
      inquirer
      .prompt([
          /* Pass your questions in here */
          {
              type: 'list',
              name: 'selection',
              message: "What do you want to do?",
              choices: this.menuItems
          }
        ])
        .then((answer) => {
          this.router(answer);
        })
        .catch((error) => console.log(error));
  }

  router (answer) {
    let {selection} = answer;
      if (selection === 'All Done!') {
        process.exit();
      } 
      if (selection.includes('department')){
        this.department(selection);
      } else 
      if(selection.includes('employee')){
        this.employee(selection);
      } else
      if(selection.includes('role')){

      }
    }

  department(selection){
    const department = new Department();
    if (selection.includes('view')){
      department.view(this);
    }
    else if (selection.includes('add')){
      inquirer   
      .prompt([
          {
              type: 'input',
              name: 'name',
              message: "What is the Department name?"
          }
      ])
      .then((answers) => {
              this.departments.push(answers.name);
              department.add(answers.name);
              this.mainMenu();    
      }); 
    }
  }

  employee(selection){
    const employee = new Employees();
        if (selection.includes('view')){
          employee.view(this);
        } else if(selection.includes('add')){
          inquirer   
          .prompt([
              {
                  type: 'input',
                  name: 'first_name',
                  message: "What is their First Name?"
              },
              {
                  type: 'input',
                  name: 'last_name',
                  message: "What is their Last Name?"
              }
              ,
              {
                  type: 'list',
                  name: 'role',
                  message: "What is their role?",
                  choices: this.roles
              },
              {
                  type: 'list',
                  name: 'manager',
                  message: "Who is their manager?",
                  choices: this.employees
              }
          ])
          .then((answers) => {
            this.employees.push(`${answers.first_name} ${answers.last_name}`);
            employee.add(answers);
            this.mainMenu();
          });
        } else if(selection.includes('update')){
          employee.update()
        };
  }

}


const business = new Business(menuChoices)
business.mainMenu();






