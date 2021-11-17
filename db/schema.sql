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
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,  
    FOREIGN KEY (role_id)
    REFERENCES role(id),
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    );

    -- FOREIGN KEY role_id,
    -- SELECT a.first_name,a.last_name,a.role_id,b.first_name,b.last_name,b.role_id,a.manager_id
    -- FROM employee a, employee b
    -- WHERE a.manager_id=b.id;


