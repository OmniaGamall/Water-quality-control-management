-- roles
INSERT INTO roles (RoleName) VALUES 
('Administrator'),
('Operating Technican'),
('Lab Technican'),
('Chemist'),
('Engineer'),
('IT Specialist');

-- permissions
INSERT INTO permissions (PermissionName) VALUES 
('Create User'),
('Edit User'),
('Delete User'),
('Make Experiment'),
('Control Experiment'),
('Create Task'),
('Modify Task'),
('Send Notification');

-- role_permissions
INSERT INTO role_permissions (RoleID, PermissionID) VALUES 
(1, 1),
(1, 2),
(1, 3),
(4, 4),
(5, 5),
(4, 6),
(6 ,7),
(5, 8);

-- employee
INSERT INTO employee (Fname, Lname, phoneNum, email, HireDate, RoleID) VALUES
('Farida', 'Ghonim', '1234567890', 'farida.ghonim@gmail.com', '2023-01-15', 4),
('Tasbeeh', 'Ismail', '9876543210', 'tasbeeh.ismail@gmail.com', '2023-02-20', 1),
('Omnia', 'Gamal', '5559876543', 'omnia.gamal@gmail.com', '2023-04-05', 1),
('Reem', 'Ghareeb', '5551234567', 'reem.ghreeb@gmail.com', '2023-03-10', 1),
('Ahmed', 'Khaled', '5552223333', 'ahmed.khaled@gmail.com', '2023-05-15', 5),
('Anas', 'Ragab', '1065098432', 'anas.ragab@gmail.com', '2023-05-15', 6),
('Sara', 'Ahmed', '7338373002', 'sara.ahmed@gmail.com', '2024-05-15', 3),
('Wafaa', 'Ahmed', '9883957400', 'wafaa.ahmed@gmail.com', '2021-03-15', 2),
('Habiba', 'Youssef', '7988800271', 'habiba.youssef@gmail.com', '2023-05-17', 4),
('Ismail', 'Hamza', '7298374474', 'ismail.hamza@gmail.com', '2023-05-16', 5),
('Sondos', 'Atef', '8293373372', 'sondos.atef@gmail.com', '2024-08-22', 3);

-- login_form
INSERT INTO login_form (username, emp_password, EmpID) VALUES
('farida_ghonim', 'password123', 1),
('tasbeeh_ismail', 'securepwd', 2),
('omnia_gamal', 'mikepass', 3),
('reem_ghreeb', 'emilypass', 4),
('ahmed_khaled', 'davidpass', 5),
('anas_ragab', 'password123', 6),
('sara_ahmed', 'securepwd', 7),
('wafaa_ahmed', 'mikepass', 8),
('habiba_youssef', 'emilypass', 9),
('ismail_hamza', 'davidpass', 10);

-- chemist
INSERT INTO chemist (ChID, Qualification) VALUES
(1, 'Bachelor of Science in Organic Chemistry'),
(9, 'Bachelor of Science in Biochemistry');


-- engineer
INSERT INTO engineer (EngID, specialization) VALUES
(5, 'Electrical Engineering'),
(10, 'Mechanical Engineering');

-- it
INSERT INTO it (ITID, skills) VALUES
(6, 'Network Administration');

-- lab_technican
INSERT INTO lab_technican (LTechID, Equipment_Knowledge) VALUES
(7, 'Electron Microscopy'),
(11, 'Gas Chromatography');

-- operating_technican
INSERT INTO operating_technican (OTechID, Certification) VALUES
(8, 'OSHA Certified');

/* -------------------- Reem Queries --------------------*/

-- experiment -> done !!!!! explain previous please 
-- I change the value to be ExpName not ExpID, and add this key in table bcz i don't found it
INSERT INTO experiment (ExpName) 
VALUES 
("New experiment"),
("New experiment"),
("New experiment"),
("New experiment"),
("New experiment");


-- report -> done
INSERT INTO report (Title, Author, Flow, Temp, TotalDuration,Date_, Day_) 
VALUES
("Water Quality Analysis Report", "Reem Ghareeb", "12.5", "18", "48", "2024-05-10", "Monday"),
("Water Quality Analysis Report2", "Omnia Gamal", "8.2", "22", "72", "2024-04-22", "Thursday"),
("Lake Water Analysis", "Tasbeeh", "15.3", "14", "36", "2024-03-15", "Wednesday"),
("Lake Water Analysis 2", "Tasbeeh", "15.3", "14.5", "40", "2024-03-16", "Thursday"),
("Water Oxygen", "Alaa Zaitoon", "17.5", "18", "14", "2024-07-22", "Monday");

--equipment -> done
INSERT INTO equipment (Name_,Manufacture,Type_) 
VALUES 
("Spectrophotometer", "XYZ Corporation", "Laboratory"),
("pH Meter", " ABC Instruments", "Laboratory"),
("Turbidity Meter", "DEF Technologies", "Field"),
("Pipette", "GHI Supplies", "Laboratory");

-- test -> done with editing (ALTER TABLE time -> cost)

INSERT INTO test(Cost, TestName, Description_, ApplicableParameters) 
VALUES 
(1500, "COD", "Chemical oxygen demand (COD) is the amount of dissolved oxygen that must be present in water to oxidise chemical organic materials, like petroleum. COD is used to gauge the short-term impact wastewater effluents will have on the oxygen levels of receiving waters."," Dichromate / sulphoric Acid and silver"),
(1600, "TSS", "Total Suspended Solids (TSS) is one of the method defined analytes. There is no specific chemical formula for a total suspended solid. Quite simply put, TSS is anything that is captured by filtering the sample aliquot through a specific pore size filter. Suspended solids can range from particles of silt or sediment to pieces of plant material such as leaves or stems. Even insect larvae and eggs can fall in the general category of TSS. High amounts of TSS can lead to an esthetically displeasing appearance of a body of water. Either the color or overall turbidity of the water will be negatively impacted."," Dichromate / sulphoric Acid and silver"),
(2200, "PH", "pH water analysis is crucial for assessing acidity or alkalinity in water, influencing environmental health, water treatment efficacy, agricultural productivity, and industrial processes."," Dichromate / sulphoric Acid and silver");

-- task -> done with editing (make 1, 2 -> 5, 10)
INSERT INTO task (Description_, Status_, AssignedTo)
VALUES
('Perform pH analysis of water samples', 'Completed', 1),
('Calibrate water quality monitoring equipment', 'Pending',  2),
('Conduct microbial testing on drinking water', 'In Progress', 1),
('Design a new filtration system', 'Cancelled', 2);

-- notification -> done
INSERT INTO notification (Sender, Receiver, MessageContent) 
VALUES 
(1, 4, 'Meeting reminder: Water quality analysis discussion tomorrow at 10 AM.'),
(2, 5, 'Urgent: Equipment maintenance scheduled for next week. Please review.'),
(10, 6, 'Report submission deadline extended to Friday. Kindly ensure completion.'),
(11, 9, 'New task assigned: Conduct field testing for water samples in Sector 5.');

-- chemist_make_exp -> done
INSERT INTO chemist_make_exp  (ChID, ExpID)
VALUES
(1, 1),
(1, 2),
(9, 3),
(9, 4),
(1, 5);

-- it_control_exp -> done
INSERT INTO it_control_exp 
VALUES
(6, 1),
(6, 2),
(6, 3),
(6, 4),
(6, 5);

-- experiment_savesas_report -> done
INSERT INTO experiment_savesas_report
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- experiment_have_equipment -> done
INSERT INTO experiment_have_equipment
VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 2),
(2, 3),
(2, 4),
(3, 4),
(4, 4),
(5, 1),
(5, 4);

-- experiment_from_test -> done with editing
INSERT INTO experiment_from_test (ExpID, TestID, Result, Dateـ) 
VALUES
(1, 1, 'Positive', '2024-05-10'),
(1, 2, 'Negative', '2024-05-11'),
(1, 3, 'Positive', '2024-05-12'),
(2, 1, 'Negative', '2024-05-13'),
(2, 2, 'Positive', '2024-05-14'),
(2, 3, 'Negative', '2024-05-15'),
(3, 1, 'Positive', '2024-05-16'),
(3, 2, 'Negative', '2024-05-17'),
(3, 3, 'Positive', '2024-05-18'),
(4, 1, 'Negative', '2024-05-19'),
(4, 2, 'Positive', '2024-05-20'),
(4, 3, 'Negative', '2024-05-21'),
(5, 1, 'Positive', '2024-05-22'),
(5, 2, 'Negative', '2024-05-23'),
(5, 3, 'Positive', '2024-05-24');

-- create_task -> done
INSERT INTO create_task (ChID, TaskID) VALUES
(1, 1),
(1, 2),
(9, 3),
(9, 4);

-- modify_task -> done
INSERT INTO modify_task 
VALUES
(5, 1, '2024-05-10'),
(5, 2, '2024-06-13'),
(10, 3, '2024-04-15'),
(10, 4, '2024-03-20');

-- send_notification -> done
INSERT INTO send_notification
VALUES
(5, 1),
(5, 2),
(10, 3),
(10, 4);

-- view_report -> done
INSERT INTO view_report
VALUES
(1, 1),
(2, 2),
(3, 4),
(3, 5),
(3, 3),
(7, 1);

-- show_notification -> done!!
INSERT INTO show_notification
VALUES
(1, 1),
(8, 2),
(1, 3),
(9, 4);

