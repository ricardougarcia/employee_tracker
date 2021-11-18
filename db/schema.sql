DROP DATABASE IF EXISTS emp_tracker_db;
-- Creates the "emp_tracker_db" database --
CREATE DATABASE emp_tracker_db;

-- Makes it so all of the following code will affect emp_tracker_db --
USE emp_tracker_db;

-- Creates the table "department" within emp_tracker_db --
CREATE TABLE department (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INT NOT NULL PRIMARY KEY,
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
    REFERENCES role(id)
    -- FOREIGN KEY (manager_id)
    -- --REFERENCES employee(id)
    );
    
USE emp_tracker_db;
INSERT INTO department (id, name)
VALUES
("1","engineering"),
("2","sales"),
("3","finance");

INSERT INTO role (title, salary) 
VALUES 
("engineer", "75000"),
("techLead", "85000"),
("projectManager", "90000"),
("salesperson", "80000"),
("accountant", "65000"),
("salesperson", "85000"),
("accountant", "75000");

INSERT INTO employee (first_name, last_name, manager_id)
VALUES 
("sleve", "mcdichael", "2"),
("bobson", "dugnutt", "2"),
("todd", "bonzalez", "2"),
("york", "peppermint", "3"),
("cali", "fornia", "1"),
("sweet", "caroline", "3"),
("dane", "joe", "1");


