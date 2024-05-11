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