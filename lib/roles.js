const inquirer = require('inquirer');
const db = require('db');

class Roles {
    view (){
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

    }
    add (newRole){
        // WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

    }
}

module.exports = Roles;