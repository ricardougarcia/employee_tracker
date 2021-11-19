-- Use this file to prepopulate the database to make development of individual features much easier
USE emp_tracker_db;
INSERT INTO department (name)
VALUES
("engineering"),
("sales"),
("finance");

INSERT INTO role (title, salary, department_id) 
VALUES 
("engineer", "75000", 1),
("techLead", "85000", 1),
("projectManager", "90000", 1),
("salesperson", "80000", 2),
("accountant", "65000", 3),
("salesperson", "85000", 2),
("accountant", "75000", 3);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES 
("sleve", "mcdichael", NULL, 1),
("bobson", "dugnutt", 1, 2),
("todd", "bonzalez", 1, 3),
("york", "peppermint", 2, 4),
("cali", "fornia", 3, 5),
("sweet", "caroline", 2, 6),
("dane", "joe", 1, 7);
