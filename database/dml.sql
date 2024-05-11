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
('Ahmed', 'Khaled', '5552223333', 'ahmed.khaled@gmail.com', '2023-05-15', 5);

-- login_form
INSERT INTO login_form (username, emp_password, EmpID) VALUES
('farida_ghonim', 'password123', 1),
('tasbeeh_ismail', 'securepwd', 2),
('omnia_gamal', 'mikepass', 3),
('reem_ghreeb', 'emilypass', 4),
('ahmed_khaled', 'davidpass', 5);

-- chemist
INSERT INTO chemist (Qualification) VALUES
('PhD in Chemistry'),
('Master of Science in Analytical Chemistry'),
('Bachelor of Science in Organic Chemistry'),
('Chemical Engineering Diploma'),
('Bachelor of Science in Biochemistry');


-- engineer
INSERT INTO engineer (specialization) VALUES
('Electrical Engineering'),
('Mechanical Engineering'),
('Civil Engineering'),
('Software Engineering'),
('Aerospace Engineering');

-- it
INSERT INTO it (skills) VALUES
('Network Administration'),
('Database Management'),
('Web Development'),
('Cybersecurity'),
('System Administration');

-- lab_technican
INSERT INTO lab_technican (Equipment_Knowledge) VALUES
('Mass Spectrometry'),
('Gas Chromatography'),
('Nuclear Magnetic Resonance'),
('Spectrophotometry'),
('Electron Microscopy');

-- operating_technican
INSERT INTO operating_technican (Certification) VALUES
('OSHA Certified'),
('Forklift Operator Certification'),
('Hazardous Materials Handling Certification'),
('First Aid and CPR Certified'),
('EPA Certification');
