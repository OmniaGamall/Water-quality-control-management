CREATE DATABASE water;
use water;

``` User Authentication ```

CREATE TABLE roles (
    RoleID INT AUTO_INCREMENT PRIMARY KEY,
    RoleName VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE permissions (
    PermissionID INT AUTO_INCREMENT PRIMARY KEY,
    PermissionName VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE role_permissions (
    RoleID INT,
    PermissionID INT,
    PRIMARY KEY (RoleID, PermissionID),
    FOREIGN KEY (RoleID) REFERENCES Roles(RoleID),
    FOREIGN KEY (PermissionID) REFERENCES permissions(PermissionID)
);

``` User Account ```

CREATE TABLE employee (
    EmpID INT AUTO_INCREMENT,
    Fname VARCHAR(50) NOT NULL,
    Lname VARCHAR(50) NOT NULL,
    phoneNum VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) CHECK (email LIKE '%@gmail.com'),
    HireDate DATE,
    RoleID INT,
    PRIMARY KEY (EmpID),
    FOREIGN KEY (RoleID) REFERENCES roles(RoleID)
);

CREATE TABLE login_form (
    username VARCHAR(255),
    emp_password VARCHAR(255) NOT NULL,
    EmpID INT,
    CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (username),
    FOREIGN KEY (EmpID) REFERENCES employee(EmpID)
);

CREATE TABLE chemist (
  ChID int(11),
  Qualification varchar(50),
  PRIMARY KEY (ChID),
  FOREIGN KEY (ChID) REFERENCES employee (EmpID)
);

CREATE TABLE engineer (
  EngID int(11),
  specialization varchar(50),
  PRIMARY KEY (EngID),
  FOREIGN KEY (EngID) REFERENCES employee (EmpID)
);

CREATE TABLE it (
  ITID int(11),
  skills varchar(50),
  PRIMARY KEY (ITID),
  FOREIGN KEY (ITID) REFERENCES employee (EmpID)
);

CREATE TABLE lab_technican (
  LTechID int(11),
  Equipment_Knowledge varchar(50) DEFAULT NULL,
  PRIMARY KEY (LTechID),
  FOREIGN KEY (LTechID) REFERENCES employee (EmpID)
);

CREATE TABLE operating_technican (
  OTechID int(11),
  Certification varchar(50),
  PRIMARY KEY (OTechID),
  FOREIGN KEY (OTechID) REFERENCES employee (EmpID)
);


``` Operational System Tables ```

CREATE TABLE experiment (
  ExpID int(11) AUTO_INCREMENT,
  ExpName varchar(255) NOT NULL,
  PRIMARY KEY (ExpID)
);

CREATE TABLE report (
  RepID int(11) AUTO_INCREMENT,
  Title varchar(255) NOT NULL,
  Author varchar(255) NOT NULL,
  Flow float NOT NULL,
  Temp float NOT NULL,
  TotalDuration int(11) NOT NULL,
  Date_ date NOT NULL,
  Day_ varchar(10) NOT NULL,
  PRIMARY KEY (RepID)
);

CREATE TABLE equipment (
  EquID int(11) AUTO_INCREMENT,
  Name_ varchar(50) NOT NULL,
  Manufacture varchar(50) NOT NULL,
  Type_ varchar(50) NOT NULL,
  PRIMARY KEY (EquID)
);

CREATE TABLE test (
  TestID int(11) AUTO_INCREMENT,
  TestName varchar(250) NOT NULL,
  Cost INT NOT NULL,
  Description_ text NOT NULL,
  ApplicableParameters text NOT NULL,
  PRIMARY KEY (TestID)
);

CREATE TABLE task (
  TaskID INT PRIMARY KEY AUTO_INCREMENT,
  Description_ TEXT NOT NULL,
  Status_ VARCHAR(50) NOT NULL,
  AssignedTo INT NOT NULL,
  FOREIGN KEY (AssignedTo) REFERENCES employee(EmpID)
);

CREATE TABLE notification (
  NotifiID INT AUTO_INCREMENT PRIMARY KEY,
  Sender INT NOT NULL,
  Receiver INT NOT NULL,
  MessageContent TEXT NOT NULL,
  FOREIGN KEY (Sender) REFERENCES employee(EmpID),
  FOREIGN KEY (Receiver) REFERENCES employee(EmpID)
);


``` Relation Tables ```

CREATE TABLE chemist_make_exp (
  ChID int(11),
  ExpID int(11),
  PRIMARY KEY (ChID,ExpID),
  FOREIGN KEY (ChID) REFERENCES chemist (ChID),
  FOREIGN KEY (ExpID) REFERENCES experiment (ExpID)
);

CREATE TABLE it_control_exp (
  ITID int(11),
  ExpID int(11),
  PRIMARY KEY (ITID,ExpID),
  FOREIGN KEY (ITID) REFERENCES it (ITID),
  FOREIGN KEY (ExpID) REFERENCES experiment (ExpID)
);

CREATE TABLE experiment_savesas_report (
  RepID int(11),
  ExpID int(11),
  PRIMARY KEY (RepID,ExpID),
  FOREIGN KEY (RepID) REFERENCES report (RepID),
  FOREIGN KEY (ExpID) REFERENCES experiment (ExpID)
);

CREATE TABLE experiment_have_equipment (
  ExpID int(11),
  EquID int(11),
  PRIMARY KEY (ExpID,EquID),
  FOREIGN KEY (ExpID) REFERENCES experiment (ExpID),
  FOREIGN KEY (EquID) REFERENCES equipment (EquID)
);

CREATE TABLE experiment_from_test (
  ExpID int(11),
  TestID int(11),
  Result text NOT NULL,
  Dateـ date NOT NULL,
  PRIMARY KEY (ExpID,TestID),
  FOREIGN KEY (ExpID) REFERENCES experiment (ExpID),
  FOREIGN KEY (TestID) REFERENCES test (TestID)
);

CREATE TABLE create_task (
  ChID INT,
  TaskID INT,
  PRIMARY KEY (ChID, TaskID),
  FOREIGN KEY (ChID) REFERENCES chemist(ChID),
  FOREIGN KEY (TaskID) REFERENCES task(TaskID)
);

CREATE TABLE modify_task (
  EngID INT,
  TaskID INT,
  DueDate DATE NOT NULL,
  PRIMARY KEY (EngID, TaskID),
  FOREIGN KEY (EngID) REFERENCES engineer(EngID),
  FOREIGN KEY (TaskID) REFERENCES task(TaskID)
);

CREATE TABLE send_notification (
  EngID INT NOT NULL,
  NotifiID INT NOT NULL,
  PRIMARY KEY (EngID, NotifiID),
  FOREIGN KEY (EngID) REFERENCES Engineer(EngID),
  FOREIGN KEY (NotifiID) REFERENCES Notification(NotifiID)
);

-- show_notification -> done
CREATE TABLE show_notification (
  EmpID INT NOT NULL,
  NotifiID INT NOT NULL,
  PRIMARY KEY (EmpID, NotifiID),
  FOREIGN KEY (EmpID) REFERENCES employee(EmpID),
  FOREIGN KEY (NotifiID) REFERENCES Notification(NotifiID)
);
-- view_report -> done
CREATE TABLE view_report (
  EmpID INT NOT NULL,
  RepID INT NOT NULL,
  PRIMARY KEY (EmpID, RepID),
  FOREIGN KEY (EmpID) REFERENCES employee(EmpID),
  FOREIGN KEY (RepID) REFERENCES report(RepID)
);