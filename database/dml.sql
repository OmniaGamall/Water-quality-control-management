-- roles
INSERT INTO roles (RoleName) VALUES 
('Administrator'),
('Operating Technician'),
('Lab Technician'),
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

-- lab_technician
INSERT INTO lab_technician (LTechID, Equipment_Knowledge) VALUES
(7, 'Electron Microscopy'),
(11, 'Gas Chromatography');

-- operating_technician
INSERT INTO operating_technician (OTechID, Certification) VALUES
(8, 'OSHA Certified');

-- experiment
INSERT INTO experiment (ExpName) 
VALUES 
("New experiment"),
("New experiment"),
("New experiment"),
("New experiment"),
("New experiment");


-- report 
INSERT INTO report (Title, Author, Flow, Temp, TotalDuration,Date_, Day_) 
VALUES
("Water Quality Analysis Report", "Reem Ghareeb", "12.5", "18", "48", "2024-05-10", "Monday"),
("Water Quality Analysis Report2", "Omnia Gamal", "8.2", "22", "72", "2024-04-22", "Thursday"),
("Lake Water Analysis", "Tasbeeh", "15.3", "14", "36", "2024-03-15", "Wednesday"),
("Lake Water Analysis 2", "Tasbeeh", "15.3", "14.5", "40", "2024-03-16", "Thursday"),
("Water Oxygen", "Alaa Zaitoon", "17.5", "18", "14", "2024-07-22", "Monday");

--equipment
INSERT INTO equipment (Name_,Manufacture,Type_) 
VALUES 
("Spectrophotometer", "XYZ Corporation", "Laboratory"),
("pH Meter", " ABC Instruments", "Laboratory"),
("Turbidity Meter", "DEF Technologies", "Field"),
("Pipette", "GHI Supplies", "Laboratory");

-- test 
INSERT INTO test(Cost, TestName, Description_, ApplicableParameters) 
VALUES 
(1200, "COD", "Chemical oxygen demand (COD) is the amount of dissolved oxygen that must be present in water to oxidise chemical organic materials, like petroleum. COD is used to gauge the short-term impact wastewater effluents will have on the oxygen levels of receiving waters."," Dichromate / sulphoric Acid and silver"),
(1500, "TSS", "Total Suspended Solids (TSS) is one of the method defined analytes. There is no specific chemical formula for a total suspended solid. Quite simply put, TSS is anything that is captured by filtering the sample aliquot through a specific pore size filter. Suspended solids can range from particles of silt or sediment to pieces of plant material such as leaves or stems. Even insect larvae and eggs can fall in the general category of TSS. High amounts of TSS can lead to an esthetically displeasing appearance of a body of water. Either the color or overall turbidity of the water will be negatively impacted."," Dichromate / sulphoric Acid and silver"),
(2100, "PH", "pH water analysis is crucial for assessing acidity or alkalinity in water, influencing environmental health, water treatment efficacy, agricultural productivity, and industrial processes."," Dichromate / sulphoric Acid and silver");

-- task
INSERT INTO task (Description_, Status_, AssignedTo)
VALUES
('Perform pH analysis of water samples', 'Completed', 5),
('Calibrate water quality monitoring equipment', 'Pending',  10),
('Conduct microbial testing on drinking water', 'In Progress', 5),
('Design a new filtration system', 'Cancelled', 10);

-- notification
INSERT INTO notification (Sender, Receiver, MessageContent) 
VALUES 
(1, 4, 'Meeting reminder: Water quality analysis discussion tomorrow at 10 AM.'),
(2, 5, 'Urgent: Equipment maintenance scheduled for next week. Please review.'),
(10, 6, 'Report submission deadline extended to Friday. Kindly ensure completion.'),
(11, 9, 'New task assigned: Conduct field testing for water samples in Sector 5.');

-- chemist_make_exp
INSERT INTO chemist_make_exp  (ChID, ExpID)
VALUES
(1, 1),
(1, 2),
(9, 3),
(9, 4),
(1, 5);

-- it_control_exp
INSERT INTO it_control_exp 
VALUES
(6, 1),
(6, 2),
(6, 3),
(6, 4),
(6, 5);

-- experiment_savesas_report 
INSERT INTO experiment_savesas_report
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- experiment_have_equipment
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

-- experiment_from_test
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

-- create_task
INSERT INTO create_task (ChID, TaskID) VALUES
(1, 1),
(1, 2),
(9, 3),
(9, 4);

-- modify_task
INSERT INTO modify_task 
VALUES
(5, 1, '2024-05-10'),
(5, 2, '2024-06-13'),
(10, 3, '2024-04-15'),
(10, 4, '2024-03-20');

-- send_notification
INSERT INTO send_notification
VALUES
(5, 1),
(5, 2),
(10, 3),
(10, 4);

-- view_report
INSERT INTO view_report
VALUES
(1, 1),
(2, 2),
(3, 4),
(3, 5),
(3, 3),
(7, 1);

-- show_notification
INSERT INTO show_notification
VALUES
(1, 1),
(8, 2),
(1, 3),
(9, 4);

--- test 
INSERT INTO test (TestName, Instructions, Duration, Temp)
VALUES ("BOD", "
١- نضع كمية مناسبة من العينات في الزجاجات.
٢- نضع بكل زجاجة قرص معدني.
٣- وضع زجاجات BOD في مكانها المناسب في الجهاز مع وضع قرص من هيدروكسيد الصوديوم (NaoH) في غطاء الزجاجة.
٤- نقوم بضبط درجة الحرارة ونقوم بتوصيلها بالمؤشر الزئبقي.
٥- ضبط المانوميتر على صفر بعد ٣٠/ ٤٠ دقيقة", 
40, 20);

INSERT INTO test (TestName, Instructions, Duration, Temp)
VALUES (
    "Sulfide",
    "١- نضع (0.2 ml) أو أربع قطرات من الزنك اسيتات و (0.1 ml) أو قطرتين من هيدروكسيد الصوديوم (NaOH) مع (200 ml) من العينة.
     ٢- نرج جيدا حتى يتكون راسب ثم نقوم بترشيحه على ورقة الترشيح.
     ٣- نجمع الراسب المتكون على ورقة الترشيح ونذوبه في (200 ml) من الماء المقطر.
     ٤- نضيف (10 ml) من اليود (Iodine) و (2 ml) حمض هيدروكلوريك (HCl).
     ٥- نعايره مع محلول صوديوم ثيوسلفات (Na2S2O3) حتى يتكون لون أصفر باهت.
     ٦- نضيف قطرتين من النشا ككاشف ونكمل المعايرة حتى يصبح اللون شفاف (عديم اللون).
     
     Mgs2-/L={(A*B) - (C*D) * 160000/ML Sample}
     A=10 حجم المحلول
     B=0.025N تركيز محلول اليود
     C=? حجم محلول صوديوم ثيوسلفات
     D=0.025N تركيز محلول الصوديوم ثيوسلفات",
    30, 25);


INSERT INTO test (TestName, Instructions, Duration, Temp)
VALUES (
    'Oil and Grease',
    '١- نقوم بوزن بوتقة جافة وفارغة (1w).
     ٢- نأخذ 250 ml من العينة ثم نضيف 25 ml من hexane بالإضافة إلى 2 ml من حمض (HCl N6).
     ٣- نغلق قمع الفصل ثم نرج جيدا.
     ٤- نضع قمع الفصل على حامل (stand) حتى تظهر طبقتان منفصلتان.
     ٥- نفتح الصنبور لتخرج الطبقة الأولى ثم نضع قمع به ورقة ترشيح تحتوي على 10 جم من كبريتات الصوديوم (sod.sulfate) في البوتقة الموزونة.
     ٦- ثم توضع في فرن التجفيف عند درجة حرارة ٧٠ درجة مئوية.
     ٧- بعد تبخر hexane نضع البوتقة في مكثف (desicator) لمدة ساعتين.
     ٨- ثم نقوم بالوزن (2w).
     
     Oil and Grease (mg/L) = (w2 - w1) * 10 / vml sample',
    120, 70);

--- equipment

INSERT INTO equipment (Name_, Manufacture, Type_)
VALUES
    ('زجاجات', 'LabGlass Inc.', 'Container'),
    ('جهاز BOD', 'EnviroTech', 'Measurement Device'),
    ('أقراص معدنية', 'ChemEquip', 'Accessory'),
    ('أقراص هيدروكسيد الصوديوم', 'ChemEquip', 'Chemical'),
    ('مؤشر زئبقي', 'Precision Instruments', 'Measurement Device'),
    ('مانوميتر', 'PressureTech', 'Measurement Device'),
    ('جهاز لضبط الحرارة', 'TempControl Co.', 'Control Device'),
    ('ماصة', 'LabTools', 'Measurement Tool'),
    ('كأس زجاجي', 'LabGlass Inc.', 'Container'),
    ('ورقة ترشيح', 'FilterWorks', 'Accessory'),
    ('محلول يود', 'ChemSupply', 'Chemical'),
    ('حمض هيدروكلوريك', 'ChemSupply', 'Chemical'),
    ('محلول صوديوم ثيوسلفات', 'ChemSupply', 'Chemical'),
    ('كاشف النشا', 'ChemReagents', 'Chemical'),
    ('بوتقة', 'LabGlass Inc.', 'Container'),
    ('مقياس الوزن', 'BalanceTech', 'Measurement Device'),
    ('قمع الفصل', 'SepaTools', 'Accessory'),
    ('حامل', 'LabStand', 'Accessory'),
    ('كبريتات الصوديوم', 'ChemReagents', 'Chemical'),
    ('فرن تجفيف', 'HeatWorks', 'Control Device'),
    ('مكثف', 'LabTools', 'Accessory'),
    ('هكسان', 'ChemReagents', 'Chemical');

-- test_have_equipment
INSERT INTO test_have_equipment VALUES
(5, 5),
(5, 6),
(5, 7),
(5, 8),
(5, 9),
(5, 10),
(5, 11),
(6, 12),
(6, 13),
(6, 14),
(6, 15),
(6, 16),
(6, 17),
(6, 18),
(7, 19),
(7, 20),
(7, 21),
(7, 22),
(7, 23),
(7, 24),
(7, 25),
(7, 26);


________________
--- Total coliform

INSERT INTO Test (TestName, Instructions, Duration, Temp)
VALUES (
    'Total coliform',
    '1- عمل تخفيف تسلسلي بتراكيز (0.1, 0.01, 0.001)
    2- استخدام لورييل تربتوز (lauryl treptose) نضع منه 9 ML)) ف كل انبوبة بمعدل 3 صفوف كل صف 5 أنابيب وقم برج الأنابيب بحذر لتقليل الفقاعات الهوائية
    3- ضع ف كل انبوبة 1ml من العينة المخففة
    4- احفظ الأنابيب ف درجة حرارة 35±0.5
    5- بعد 24 ساعة لاحظ إذا كان هناك فقاعات غازية أو نمو ان لم يكن هناك أي مظهر من مظاهر العينة تحفظ لمدة 24 ساعة أخرى
    6- في غياب وجود نمو أو فقاعات غازية بعد 48 ساعة تكون النتيجة سلبية. إذا ظهر نمو نقوم بعمل تجربة تأكيدية نقوم باستخدام برنت جيرن لاكتوز
    7- نقوم باستخدام ابرة معقمة لنقل 3 مرات من الأنابيب التي تكون فيها نمو ونقوم بحفظها ف درجة حرارة 35±0.5
    8- نحسب قيمة MPN من عدد الأنابيب البرلنت جيرن التي حدث بها نمو
',
    2880,  35);


INSERT INTO equipment (Name_, Manufacture, Type_) VALUES
('أنابيب تجربة', 'Various', 'Laboratory glassware'),
('Lauryl treptose', 'Various', 'Chemical reagent'),
('إبرة معقمة', 'Various', 'Laboratory consumable'),
('Brilliant Green Lactose Bile Broth', 'Various', 'Microbiology media'),
('Timer', 'Various', 'Laboratory instrument'),
('Thermometer', 'Various', 'Laboratory instrument');

INSERT INTO test_have_equipment VALUES
(11, 28),
(11, 29),
(11, 30),
(11, 31),
(11, 32),
(11, 33);
