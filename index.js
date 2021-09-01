const inquirer = require('inquirer');
const db = require('./lib/connection');
const Department = require("./lib/departments");
const Employees = require('./lib/employees');
const Roles = require('./lib/roles');
const menuChoices = ['view all departments' , 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'All Done!']

class Business {
  constructor (menuItems, roles, departments, managers) {
    this.menuItems = menuItems;
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
        this.role(selection);
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
          const sql = `SELECT DISTINCT title FROM roles;
                       SELECT DISTINCT CONCAT(first_name, " ", last_name) as Employee FROM employee;`
          db.query(sql , async (err, results) => {
              const rolesArr = await results[0].map((title) => title.title);
              const employeesArr = await results[1].map((Employee) => Employee.Employee);
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
                  },
                  {
                      type: 'list',
                      name: 'role',
                      message: "What is their role?",
                      choices: rolesArr
                  },
                  {
                      type: 'list',
                      name: 'manager',
                      message: "Who is their manager?",
                      choices: employeesArr
                  }
                    ])
                  .then((answers) => {
                    employee.add(answers);
                    this.mainMenu();
                    });
                });
            } else if(selection.includes('update')){
              const sql = `SELECT DISTINCT title FROM roles;
              SELECT DISTINCT CONCAT(first_name, " ", last_name) as Employee FROM employee;`
                db.query(sql , async (err, results) => {
                    const rolesArr = await results[0].map((title) => title.title);
                    const employeesArr = await results[1].map((Employee) => Employee.Employee);
                    inquirer   
                    .prompt([
                        {
                            type: 'list',
                            name: 'employee_name',
                            message: "Which Employee will you update?",
                            choices: employeesArr
                        },
                        {  
                            type: 'list',
                            name: 'role',
                            message: "Select a role...",
                            choices: rolesArr
                        }
                          ])
                        .then((answers) => {
                          db.query(`SELECT id FROM roles WHERE title = '${answers.role}'`, (err,results)=>{
                            answers.role = results[0].id
                            console.log(answers.role);
                            employee.update(answers);
                            this.mainMenu();
                          });
                          });
                      });
            };
  }

  role(selection){
    const role = new Roles ();
        if (selection.includes('view')){
          role.view(this);
        } else if(selection.includes('add')){
          
          db.query("SELECT name FROM department", (err, results) => {
                console.log(results);

                inquirer   
                .prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: "What is the Role title?"
                    },
                    {
                      type: 'input',
                      name: 'salary',
                      message: "What is the salary?"
                    },
                    {
                      type: 'list',
                      name: 'department',
                      message: "What department is the role in?",
                      choices: results
                    }
                  ])

                .then((answers) => {
                  role.add(answers);
                  this.mainMenu();
                });
          });
        }
      }
}


const business = new Business(menuChoices)
business.mainMenu();






