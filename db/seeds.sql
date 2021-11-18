-- Use this file to prepopulate the database to make development of individual features much easier
USE emp_tracker_db;
INSERT INTO department (name)
("engineering"),
("engineering"),
("engineering"),
("sales"),
("finance"),
("sales"),
("finance");

INSERT INTO role (title, salary) 
VALUES 
("engineer", "75000"),
("techLead", "85000"),
("projectManager", "90000"),
("salesperson", "80000"),
("accountant", "65000"),
("salesperson", "85000"),
("accountant", "75000");

INSERT INTO employee (first_name, last_name)
VALUES 
("sleve", "mcdichael"),
("bobson", "dugnutt"),
("todd", "bonzalez"),
("york", "peppermint"),
("cali", "fornia"),
("sweet", "caroline"),
("dane", "joe");