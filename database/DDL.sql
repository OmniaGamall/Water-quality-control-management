CREATE DATABASE Water;
use Water;
CREATE TABLE employees (
    EmpID INT NOT NULL  AUTO_INCREMENT,
    Fname VARCHAR(50) NOT NULL,
    Lname VARCHAR(50) NOT NULL,
    pos VARCHAR(50) NOT NULL,
    phoneNum VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) CHECK (email LIKE '%@gmail.com'),
    HireDate DATE,
    PRIMARY KEY (EmpID)
);
CREATE TABLE loginForm (
    username VARCHAR(255) NOT NULL,
    emp_role VARCHAR(50) NOT NULL,
    emp_password VARCHAR(255) NOT NULL,
    EmpID INT,
    CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (username),
    FOREIGN KEY (EmpID) REFERENCES employee(EmpID)
);