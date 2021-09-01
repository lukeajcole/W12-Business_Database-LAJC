const db = require('../lib/connection');

class Roles {
    view (business){
        let sql  = `SELECT roles.title, roles.salary,department.name FROM roles JOIN department ON department.id = roles.department_id`;
        db.query(sql, (err, results) => {
            console.table(results);
            business.mainMenu();
          });        
    }
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
    add (newRole){
        const {title, salary, department} = newRole;
        let sql = `INSERT INTO roles (title, salary, department_id) 
        SELECT 
        '${title}',
        '${salary}',
        (SELECT id FROM department WHERE name = '${department}');`;
    db.query(sql, (err, results) => {
        if (err) console.log(err);            
        console.log(`Added Role: ${title}`);
    });

        // WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
    
    }
}

module.exports = Roles;