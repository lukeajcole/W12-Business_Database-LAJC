const db = require('../lib/connection');

class Employees {
    view (business){
        // WHEN I choose to view all employees
        // THEN I am presented with a formatted table showing employee data, \
        //including employee ids, first names, last names, job titles, 
        //departments, salaries, and managers that the employees report to

        let sql  = `SELECT 
                        emp.id as 'Employee ID',
                        emp.first_name as 'First Name',
                        emp.last_name as 'Last Name',
                        rol.title as 'Job Title',
                        rol.salary as 'Salary',
                        dep.name as 'Department',
                        CONCAT(mEmp.first_name, ' ', mEmp.last_name) as 'Manager' 
                    FROM employee emp
                    LEFT JOIN roles rol
                    on rol.id = emp.role_id
                    LEFT JOIN department dep
                    on dep.id = rol.department_id
                    LEFT JOIN employee mEmp
                    on emp.manager_id = mEmp.id
                    `;
                
        // sql = db.format(sql,['Departments']);
        db.query(sql, (err, results) => {
            console.table(results);
            business.mainMenu();
          });
                
    }
    add(newEmployee){
                const {first_name, last_name, manager, role} = newEmployee
                const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                            SELECT 
                            '${first_name}',
                            '${last_name}',
                            (SELECT id FROM roles WHERE title = '${role}'),
                            (SELECT id FROM employee 
                                WHERE first_name = SUBSTRING_INDEX('${manager}'," ",1)
                                AND last_name = SUBSTRING_INDEX('${manager}', " ", -1) 
                            );`;
                db.query(sql, (err, results) => {
                    if (err) console.log(err);            
                    console.log(`Added Employee: ${first_name} ${last_name}`);
                });
            };
        
    update(newRole){
        const {role, employee_name} = newRole
        const sql = `UPDATE employee
                    SET role_id = ${role}
                    WHERE first_name = SUBSTRING_INDEX('${employee_name}'," ",1)
                    AND last_name = SUBSTRING_INDEX('${employee_name}', " ", -1);`
        
        db.query(sql, (err,results) => {
            if (err) console.log(err);            

        });

           }

}

module.exports = Employees;