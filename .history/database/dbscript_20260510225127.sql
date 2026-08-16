/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : careable

Target Server Type    : MYSQLcareable
Target Server Version : 50505
File Encoding         : 65001

Date: 2026-05-10 17:03:23
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin`
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `adminId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`adminId`),
  KEY `userId` (`userId`),
  CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of admin
-- ----------------------------

-- ----------------------------
-- Table structure for `application`
-- ----------------------------
DROP TABLE IF EXISTS `application`;
CREATE TABLE `application` (
  `applicationId` int(11) NOT NULL AUTO_INCREMENT,
  `empId` int(11) DEFAULT NULL,
  `jobRole` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`applicationId`),
  KEY `empId` (`empId`),
  CONSTRAINT `application_ibfk_1` FOREIGN KEY (`empId`) REFERENCES `employer` (`empId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of application
-- ----------------------------

-- ----------------------------
-- Table structure for `assessments`
-- ----------------------------
DROP TABLE IF EXISTS `assessments`;
CREATE TABLE `assessments` (
  `assessmentId` int(11) NOT NULL AUTO_INCREMENT,
  `caregiverId` int(11) DEFAULT NULL,
  `score` decimal(5,2) DEFAULT NULL,
  `grade` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`assessmentId`),
  KEY `assessments_ibfk_1` (`caregiverId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of assessments
-- ----------------------------

-- ----------------------------
-- Table structure for `caregivers`
-- ----------------------------
DROP TABLE IF EXISTS `caregivers`;
CREATE TABLE `caregivers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(150) NOT NULL,
  `dob` date DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `nic_passport` varchar(50) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `experience_years` varchar(60) DEFAULT '',
  `organization` text DEFAULT NULL,
  `has_certifications` varchar(90) DEFAULT '',
  `certification_list` text DEFAULT NULL,
  `languages` varchar(255) DEFAULT NULL,
  `availability` enum('Full-time','Part-time') DEFAULT NULL,
  `working_hours` varchar(100) DEFAULT NULL,
  `weekends` tinyint(1) DEFAULT NULL,
  `preferred_location` varchar(150) DEFAULT NULL,
  `medical_conditions` text DEFAULT NULL,
  `criminal_record` tinyint(1) DEFAULT NULL,
  `emergency_contact` varchar(150) DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `nic_passport` (`nic_passport`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of caregivers
-- ----------------------------
INSERT INTO `caregivers` VALUES ('1', 'test', '2015-05-05', 'Female', '1236', '[object Object]', '0712400223', 'nn@bn.m', 'nnm nn', 'welimada', '5', '', '1', 'gg', 'English', '', '2', '1', 'Perth', 'nn', '0', '078266002', 'aaa', '2222', '2026-05-04 14:24:51');
INSERT INTO `caregivers` VALUES ('5', 'test2121', '2015-05-05', 'Female', '1236444', '[object Object]', '0712400223', 'nn22@bn.m', 'nnm nn', 'welimada', '5', '', '1', 'gg', 'English', '', '2', '1', 'Perth', 'nn', '0', '078266002', 'bbb', '2222', '2026-05-04 14:26:53');
INSERT INTO `caregivers` VALUES ('6', 'nadee', '2020-07-09', 'Female', '77889965412', '[object Object]', '0785200033', 'dd@gm.com', 'sss nnnm', 'ddop', '2', '', '1', 'sss cc', 'English', 'Full-time', '4-5', '1', 'Perth', 'Good', '0', '0896322145', 'pppp', 'pppp', '2026-05-04 14:46:53');
INSERT INTO `caregivers` VALUES ('7', 'jj anak', '2015-07-01', 'Female', '77889965447', '[object Object]', '0712445583', 'jj@gg.v', 'mm.nn ,m', 'mm', '4', '', '1', 'mm', 'Sinhala, English , French', 'Full-time', '4-8', '1', 'LA', 'Good', '0', '078965412366', 'mmm', '[object Promise]', '2026-05-04 16:13:25');
INSERT INTO `caregivers` VALUES ('8', 'nadee pathum', '2014-07-15', 'Female', '7896541236', '[object Object]', '0712588963', 'na@h.vv', 'imn , hh,mm ', 'SS', '0', '', '0', '', 'English', 'Full-time', '8-4', '0', 'Skk', 'Good', '0', '07854125', 'nadee', '[object Promise]', '2026-05-04 16:20:55');
INSERT INTO `caregivers` VALUES ('9', 'nadee pathumb', '2024-09-05', 'Female', '7125487', null, '', '', '', '', null, '', '0', '', '', '', '', '0', '', '', '0', '', '', '[object Promise]', '2026-05-04 16:22:47');
INSERT INTO `caregivers` VALUES ('17', 'pathum ban', '2020-11-10', 'Male', '7125487778', '[object Object]', '0789665214', 'mmn@gg.vv', 'mm nnk', '', '2', '', '0', '', '', '', '5-8', '0', 'All', '', '0', '', '1111', '$2b$10$a2pC7/GraVF04EBNQI1hJeoTy4YdNjCiDAGGv4FM4LXmkCL11Q1R2', '2026-05-04 16:39:04');
INSERT INTO `caregivers` VALUES ('18', 'nadee pathumiio', '1985-07-17', 'Female', '78652145', '[object Object]', '0712400228', 'smaro.lk@gmail.com', 'imn , hh,mm', 'welimada', '6 months–1 year', '', 'Diploma / HND (non-relevant field)', 'Diploma in English', 'Sinhala, English , French', 'Full-time', '5-5', '1', 'LA', 'Good', '0', '078266002', 'aabb', '$2b$10$cQPF2cRYTdc3N98EXfckeu3LidO7ot.LD6IPHzIiRexlPKKfaB/0e', '2026-05-06 12:13:22');
INSERT INTO `caregivers` VALUES ('19', 'nadee Bandara', '2005-07-27', 'Female', '1365214785', '[object Object]', '0782445369', 'bb@gm.cv', 'bb nn, cc', 'welimada', '1–2 years', '', 'Diploma / HND (relevant field)', '', 'English', 'Full-time', '5-8', '1', 'LA', 'Good', '0', '078266002', 'tttt', '$2b$10$3BtGDIJqMrsvQmfWVXrBruYhGF.eyKhRi7zmelF627eg4/ADNtLPi', '2026-05-06 18:17:04');
INSERT INTO `caregivers` VALUES ('20', 'Nadee Rande', '2011-09-22', 'Female', '199685747478', null, '07124000336', 'nadee@hh.nn', 'vvv , mmm', 'Colombo', '2–3 years', '', 'Bachelors degree (relevant field)', 'Diploma in English', 'Sinhala, English , French', 'Full-time', '5-6', '1', 'LA', 'Good', '0', '071522116', 'nadee123', '$2b$10$GwKkwWW1NuqYGAGwxFrCEOUl62F56J9xrWkLSS5wnUAuHR4se2rn.', '2026-05-06 20:10:13');
INSERT INTO `caregivers` VALUES ('21', 'Jhone Doe', '1995-05-10', 'Male', '188214125', '[object Object]', '0712400553', 'nnj@gm.bn', 'vv, nn', 'bbv nn, jjmk', '2–3 years', '', 'Bachelors degree (relevant field)', 'No', 'Sinhala, English , French', 'Full-time', '5-8', '1', 'Perth', 'Good', '0', 'mmn nn', 'kkkk', '$2b$10$4L2kq/bXIFDEoUeZJ5/Vk.cSc1qj01maW9OyxEgkkTMCh3Rnf02nS', '2026-05-10 12:28:09');
INSERT INTO `caregivers` VALUES ('23', 'Jane Rhetton', '2000-02-02', 'Male', '4563258', '[object Object]', '071400256', 'nb@gg.mm', 'gb.mm', 'we', '3 years or more', '', 'Bachelors degree (relevant field)', 'No', 'Sinhala, English , French', 'Full-time', '5-8', '1', 'mm', 'Good', '1', '07854125', 'ddd', '$2b$10$ttlwY2.2.0YfjiCnS.26tOsmVD4a3PFWElH8YHUg19FFWs8Ev8ysS', '2026-05-10 12:37:12');

-- ----------------------------
-- Table structure for `caregiver_care_types`
-- ----------------------------
DROP TABLE IF EXISTS `caregiver_care_types`;
CREATE TABLE `caregiver_care_types` (
  `type_id` int(12) NOT NULL AUTO_INCREMENT,
  `caregiver_id` int(11) DEFAULT NULL,
  `care_type` varchar(40) DEFAULT '',
  PRIMARY KEY (`type_id`),
  KEY `care_type_id` (`care_type`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of caregiver_care_types
-- ----------------------------
INSERT INTO `caregiver_care_types` VALUES ('1', '1', 'Elderly Care');
INSERT INTO `caregiver_care_types` VALUES ('2', '1', 'Child Care');
INSERT INTO `caregiver_care_types` VALUES ('3', '5', 'Elderly Care');
INSERT INTO `caregiver_care_types` VALUES ('4', '5', 'Child Care');
INSERT INTO `caregiver_care_types` VALUES ('5', '6', 'Disability Care');
INSERT INTO `caregiver_care_types` VALUES ('6', '6', 'Medical Assistance');
INSERT INTO `caregiver_care_types` VALUES ('7', '6', 'Elderly Care');
INSERT INTO `caregiver_care_types` VALUES ('8', '7', 'Elderly Care');
INSERT INTO `caregiver_care_types` VALUES ('9', '7', 'Child Care');
INSERT INTO `caregiver_care_types` VALUES ('10', '8', 'Child Care');
INSERT INTO `caregiver_care_types` VALUES ('11', '8', 'Medical Assistance');
INSERT INTO `caregiver_care_types` VALUES ('12', '18', 'Elderly Care');
INSERT INTO `caregiver_care_types` VALUES ('13', '18', 'Child Care');
INSERT INTO `caregiver_care_types` VALUES ('14', '19', 'Child Care');
INSERT INTO `caregiver_care_types` VALUES ('15', '19', 'Disability Care');
INSERT INTO `caregiver_care_types` VALUES ('16', '20', 'Child Care');
INSERT INTO `caregiver_care_types` VALUES ('17', '20', 'Elderly Care');
INSERT INTO `caregiver_care_types` VALUES ('18', '21', 'Child Care');
INSERT INTO `caregiver_care_types` VALUES ('19', '21', 'Disability Care');
INSERT INTO `caregiver_care_types` VALUES ('20', '23', 'Child Care');
INSERT INTO `caregiver_care_types` VALUES ('21', '23', 'Disability Care');

-- ----------------------------
-- Table structure for `caregiver_questions`
-- ----------------------------
DROP TABLE IF EXISTS `caregiver_questions`;
CREATE TABLE `caregiver_questions` (
  `qu_id` int(12) NOT NULL AUTO_INCREMENT,
  `caregiverId` int(12) DEFAULT NULL,
  `q_id` int(12) DEFAULT NULL,
  `answer` int(4) NOT NULL,
  `correct_answer` int(4) NOT NULL,
  `is_correct` int(4) NOT NULL,
  PRIMARY KEY (`qu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of caregiver_questions
-- ----------------------------
INSERT INTO `caregiver_questions` VALUES ('1', '1', '17', '3', '2', '0');
INSERT INTO `caregiver_questions` VALUES ('2', '1', '25', '3', '2', '0');
INSERT INTO `caregiver_questions` VALUES ('3', '1', '22', '3', '2', '0');
INSERT INTO `caregiver_questions` VALUES ('4', '1', '21', '3', '3', '1');
INSERT INTO `caregiver_questions` VALUES ('5', '1', '18', '2', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('6', '1', '10', '3', '3', '1');
INSERT INTO `caregiver_questions` VALUES ('7', '1', '12', '3', '3', '1');
INSERT INTO `caregiver_questions` VALUES ('8', '1', '5', '2', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('9', '1', '2', '2', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('10', '1', '3', '2', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('11', '1', '17', '3', '2', '0');
INSERT INTO `caregiver_questions` VALUES ('12', '1', '25', '3', '2', '0');
INSERT INTO `caregiver_questions` VALUES ('13', '1', '24', '3', '3', '1');
INSERT INTO `caregiver_questions` VALUES ('14', '1', '20', '3', '2', '0');
INSERT INTO `caregiver_questions` VALUES ('15', '1', '22', '2', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('16', '1', '15', '2', '3', '0');
INSERT INTO `caregiver_questions` VALUES ('17', '1', '9', '2', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('18', '1', '12', '2', '3', '0');
INSERT INTO `caregiver_questions` VALUES ('19', '1', '3', '2', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('20', '1', '6', '2', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('21', '1', '20', '4', '2', '0');
INSERT INTO `caregiver_questions` VALUES ('22', '1', '17', '3', '2', '0');
INSERT INTO `caregiver_questions` VALUES ('23', '1', '23', '3', '2', '0');
INSERT INTO `caregiver_questions` VALUES ('24', '1', '25', '2', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('25', '1', '18', '3', '2', '0');
INSERT INTO `caregiver_questions` VALUES ('26', '1', '5', '3', '2', '0');
INSERT INTO `caregiver_questions` VALUES ('27', '1', '6', '3', '2', '0');
INSERT INTO `caregiver_questions` VALUES ('28', '1', '13', '2', '3', '0');
INSERT INTO `caregiver_questions` VALUES ('29', '1', '3', '2', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('30', '1', '8', '2', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('31', '1', '20', '4', '2', '0');
INSERT INTO `caregiver_questions` VALUES ('32', '1', '17', '3', '2', '0');
INSERT INTO `caregiver_questions` VALUES ('33', '1', '23', '3', '2', '0');
INSERT INTO `caregiver_questions` VALUES ('34', '1', '25', '2', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('35', '1', '18', '3', '2', '0');
INSERT INTO `caregiver_questions` VALUES ('36', '1', '5', '3', '2', '0');
INSERT INTO `caregiver_questions` VALUES ('37', '1', '6', '3', '2', '0');
INSERT INTO `caregiver_questions` VALUES ('38', '1', '13', '2', '3', '0');
INSERT INTO `caregiver_questions` VALUES ('39', '1', '3', '2', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('40', '1', '8', '2', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('41', '1', '20', '2', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('42', '1', '16', '3', '3', '1');
INSERT INTO `caregiver_questions` VALUES ('43', '1', '21', '3', '3', '1');
INSERT INTO `caregiver_questions` VALUES ('44', '1', '25', '2', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('45', '1', '19', '2', '3', '0');
INSERT INTO `caregiver_questions` VALUES ('46', '1', '7', '2', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('47', '1', '9', '2', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('48', '1', '5', '2', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('49', '1', '10', '2', '3', '0');
INSERT INTO `caregiver_questions` VALUES ('50', '1', '15', '3', '3', '1');
INSERT INTO `caregiver_questions` VALUES ('51', '1', '25', '2', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('52', '1', '24', '3', '3', '1');
INSERT INTO `caregiver_questions` VALUES ('53', '1', '18', '3', '2', '0');
INSERT INTO `caregiver_questions` VALUES ('54', '1', '20', '3', '2', '0');
INSERT INTO `caregiver_questions` VALUES ('55', '1', '17', '1', '2', '0');
INSERT INTO `caregiver_questions` VALUES ('56', '1', '15', '1', '3', '0');
INSERT INTO `caregiver_questions` VALUES ('57', '1', '9', '2', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('58', '1', '11', '2', '3', '0');
INSERT INTO `caregiver_questions` VALUES ('59', '1', '5', '2', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('60', '1', '13', '3', '3', '1');
INSERT INTO `caregiver_questions` VALUES ('61', '23', '25', '2', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('62', '23', '24', '3', '3', '1');
INSERT INTO `caregiver_questions` VALUES ('63', '23', '18', '2', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('64', '23', '20', '2', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('65', '23', '17', '1', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('66', '23', '15', '2', '3', '1');
INSERT INTO `caregiver_questions` VALUES ('67', '23', '9', '2', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('68', '23', '11', '3', '3', '1');
INSERT INTO `caregiver_questions` VALUES ('69', '23', '5', '3', '2', '1');
INSERT INTO `caregiver_questions` VALUES ('70', '23', '13', '4', '3', '0');

-- ----------------------------
-- Table structure for `caregiver_skills`
-- ----------------------------
DROP TABLE IF EXISTS `caregiver_skills`;
CREATE TABLE `caregiver_skills` (
  `care_sk_id` int(12) NOT NULL AUTO_INCREMENT,
  `caregiver_id` int(11) NOT NULL,
  `skill` varchar(90) NOT NULL,
  PRIMARY KEY (`care_sk_id`),
  KEY `skill_id` (`skill`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of caregiver_skills
-- ----------------------------
INSERT INTO `caregiver_skills` VALUES ('1', '1', 'First Aid');
INSERT INTO `caregiver_skills` VALUES ('2', '1', 'CPR');
INSERT INTO `caregiver_skills` VALUES ('3', '5', 'First Aid');
INSERT INTO `caregiver_skills` VALUES ('4', '5', 'CPR');
INSERT INTO `caregiver_skills` VALUES ('5', '6', 'Medication Handling');
INSERT INTO `caregiver_skills` VALUES ('6', '6', 'Patient Hygiene');
INSERT INTO `caregiver_skills` VALUES ('7', '6', 'First Aid');
INSERT INTO `caregiver_skills` VALUES ('8', '7', 'Medication Handling');
INSERT INTO `caregiver_skills` VALUES ('9', '7', 'CPR');
INSERT INTO `caregiver_skills` VALUES ('10', '8', 'CPR');
INSERT INTO `caregiver_skills` VALUES ('11', '18', 'First Aid');
INSERT INTO `caregiver_skills` VALUES ('12', '19', 'CPR');
INSERT INTO `caregiver_skills` VALUES ('13', '19', 'First Aid');
INSERT INTO `caregiver_skills` VALUES ('14', '19', 'Medication Handling');
INSERT INTO `caregiver_skills` VALUES ('15', '20', 'CPR');
INSERT INTO `caregiver_skills` VALUES ('16', '20', 'First Aid');
INSERT INTO `caregiver_skills` VALUES ('17', '21', 'CPR');
INSERT INTO `caregiver_skills` VALUES ('18', '23', 'CPR');
INSERT INTO `caregiver_skills` VALUES ('19', '23', 'Medication Handling');

-- ----------------------------
-- Table structure for `care_types`
-- ----------------------------
DROP TABLE IF EXISTS `care_types`;
CREATE TABLE `care_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of care_types
-- ----------------------------
INSERT INTO `care_types` VALUES ('1', 'Elderly Care');
INSERT INTO `care_types` VALUES ('2', 'Child Care');
INSERT INTO `care_types` VALUES ('3', 'Disability Care');
INSERT INTO `care_types` VALUES ('4', 'Medical Assistance');

-- ----------------------------
-- Table structure for `employer`
-- ----------------------------
DROP TABLE IF EXISTS `employer`;
CREATE TABLE `employer` (
  `empId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `companyName` varchar(150) DEFAULT NULL,
  `contactNo` varchar(20) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `status` varchar(3) NOT NULL DEFAULT 'Yes',
  PRIMARY KEY (`empId`),
  KEY `userId` (`userId`),
  CONSTRAINT `employer_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of employer
-- ----------------------------

-- ----------------------------
-- Table structure for `questions`
-- ----------------------------
DROP TABLE IF EXISTS `questions`;
CREATE TABLE `questions` (
  `q_id` int(12) NOT NULL AUTO_INCREMENT,
  `type` varchar(12) DEFAULT NULL,
  `question` text DEFAULT NULL,
  `answer1` text DEFAULT NULL,
  `answer2` text DEFAULT NULL,
  `answer3` text DEFAULT NULL,
  `answer4` text DEFAULT NULL,
  `correct_answer` int(4) DEFAULT NULL,
  `status` enum('Deleted','Active') DEFAULT 'Active',
  PRIMARY KEY (`q_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of questions
-- ----------------------------
INSERT INTO `questions` VALUES ('1', 'CK_mcq', 'Which of the following is a sign of dehydration?', 'Sweating', 'Dry mouth', 'High energy', 'Loud speech', '2', 'Active');
INSERT INTO `questions` VALUES ('2', 'CK_mcq', 'The correct way to lift a patient is:', 'Bend your back', 'Use your legs', 'Twist your body', 'Pull quickly', '2', 'Active');
INSERT INTO `questions` VALUES ('3', 'CK_mcq', 'What is the normal body temperature range?', '34–35°C', '36–37.5°C', '38–40°C', '30–32°C', '2', 'Active');
INSERT INTO `questions` VALUES ('4', 'CK_mcq', 'Which condition affects memory and thinking skills?', 'Asthma', 'Diabetes', 'Dementia', 'Arthritis', '3', 'Active');
INSERT INTO `questions` VALUES ('5', 'CK_mcq', 'What is the first step in infection control?', 'Wear gloves', 'Wash hands', 'Take medicine', 'Call doctor', '2', 'Active');
INSERT INTO `questions` VALUES ('6', 'CK_mcq', 'What should you do if a patient falls?', 'Lift immediately', 'Check injuries first', 'Ignore', 'Leave', '2', 'Active');
INSERT INTO `questions` VALUES ('7', 'CK_mcq', 'Which diet is suitable for diabetic patients?', 'High sugar', 'Balanced low sugar', 'Only fats', 'Only protein', '2', 'Active');
INSERT INTO `questions` VALUES ('8', 'CK_mcq', 'What does PPE stand for?', 'Patient Protection Equipment', 'Personal Protective Equipment', 'Public Protection Equipment', 'Private Protection Equipment', '2', 'Active');
INSERT INTO `questions` VALUES ('9', 'CK_mcq', 'Pressure sores are caused by:', 'Too much walking', 'Prolonged pressure', 'Eating too much', 'Talking', '2', 'Active');
INSERT INTO `questions` VALUES ('10', 'CK_mcq', 'Which is a sign of stroke?', 'Smile evenly', 'Both arms strong', 'Slurred speech', 'Normal vision', '3', 'Active');
INSERT INTO `questions` VALUES ('11', 'CK_mcq', 'What is the most important step before providing care?', 'Start immediately', 'Ask family', 'Identify the patient correctly', 'Call doctor', '3', 'Active');
INSERT INTO `questions` VALUES ('12', 'CK_mcq', 'How often should hands be washed in caregiving?', 'Once a day', 'Only when dirty', 'Before and after each patient contact', 'Once a week', '3', 'Active');
INSERT INTO `questions` VALUES ('13', 'CK_mcq', 'What should you do if a patient has difficulty breathing?', 'Ignore', 'Give food', 'Seek immediate medical help', 'Let them sleep', '3', 'Active');
INSERT INTO `questions` VALUES ('14', 'CK_mcq', 'What is a key principle of person-centered care?', 'Treat everyone the same', 'Respect individual preferences', 'Ignore patient opinion', 'Follow only family decisions', '2', 'Active');
INSERT INTO `questions` VALUES ('15', 'CK_mcq', 'What should you do after using gloves?', 'Reuse them', 'Put in pocket', 'Dispose and wash hands', 'Give to another caregiver', '3', 'Active');
INSERT INTO `questions` VALUES ('16', 'SB_mcq', 'You are assisting a client with their morning routine when they suddenly collapse and become unresponsive. After ensuring the area is safe, what is your immediate next step?', 'Call the client’s emergency contact person', 'Try to move the client to their bed or a chair', 'Call 000 immediately and follow the dispatcher\'s instructions', 'Check the care plan for any history of fainting', '3', 'Active');
INSERT INTO `questions` VALUES ('17', 'SB_mcq', 'A client living with dementia becomes verbally aggressive and begins throwing objects during a meal. How should you respond?', 'Firmly tell the client that their behavior is unacceptable and will not be tolerated', 'Remain calm, move to a safe distance, and try to identify if an environmental trigger is causing the distress', 'Quickly restrain the client’s arms to prevent them from throwing more objects', 'Leave the room immediately and go home for the day', '2', 'Active');
INSERT INTO `questions` VALUES ('18', 'SB_mcq', 'Shortly after a shift change, you realize you accidentally gave a client the wrong dosage of their medication. What is your first obligation?', 'Wait until the next dose and give less to balance it out', 'Immediately notify your supervisor and monitor the client for any adverse reactions', 'Update the medication log to show the correct dose was given', 'Call the client’s doctor for a new prescription without telling your agency', '2', 'Active');
INSERT INTO `questions` VALUES ('19', 'SB_mcq', 'A client’s daughter offers you a $200 cash bonus for your service. How do you handle this?', 'Accept it as a private gift', 'Accept it but warn her not to repeat', 'Politely decline and explain it is against professional policy', 'Ask for a gift card instead', '3', 'Active');
INSERT INTO `questions` VALUES ('20', 'SB_mcq', 'You are caring for a non-verbal client pointing at their stomach and crying. How should you assess?', 'Assume they are hungry and give food', 'Use visual aids and observe body language, then check for physical symptoms', 'Ignore as normal behavior', 'Give painkiller without consulting nurse', '2', 'Active');
INSERT INTO `questions` VALUES ('21', 'SB_mcq', 'A client refuses to shower despite the care plan. What is your response?', 'Force them to follow the schedule', 'Threaten with consequences', 'Respect refusal, offer alternative, and document it', 'Call family to convince them', '3', 'Active');
INSERT INTO `questions` VALUES ('22', 'SB_mcq', 'You notice unexplained bruises on a client. What must you do?', 'Ignore as age-related', 'Document and report as safeguarding concern', 'Ask other caregivers casually', 'Post online for advice', '2', 'Active');
INSERT INTO `questions` VALUES ('23', 'SB_mcq', 'You feel exhausted after multiple double shifts. What is the professional action?', 'Push through it', 'Speak to manager and request adjustment', 'Take long breaks secretly', 'Call in sick last minute', '2', 'Active');
INSERT INTO `questions` VALUES ('24', 'SB_mcq', 'A colleague skips manual handling steps risking safety. What do you do?', 'Ignore it', 'Fix it later yourself', 'Discuss privately and report if continues', 'Complain to family', '3', 'Active');
INSERT INTO `questions` VALUES ('25', 'SB_mcq', 'A client fasting for religious reasons conflicts with medication schedule. What do you do?', 'Force them to eat', 'Consult client and healthcare professional to adjust safely', 'Dismiss their beliefs', 'Skip medication without telling', '2', 'Active');

-- ----------------------------
-- Table structure for `skills`
-- ----------------------------
DROP TABLE IF EXISTS `skills`;
CREATE TABLE `skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of skills
-- ----------------------------
INSERT INTO `skills` VALUES ('1', 'First Aid');
INSERT INTO `skills` VALUES ('2', 'CPR');
INSERT INTO `skills` VALUES ('3', 'Medication Handling');
INSERT INTO `skills` VALUES ('4', 'Patient Hygiene Assistance');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `userRole` enum('ADMIN','CAREGIVER','EMPLOYER') NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', '$2b$10$a2pC7/GraVF04EBNQI1hJeoTy4YdNjCiDAGGv4FM4LXmkCL11Q1R2', 'ADMIN', '1');
