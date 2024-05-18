CREATE DATABASE water_analysis_system;
use water_analysis_system;

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

CREATE TABLE lab_technician (
  LTechID int(11),
  Equipment_Knowledge varchar(50) DEFAULT NULL,
  PRIMARY KEY (LTechID),
  FOREIGN KEY (LTechID) REFERENCES employee (EmpID)
);

CREATE TABLE operating_technician (
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
  Title varchar(255) NOT NULL, -- delete
  Author varchar(255) NOT NULL, -- change to Ch_ID (fk)
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
  current_day DATE DEFAULT (CURRENT_DATE);
);

CREATE TABLE notification (
  NotifiID INT AUTO_INCREMENT PRIMARY KEY,
  Sender INT NOT NULL,
  Receiver INT NOT NULL,
  MessageContent TEXT NOT NULL,
  FOREIGN KEY (Sender) REFERENCES employee(EmpID),
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
  EmpID INT,
  TaskID INT,
  PRIMARY KEY (EmpID, TaskID),
  FOREIGN KEY (EmpID) REFERENCES employee(EmpID),
  FOREIGN KEY (TaskID) REFERENCES task(TaskID)
);

CREATE TABLE add_Note (
    RepID INT,
    NotifiID INT,
    PRIMARY KEY (RepID, NotifiID),
    FOREIGN KEY (RepID) REFERENCES report(RepID),
    FOREIGN KEY (NotifiID) REFERENCES notification(NotifiID)
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


``` Edit constraints of tables```

--- chemist
ALTER TABLE chemist DROP FOREIGN KEY chemist_ibfk_1;

ALTER TABLE chemist
ADD CONSTRAINT chemist_ibfk_1
FOREIGN KEY (ChID) REFERENCES employee (EmpID)
ON DELETE CASCADE;

--- engineer
ALTER TABLE engineer DROP FOREIGN KEY engineer_ibfk_1;

ALTER TABLE engineer
ADD CONSTRAINT engineer_ibfk_1
FOREIGN KEY (EngID) REFERENCES employee (EmpID)
ON DELETE CASCADE;

--- it
ALTER TABLE it DROP FOREIGN KEY it_ibfk_1;

ALTER TABLE it
ADD CONSTRAINT it_ibfk_1
FOREIGN KEY (ITID) REFERENCES employee (EmpID)
ON DELETE CASCADE;

-- lab_technician
ALTER TABLE lab_technician DROP FOREIGN KEY lab_technician_ibfk_1;

ALTER TABLE lab_technician
ADD CONSTRAINT lab_technician_ibfk_1
FOREIGN KEY (LTechID) REFERENCES employee (EmpID)
ON DELETE CASCADE;

-- operating_technician
ALTER TABLE operating_technician DROP FOREIGN KEY operating_technician_ibfk_1;

ALTER TABLE operating_technician
ADD CONSTRAINT operating_technician_ibfk_1
FOREIGN KEY (OTechID) REFERENCES employee (EmpID)
ON DELETE CASCADE;


``` Edit experiment table based on correct requirements ```
ALTER TABLE experiment DROP COLUMN name;
ALTER TABLE experiment ADD Inf INT;
ALTER TABLE experiment ADD Eff INT;
ALTER TABLE experiment ADD Blank INT;
ALTER TABLE experiment ADD TestID INT;
ALTER TABLE experiment ADD FOREIGN KEY (TestID) REFERENCES test (TestID);

``` Delete and Drop some tables make conflicts ```
DROP Table experiment_from_test;
DROP TABLE experiment_have_equipment;
DELETE FROM chemist_make_exp;
DELETE FROM experiment_savesas_report;
DELETE FROM it_control_exp;
DELETE FROM experiment;

``` Edit test table based on correct requirements ```
DELETE FROM test;
ALTER TABLE test DROP COLUMN Description_;
ALTER TABLE test DROP COLUMN ApplicableParameters;
ALTER TABLE test DROP COLUMN Cost;
ALTER TABLE test ADD Instructions TEXT;
ALTER TABLE test ADD Duration INT;
ALTER TABLE test ADD Temp INT;

``` Delete not necessary data from equipment table ```
DELETE FROM equipment WHERE EquID IN (1,2,3,4);

-- New table -> test_have_equipment
CREATE TABLE test_have_equipment (
  TestID INT NOT NULL,
  EquID INT NOT NULL,
  PRIMARY KEY (TestID, EquID),
  FOREIGN KEY (TestID) REFERENCES test (TestID),
  FOREIGN KEY (EquID) REFERENCES equipment(EquID)
);
``` Updates based on reports requirements ```
-- report table
ALTER TABLE report DROP COLUMN  Author;
ALTER TABLE report DROP COLUMN  Title;
ALTER TABLE report ADD ChID INT;
ALTER TABLE report ADD FOREIGN KEY (ChID) REFERENCES chemist (ChID);
ALTER TABLE report ADD Efficiency INT;
ALTER TABLE report ADD RCI2 INT;
DELETE FROM view_report;
DELETE FROM report;

--- experiment and report relation
DROP TABLE experiment_savesas_report;
CREATE TABLE experiment_savesas_report (
  ExpID INT NOT NULL,
  RepID INT NOT NULL,
  PRIMARY KEY (ExpID, RepID),
  FOREIGN KEY (ExpID) REFERENCES experiment (ExpID),
  FOREIGN KEY (RepID) REFERENCES report (RepID)
);


--- edit task table
DROP TABLE modify_task;

ALTER TABLE task DROP FOREIGN KEY task_ibfk_1;
ALTER TABLE task DROP COLUMN AssignedTo;

ALTER TABLE task 
ADD COLUMN current_day DATE DEFAULT (CURRENT_DATE);

ALTER TABLE task
MODIFY COLUMN Status_ VARCHAR(50) NOT NULL DEFAULT 'not completed';

--- Edit create_task table
DROP TABLE create_task;

CREATE TABLE create_task (
  EmpID INT,
  TaskID INT,
  PRIMARY KEY (EmpID, TaskID),
  FOREIGN KEY (EmpID) REFERENCES employee(EmpID),
  FOREIGN KEY (TaskID) REFERENCES task(TaskID)
);

ALTER TABLE create_task
DROP FOREIGN KEY create_task_ibfk_2;

ALTER TABLE create_task
ADD CONSTRAINT create_task_ibfk_2
FOREIGN KEY (TaskID)
REFERENCES task(TaskID)
ON DELETE CASCADE;


--- Edit notification table
ALTER TABLE notification DROP FOREIGN KEY notification_ibfk_2;
ALTER TABLE notification DROP COLUMN Receiver;

--- Edit the send_notification table and create a new table (add_Note)
DROP TABLE send_notification;

CREATE TABLE add_Note (
    RepID INT,
    NotifiID INT,
    PRIMARY KEY (RepID, NotifiID),
    FOREIGN KEY (RepID) REFERENCES report(RepID),
    FOREIGN KEY (NotifiID) REFERENCES notification(NotifiID)
);

--- edit on task table
ALTER TABLE task
ADD COLUMN name VARCHAR(50) NOT NULL;
