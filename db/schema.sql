DROP DATABASE IF EXISTS emp_tracker_db;
-- Creates the "emp_tracker_db" database --
CREATE DATABASE emp_tracker_db;

-- Makes it so all of the following code will affect emp_tracker_db --
USE emp_tracker_db;

-- Creates the table "department" within emp_tracker_db --
CREATE TABLE department (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- Makes a string column called "name" which cannot contain null --
  name VARCHAR(30)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id) 
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,  
    FOREIGN KEY (role_id)
    REFERENCES role(id),
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    );
    
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

-- this appears to work in creating a table with no data
SELECT role.title AS title, role.salary AS salary, role.id AS id, department.name AS department FROM role JOIN department ON role.department_id = department.id;


-- didnt work
`SELECT id, title, salary, * FROM role LEFT JOIN department ON role.department_id = department.id;`