const inquirer = require('inquirer');
const db = require('../lib/connection');

class Department {
    view (){
        let sql  = 'SELECT * FROM department';
        // sql = db.format(sql,['Departments']);
        db.query(sql, function (err, results) {
            console.table(results, ["name"]);
          });
        // WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids

    }
    add (){
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database

    }
}

module.exports = Department;