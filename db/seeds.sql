INSERT INTO department (name)
VALUES ("Prodution"),
        ("Quality"),
        ("Information Systems");


INSERT INTO roles (title, salary, department_id)
VALUES ("Production Supervisor", 70000, 1),
        ("Quality Analyst", 60000, 2),
        ("Systems Analyst", 80000, 3),
        ("IS Director", 120000,3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
   VALUES ("Nick", "Brown", 1, null),
    ("Carolyn", "Kennedy", 2, null),
    ("Jason", "Guhse", 4,null),
    ("Luke", "Cole", 3,3);
