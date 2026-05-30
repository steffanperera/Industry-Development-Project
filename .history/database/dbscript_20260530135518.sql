/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : careable

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2026-05-23 15:24:34
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
  KEY `empId` (`empId`)
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
  `attempt` int(10) DEFAULT NULL,
  `added_at` datetime DEFAULT NULL,
  PRIMARY KEY (`assessmentId`),
  KEY `assessments_ibfk_1` (`caregiverId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of assessments
-- ----------------------------
INSERT INTO `assessments` VALUES ('3', '1', '267.00', null, '1', null);
INSERT INTO `assessments` VALUES ('4', '2', '299.00', null, '1', null);
INSERT INTO `assessments` VALUES ('5', '3', '267.00', '', '1', '0000-00-00 00:00:00');
INSERT INTO `assessments` VALUES ('6', '4', '299.00', '', '1', '0000-00-00 00:00:00');
INSERT INTO `assessments` VALUES ('7', '5', '267.00', '', '1', '0000-00-00 00:00:00');
INSERT INTO `assessments` VALUES ('8', '5', '299.00', '', '2', '0000-00-00 00:00:00');

-- ----------------------------
-- Table structure for `caregivers`
-- ----------------------------
DROP TABLE IF EXISTS `caregivers`;
CREATE TABLE `caregivers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) DEFAULT NULL,
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
  `status` varchar(3) NOT NULL DEFAULT 'ACT',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of caregivers
-- ----------------------------
INSERT INTO `caregivers` VALUES ('1', 'Anne', 'Smith', '2000-05-14', null, null, null, '0712588996', 'anne@g.c', '22A, Perth', '444444', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-22 18:12:40', 'ACT');
INSERT INTO `caregivers` VALUES ('2', 'Lucy', 'Fearnly', '1998-07-01', null, null, null, '0715558896', 'lucy@g.c', '55, Flower lane, Melbon ', '555555', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$wsQZGdPgyxD89sKNRKyZseAs6TSmkARvdTCm8ftRJbjwfL6J/cQGG', '2026-05-23 02:06:21', 'ACT');
INSERT INTO `caregivers` VALUES ('3', 'Mark', 'Vega', '1995-03-20', null, null, null, '0712400223', 'mark@g.c', '95 Queen Street,Narrabeen, New South Wales', '2101', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$Ywky/.cmX.rGJV3HwBTctudPRPP9VHTaMJAOGDS8ycEsz4ZK6P3Tu', '2026-05-23 02:15:24', 'ACT');
INSERT INTO `caregivers` VALUES ('4', 'Griffin', 'Siyran', '1992-05-07', null, null, null, '0712400553', 'griff@gmail.com', '43 Woerdens Road, Yarrawa, New South Wales', '2328', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$s3pXIT06Liv9F64xdlKqK.OFIsJ1z.pTBnUasDqfOVnPEmACAHSQi', '2026-05-23 02:19:00', 'ACT');
INSERT INTO `caregivers` VALUES ('5', 'Miyasri', 'Kangana', '1983-08-05', null, null, null, '0715558896', 'miyas@gmail.com', '80 Gaggin Street, Morpeth,New South Wales', '2321', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$ZYbomfoOeXFzULED6hNlWelr.gtAOd5tmIQ1K.11ABzZliI7RnbTC', '2026-05-23 02:22:15', 'ACT');
INSERT INTO `caregivers` VALUES ('7', 'Oliver', 'Smith', '1990-03-14', null, null, null, '412345678', 'oliver.s@gmail.com', '12 Flinders Street, Melbourne, Victoria', '3000', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('8', 'Charlotte', 'Brown', '1988-11-22', null, null, null, '415987654', 'char.b@gmail.com', '45 George Street, Sydney, New South Wales', '2000', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('9', 'William', 'Jones', '1995-07-09', null, null, null, '421456123', 'will.j@gmail.com', '88 Queen Street, Brisbane, Queensland', '4000', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('10', 'Amelia', 'Miller', '1984-05-17', null, null, null, '432789456', 'amelia.m@gmail.com', '23 King William Street, Adelaide, South Australia', '5000', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('11', 'Lucas', 'Davis', '1991-12-03', null, null, null, '443123789', 'lucas.d@gmail.com', '56 St Georges Terrace, Perth, Western Australia', '6000', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('12', 'Mia', 'Wilson', '1993-02-28', null, null, null, '454567891', 'mia.w@gmail.com', '19 Collins Street, Hobart, Tasmania', '7000', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('13', 'Ethan', 'Taylor', '1987-09-12', null, null, null, '465891234', 'ethan.t@gmail.com', '74 Northbourne Avenue, Canberra, Australian Capital Territory', '2601', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('14', 'Chloe', 'Anderson', '1992-06-25', null, null, null, '476234891', 'chloe.a@gmail.com', '31 Mitchell Street, Darwin, Northern Territory', '800', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('15', 'Noah', 'Thomas', '1989-10-05', null, null, null, '487345912', 'noah.t@gmail.com', '105 Macquarie Street, Sydney, New South Wales', '2000', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('16', 'Ava', 'White', '1996-04-19', null, null, null, '498456231', 'ava.w@gmail.com', '62 Bourke Street, Melbourne, Victoria', '3000', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('17', 'Jack', 'Martin', '1985-08-14', null, null, null, '411234567', 'jack.m@gmail.com', '14 Albert Street, Brisbane, Queensland', '4000', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('18', 'Isabella', 'Thompson', '1994-01-30', null, null, null, '422345678', 'isabella.t@gmail.com', '89 Rundle Mall, Adelaide, South Australia', '5000', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('19', 'Thomas', 'Garcia', '1982-11-08', null, null, null, '433456789', 'thomas.g@gmail.com', '47 Hay Street, Perth, Western Australia', '6000', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('20', 'Sophia', 'Martinez', '1997-05-23', null, null, null, '444567890', 'sophia.m@gmail.com', '52 Elizabeth Street, Hobart, Tasmania', '7000', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('21', 'James', 'Robinson', '1990-07-11', null, null, null, '455678901', 'james.r@gmail.com', '11 London Circuit, Canberra, Australian Capital Territory', '2601', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('22', 'Grace', 'Clark', '1986-03-22', null, null, null, '466789012', 'grace.c@gmail.com', '93 Smith Street, Darwin, Northern Territory', '800', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('23', 'Benjamin', 'Rodriguez', '1993-10-15', null, null, null, '477890123', 'ben.r@gmail.com', '33 Pitt Street, Sydney, New South Wales', '2000', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('24', 'Harper', 'Lewis', '1988-12-05', null, null, null, '488901234', 'harper.l@gmail.com', '71 Swanston Street, Melbourne, Victoria', '3000', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('25', 'Leo', 'Lee', '1995-02-14', null, null, null, '499012345', 'leo.l@gmail.com', '150 Edward Street, Brisbane, Queensland', '4000', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('26', 'Lily', 'Walker', '1991-09-09', null, null, null, '412123456', 'lily.w@gmail.com', '64 Grenfell Street, Adelaide, South Australia', '5000', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('27', 'Henry', 'Hall', '1983-06-18', null, null, null, '423234567', 'henry.h@gmail.com', '28 Murray Street, Perth, Western Australia', '6000', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('28', 'Evelyn', 'Allen', '1994-11-26', null, null, null, '434345678', 'evelyn.a@gmail.com', '41 Liverpool Street, Hobart, Tasmania', '7000', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('29', 'Alexander', 'Young', '1989-04-03', null, null, null, '445456789', 'alex.y@gmail.com', '85 Alinga Street, Canberra, Australian Capital Territory', '2601', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('30', 'Ella', 'King', '1996-07-21', null, null, null, '456567890', 'ella.k@gmail.com', '12 Cavenagh Street, Darwin, Northern Territory', '800', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('31', 'Samuel', 'Wright', '1992-10-10', null, null, null, '467678901', 'sam.w@gmail.com', '205 Castlereagh Street, Sydney, New South Wales', '2000', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('32', 'Scarlett', 'Lopez', '1987-05-12', null, null, null, '478789012', 'scarlett.l@gmail.com', '118 Lonsdale Street, Melbourne, Victoria', '3000', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('33', 'Daniel', 'Hill', '1990-08-24', null, null, null, '489890123', 'daniel.h@gmail.com', '42 Charlotte Street, Brisbane, Queensland', '4000', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('34', 'Emily', 'Scott', '1993-01-07', null, null, null, '490901234', 'emily.s@gmail.com', '75 Pirie Street, Adelaide, South Australia', '5000', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('35', 'Harrison', 'Green', '1985-12-31', null, null, null, '411122334', 'harry.g@gmail.com', '96 William Street, Perth, Western Australia', '6000', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');
INSERT INTO `caregivers` VALUES ('36', 'Zoe', 'Adams', '1994-03-16', null, null, null, '422233445', 'zoe.a@gmail.com', '14 Harrington Street, Hobart, Tasmania', '7000', '', null, '', null, null, null, null, null, null, null, null, null, '', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '2026-05-23 03:00:40', 'ACT');

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
-- Table structure for `caregiver_onboarding`
-- ----------------------------
DROP TABLE IF EXISTS `caregiver_onboarding`;
CREATE TABLE `caregiver_onboarding` (
  `onboarding_id` int(11) NOT NULL AUTO_INCREMENT,
  `caregiverId` int(11) NOT NULL,
  `current_work_status` enum('Yes FT','Yes PT','Casual','No') DEFAULT NULL,
  `looking_for_work` enum('Y','N') DEFAULT NULL,
  `applied_jobs_4weeks` enum('Y','N') DEFAULT NULL,
  `industry_interest` varchar(255) DEFAULT NULL,
  `speak_other_language` enum('Y','N') DEFAULT NULL,
  `other_language` varchar(100) DEFAULT NULL,
  `heard_about_app` varchar(255) DEFAULT NULL,
  `reason_for_joining` varchar(255) DEFAULT NULL,
  `care_for` varchar(100) DEFAULT NULL,
  `cared_person_age_range` varchar(100) DEFAULT NULL,
  `care_categories` varchar(255) DEFAULT NULL,
  `caregiving_duration` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`onboarding_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of caregiver_onboarding
-- ----------------------------
INSERT INTO `caregiver_onboarding` VALUES ('1', '1', 'No', 'N', 'Y', 'Child Care', 'Y', 'Cantonese', 'Internet', 'Salary', 'Mom', '50+', 'Dementia', '1-3 years', '2026-05-22 18:17:21', '2026-05-22 19:17:24');
INSERT INTO `caregiver_onboarding` VALUES ('2', '2', 'Yes FT', 'Y', 'Y', 'Health care', 'Y', 'Arabic', 'Friend', 'For Job', 'Child', 'Under 18', 'No', '1-3 years', '2026-05-23 02:08:30', '2026-05-23 02:32:10');
INSERT INTO `caregiver_onboarding` VALUES ('3', '5', 'Yes FT', 'Y', 'Y', 'Child Care', 'Y', 'Spanish', 'Internet', 'Job', 'Child', 'Under 18', 'No', '1-3 years', '2026-05-23 02:23:58', '2026-05-23 02:23:58');
INSERT INTO `caregiver_onboarding` VALUES ('4', '3', 'Yes FT', 'Y', 'Y', 'Health care', 'Y', 'Arabic', 'Friend', 'For Job', 'Child', 'Under 18', 'No', '1-3 years', '2026-05-23 02:08:30', '2026-05-23 02:32:44');
INSERT INTO `caregiver_onboarding` VALUES ('5', '4', 'Yes FT', 'Y', 'Y', 'Health care', 'Y', 'Arabic', 'Friend', 'For Job', 'Child', 'Under 18', 'No', '1-3 years', '2026-05-23 02:08:30', '2026-05-23 02:32:48');

-- ----------------------------
-- Table structure for `caregiver_questions`
-- ----------------------------
DROP TABLE IF EXISTS `caregiver_questions`;
CREATE TABLE `caregiver_questions` (
  `qu_id` int(12) NOT NULL AUTO_INCREMENT,
  `caregiverId` int(12) DEFAULT NULL,
  `attempt` int(12) DEFAULT 1,
  `q_id` int(12) DEFAULT NULL,
  `answer` int(4) NOT NULL,
  PRIMARY KEY (`qu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=361 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of caregiver_questions
-- ----------------------------
INSERT INTO `caregiver_questions` VALUES ('1', '1', '1', '5', '5');
INSERT INTO `caregiver_questions` VALUES ('2', '1', '1', '4', '5');
INSERT INTO `caregiver_questions` VALUES ('3', '1', '1', '3', '5');
INSERT INTO `caregiver_questions` VALUES ('4', '1', '1', '2', '5');
INSERT INTO `caregiver_questions` VALUES ('5', '1', '1', '1', '2');
INSERT INTO `caregiver_questions` VALUES ('6', '1', '1', '10', '5');
INSERT INTO `caregiver_questions` VALUES ('7', '1', '1', '9', '3');
INSERT INTO `caregiver_questions` VALUES ('8', '1', '1', '8', '4');
INSERT INTO `caregiver_questions` VALUES ('9', '1', '1', '7', '3');
INSERT INTO `caregiver_questions` VALUES ('10', '1', '1', '6', '4');
INSERT INTO `caregiver_questions` VALUES ('11', '1', '1', '15', '3');
INSERT INTO `caregiver_questions` VALUES ('12', '1', '1', '14', '5');
INSERT INTO `caregiver_questions` VALUES ('13', '1', '1', '13', '3');
INSERT INTO `caregiver_questions` VALUES ('14', '1', '1', '12', '3');
INSERT INTO `caregiver_questions` VALUES ('15', '1', '1', '11', '5');
INSERT INTO `caregiver_questions` VALUES ('16', '1', '1', '20', '5');
INSERT INTO `caregiver_questions` VALUES ('17', '1', '1', '19', '5');
INSERT INTO `caregiver_questions` VALUES ('18', '1', '1', '18', '5');
INSERT INTO `caregiver_questions` VALUES ('19', '1', '1', '17', '2');
INSERT INTO `caregiver_questions` VALUES ('20', '1', '1', '16', '5');
INSERT INTO `caregiver_questions` VALUES ('21', '1', '1', '25', '5');
INSERT INTO `caregiver_questions` VALUES ('22', '1', '1', '24', '4');
INSERT INTO `caregiver_questions` VALUES ('23', '1', '1', '23', '5');
INSERT INTO `caregiver_questions` VALUES ('24', '1', '1', '22', '3');
INSERT INTO `caregiver_questions` VALUES ('25', '1', '1', '21', '5');
INSERT INTO `caregiver_questions` VALUES ('26', '1', '1', '30', '5');
INSERT INTO `caregiver_questions` VALUES ('27', '1', '1', '29', '5');
INSERT INTO `caregiver_questions` VALUES ('28', '1', '1', '28', '5');
INSERT INTO `caregiver_questions` VALUES ('29', '1', '1', '27', '4');
INSERT INTO `caregiver_questions` VALUES ('30', '1', '1', '26', '5');
INSERT INTO `caregiver_questions` VALUES ('31', '1', '1', '35', '4');
INSERT INTO `caregiver_questions` VALUES ('32', '1', '1', '34', '4');
INSERT INTO `caregiver_questions` VALUES ('33', '1', '1', '33', '4');
INSERT INTO `caregiver_questions` VALUES ('34', '1', '1', '32', '5');
INSERT INTO `caregiver_questions` VALUES ('35', '1', '1', '31', '5');
INSERT INTO `caregiver_questions` VALUES ('36', '1', '1', '40', '5');
INSERT INTO `caregiver_questions` VALUES ('37', '1', '1', '39', '5');
INSERT INTO `caregiver_questions` VALUES ('38', '1', '1', '38', '5');
INSERT INTO `caregiver_questions` VALUES ('39', '1', '1', '37', '4');
INSERT INTO `caregiver_questions` VALUES ('40', '1', '1', '36', '5');
INSERT INTO `caregiver_questions` VALUES ('41', '1', '1', '45', '5');
INSERT INTO `caregiver_questions` VALUES ('42', '1', '1', '44', '5');
INSERT INTO `caregiver_questions` VALUES ('43', '1', '1', '43', '5');
INSERT INTO `caregiver_questions` VALUES ('44', '1', '1', '42', '5');
INSERT INTO `caregiver_questions` VALUES ('45', '1', '1', '41', '5');
INSERT INTO `caregiver_questions` VALUES ('46', '1', '1', '50', '5');
INSERT INTO `caregiver_questions` VALUES ('47', '1', '1', '49', '5');
INSERT INTO `caregiver_questions` VALUES ('48', '1', '1', '48', '3');
INSERT INTO `caregiver_questions` VALUES ('49', '1', '1', '47', '4');
INSERT INTO `caregiver_questions` VALUES ('50', '1', '1', '46', '5');
INSERT INTO `caregiver_questions` VALUES ('51', '1', '1', '55', '5');
INSERT INTO `caregiver_questions` VALUES ('52', '1', '1', '54', '5');
INSERT INTO `caregiver_questions` VALUES ('53', '1', '1', '53', '4');
INSERT INTO `caregiver_questions` VALUES ('54', '1', '1', '52', '3');
INSERT INTO `caregiver_questions` VALUES ('55', '1', '1', '51', '4');
INSERT INTO `caregiver_questions` VALUES ('56', '1', '1', '60', '5');
INSERT INTO `caregiver_questions` VALUES ('57', '1', '1', '59', '5');
INSERT INTO `caregiver_questions` VALUES ('58', '1', '1', '58', '5');
INSERT INTO `caregiver_questions` VALUES ('59', '1', '1', '57', '5');
INSERT INTO `caregiver_questions` VALUES ('60', '1', '1', '56', '5');
INSERT INTO `caregiver_questions` VALUES ('61', '5', '1', '5', '5');
INSERT INTO `caregiver_questions` VALUES ('62', '5', '1', '4', '5');
INSERT INTO `caregiver_questions` VALUES ('63', '5', '1', '3', '5');
INSERT INTO `caregiver_questions` VALUES ('64', '5', '1', '2', '5');
INSERT INTO `caregiver_questions` VALUES ('65', '5', '1', '1', '5');
INSERT INTO `caregiver_questions` VALUES ('66', '5', '1', '10', '5');
INSERT INTO `caregiver_questions` VALUES ('67', '5', '1', '9', '5');
INSERT INTO `caregiver_questions` VALUES ('68', '5', '1', '8', '5');
INSERT INTO `caregiver_questions` VALUES ('69', '5', '1', '7', '5');
INSERT INTO `caregiver_questions` VALUES ('70', '5', '1', '6', '5');
INSERT INTO `caregiver_questions` VALUES ('71', '5', '1', '15', '5');
INSERT INTO `caregiver_questions` VALUES ('72', '5', '1', '14', '5');
INSERT INTO `caregiver_questions` VALUES ('73', '5', '1', '13', '5');
INSERT INTO `caregiver_questions` VALUES ('74', '5', '1', '12', '5');
INSERT INTO `caregiver_questions` VALUES ('75', '5', '1', '11', '5');
INSERT INTO `caregiver_questions` VALUES ('76', '5', '1', '20', '5');
INSERT INTO `caregiver_questions` VALUES ('77', '5', '1', '19', '5');
INSERT INTO `caregiver_questions` VALUES ('78', '5', '1', '18', '5');
INSERT INTO `caregiver_questions` VALUES ('79', '5', '1', '17', '5');
INSERT INTO `caregiver_questions` VALUES ('80', '5', '1', '16', '5');
INSERT INTO `caregiver_questions` VALUES ('81', '5', '1', '25', '5');
INSERT INTO `caregiver_questions` VALUES ('82', '5', '1', '24', '5');
INSERT INTO `caregiver_questions` VALUES ('83', '5', '1', '23', '5');
INSERT INTO `caregiver_questions` VALUES ('84', '5', '1', '22', '5');
INSERT INTO `caregiver_questions` VALUES ('85', '5', '1', '21', '5');
INSERT INTO `caregiver_questions` VALUES ('86', '5', '1', '30', '5');
INSERT INTO `caregiver_questions` VALUES ('87', '5', '1', '29', '5');
INSERT INTO `caregiver_questions` VALUES ('88', '5', '1', '28', '5');
INSERT INTO `caregiver_questions` VALUES ('89', '5', '1', '27', '5');
INSERT INTO `caregiver_questions` VALUES ('90', '5', '1', '26', '5');
INSERT INTO `caregiver_questions` VALUES ('91', '5', '1', '35', '5');
INSERT INTO `caregiver_questions` VALUES ('92', '5', '1', '34', '5');
INSERT INTO `caregiver_questions` VALUES ('93', '5', '1', '33', '5');
INSERT INTO `caregiver_questions` VALUES ('94', '5', '1', '32', '5');
INSERT INTO `caregiver_questions` VALUES ('95', '5', '1', '31', '5');
INSERT INTO `caregiver_questions` VALUES ('96', '5', '1', '40', '5');
INSERT INTO `caregiver_questions` VALUES ('97', '5', '1', '39', '5');
INSERT INTO `caregiver_questions` VALUES ('98', '5', '1', '38', '5');
INSERT INTO `caregiver_questions` VALUES ('99', '5', '1', '37', '5');
INSERT INTO `caregiver_questions` VALUES ('100', '5', '1', '36', '5');
INSERT INTO `caregiver_questions` VALUES ('101', '5', '1', '45', '5');
INSERT INTO `caregiver_questions` VALUES ('102', '5', '1', '44', '5');
INSERT INTO `caregiver_questions` VALUES ('103', '5', '1', '43', '5');
INSERT INTO `caregiver_questions` VALUES ('104', '5', '1', '42', '5');
INSERT INTO `caregiver_questions` VALUES ('105', '5', '1', '41', '5');
INSERT INTO `caregiver_questions` VALUES ('106', '5', '1', '50', '5');
INSERT INTO `caregiver_questions` VALUES ('107', '5', '1', '49', '5');
INSERT INTO `caregiver_questions` VALUES ('108', '5', '1', '48', '5');
INSERT INTO `caregiver_questions` VALUES ('109', '5', '1', '47', '5');
INSERT INTO `caregiver_questions` VALUES ('110', '5', '1', '46', '5');
INSERT INTO `caregiver_questions` VALUES ('111', '5', '1', '55', '5');
INSERT INTO `caregiver_questions` VALUES ('112', '5', '1', '54', '5');
INSERT INTO `caregiver_questions` VALUES ('113', '5', '1', '53', '5');
INSERT INTO `caregiver_questions` VALUES ('114', '5', '1', '52', '5');
INSERT INTO `caregiver_questions` VALUES ('115', '5', '1', '51', '5');
INSERT INTO `caregiver_questions` VALUES ('116', '5', '1', '60', '4');
INSERT INTO `caregiver_questions` VALUES ('117', '5', '1', '59', '5');
INSERT INTO `caregiver_questions` VALUES ('118', '5', '1', '58', '5');
INSERT INTO `caregiver_questions` VALUES ('119', '5', '1', '57', '5');
INSERT INTO `caregiver_questions` VALUES ('120', '5', '1', '56', '5');
INSERT INTO `caregiver_questions` VALUES ('121', '5', '2', '5', '5');
INSERT INTO `caregiver_questions` VALUES ('122', '5', '2', '4', '5');
INSERT INTO `caregiver_questions` VALUES ('123', '5', '2', '3', '5');
INSERT INTO `caregiver_questions` VALUES ('124', '5', '2', '2', '5');
INSERT INTO `caregiver_questions` VALUES ('125', '5', '2', '1', '5');
INSERT INTO `caregiver_questions` VALUES ('126', '5', '2', '10', '5');
INSERT INTO `caregiver_questions` VALUES ('127', '5', '2', '9', '5');
INSERT INTO `caregiver_questions` VALUES ('128', '5', '2', '8', '5');
INSERT INTO `caregiver_questions` VALUES ('129', '5', '2', '7', '5');
INSERT INTO `caregiver_questions` VALUES ('130', '5', '2', '6', '5');
INSERT INTO `caregiver_questions` VALUES ('131', '5', '2', '15', '5');
INSERT INTO `caregiver_questions` VALUES ('132', '5', '2', '14', '5');
INSERT INTO `caregiver_questions` VALUES ('133', '5', '2', '13', '5');
INSERT INTO `caregiver_questions` VALUES ('134', '5', '2', '12', '5');
INSERT INTO `caregiver_questions` VALUES ('135', '5', '2', '11', '5');
INSERT INTO `caregiver_questions` VALUES ('136', '5', '2', '20', '5');
INSERT INTO `caregiver_questions` VALUES ('137', '5', '2', '19', '5');
INSERT INTO `caregiver_questions` VALUES ('138', '5', '2', '18', '5');
INSERT INTO `caregiver_questions` VALUES ('139', '5', '2', '17', '5');
INSERT INTO `caregiver_questions` VALUES ('140', '5', '2', '16', '5');
INSERT INTO `caregiver_questions` VALUES ('141', '5', '2', '25', '5');
INSERT INTO `caregiver_questions` VALUES ('142', '5', '2', '24', '5');
INSERT INTO `caregiver_questions` VALUES ('143', '5', '2', '23', '5');
INSERT INTO `caregiver_questions` VALUES ('144', '5', '2', '22', '5');
INSERT INTO `caregiver_questions` VALUES ('145', '5', '2', '21', '5');
INSERT INTO `caregiver_questions` VALUES ('146', '5', '2', '30', '5');
INSERT INTO `caregiver_questions` VALUES ('147', '5', '2', '29', '5');
INSERT INTO `caregiver_questions` VALUES ('148', '5', '2', '28', '5');
INSERT INTO `caregiver_questions` VALUES ('149', '5', '2', '27', '5');
INSERT INTO `caregiver_questions` VALUES ('150', '5', '2', '26', '5');
INSERT INTO `caregiver_questions` VALUES ('151', '5', '2', '35', '5');
INSERT INTO `caregiver_questions` VALUES ('152', '5', '2', '34', '5');
INSERT INTO `caregiver_questions` VALUES ('153', '5', '2', '33', '5');
INSERT INTO `caregiver_questions` VALUES ('154', '5', '2', '32', '5');
INSERT INTO `caregiver_questions` VALUES ('155', '5', '2', '31', '5');
INSERT INTO `caregiver_questions` VALUES ('156', '5', '2', '40', '5');
INSERT INTO `caregiver_questions` VALUES ('157', '5', '2', '39', '5');
INSERT INTO `caregiver_questions` VALUES ('158', '5', '2', '38', '5');
INSERT INTO `caregiver_questions` VALUES ('159', '5', '2', '37', '5');
INSERT INTO `caregiver_questions` VALUES ('160', '5', '2', '36', '5');
INSERT INTO `caregiver_questions` VALUES ('161', '5', '2', '45', '5');
INSERT INTO `caregiver_questions` VALUES ('162', '5', '2', '44', '5');
INSERT INTO `caregiver_questions` VALUES ('163', '5', '2', '43', '5');
INSERT INTO `caregiver_questions` VALUES ('164', '5', '2', '42', '5');
INSERT INTO `caregiver_questions` VALUES ('165', '5', '2', '41', '5');
INSERT INTO `caregiver_questions` VALUES ('166', '5', '2', '50', '5');
INSERT INTO `caregiver_questions` VALUES ('167', '5', '2', '49', '5');
INSERT INTO `caregiver_questions` VALUES ('168', '5', '2', '48', '5');
INSERT INTO `caregiver_questions` VALUES ('169', '5', '2', '47', '5');
INSERT INTO `caregiver_questions` VALUES ('170', '5', '2', '46', '5');
INSERT INTO `caregiver_questions` VALUES ('171', '5', '2', '55', '5');
INSERT INTO `caregiver_questions` VALUES ('172', '5', '2', '54', '5');
INSERT INTO `caregiver_questions` VALUES ('173', '5', '2', '53', '5');
INSERT INTO `caregiver_questions` VALUES ('174', '5', '2', '52', '5');
INSERT INTO `caregiver_questions` VALUES ('175', '5', '2', '51', '5');
INSERT INTO `caregiver_questions` VALUES ('176', '5', '2', '60', '4');
INSERT INTO `caregiver_questions` VALUES ('177', '5', '2', '59', '5');
INSERT INTO `caregiver_questions` VALUES ('178', '5', '2', '58', '5');
INSERT INTO `caregiver_questions` VALUES ('179', '5', '2', '57', '5');
INSERT INTO `caregiver_questions` VALUES ('180', '5', '2', '56', '5');
INSERT INTO `caregiver_questions` VALUES ('181', '2', '2', '5', '5');
INSERT INTO `caregiver_questions` VALUES ('182', '2', '1', '4', '5');
INSERT INTO `caregiver_questions` VALUES ('183', '2', '1', '3', '5');
INSERT INTO `caregiver_questions` VALUES ('184', '2', '1', '2', '5');
INSERT INTO `caregiver_questions` VALUES ('185', '2', '1', '1', '5');
INSERT INTO `caregiver_questions` VALUES ('186', '2', '1', '10', '5');
INSERT INTO `caregiver_questions` VALUES ('187', '2', '1', '9', '3');
INSERT INTO `caregiver_questions` VALUES ('188', '2', '1', '8', '5');
INSERT INTO `caregiver_questions` VALUES ('189', '2', '1', '7', '5');
INSERT INTO `caregiver_questions` VALUES ('190', '2', '1', '6', '5');
INSERT INTO `caregiver_questions` VALUES ('191', '2', '1', '15', '5');
INSERT INTO `caregiver_questions` VALUES ('192', '2', '1', '14', '3');
INSERT INTO `caregiver_questions` VALUES ('193', '2', '1', '13', '3');
INSERT INTO `caregiver_questions` VALUES ('194', '2', '1', '12', '3');
INSERT INTO `caregiver_questions` VALUES ('195', '2', '1', '11', '5');
INSERT INTO `caregiver_questions` VALUES ('196', '2', '1', '20', '5');
INSERT INTO `caregiver_questions` VALUES ('197', '2', '1', '19', '5');
INSERT INTO `caregiver_questions` VALUES ('198', '2', '1', '18', '5');
INSERT INTO `caregiver_questions` VALUES ('199', '2', '1', '17', '5');
INSERT INTO `caregiver_questions` VALUES ('200', '2', '1', '16', '3');
INSERT INTO `caregiver_questions` VALUES ('201', '2', '1', '25', '5');
INSERT INTO `caregiver_questions` VALUES ('202', '2', '1', '24', '5');
INSERT INTO `caregiver_questions` VALUES ('203', '2', '1', '23', '5');
INSERT INTO `caregiver_questions` VALUES ('204', '2', '1', '22', '5');
INSERT INTO `caregiver_questions` VALUES ('205', '2', '1', '21', '5');
INSERT INTO `caregiver_questions` VALUES ('206', '2', '1', '30', '5');
INSERT INTO `caregiver_questions` VALUES ('207', '2', '1', '29', '5');
INSERT INTO `caregiver_questions` VALUES ('208', '2', '1', '28', '5');
INSERT INTO `caregiver_questions` VALUES ('209', '2', '1', '27', '5');
INSERT INTO `caregiver_questions` VALUES ('210', '2', '1', '26', '5');
INSERT INTO `caregiver_questions` VALUES ('211', '2', '1', '35', '5');
INSERT INTO `caregiver_questions` VALUES ('212', '2', '1', '34', '5');
INSERT INTO `caregiver_questions` VALUES ('213', '2', '1', '33', '5');
INSERT INTO `caregiver_questions` VALUES ('214', '2', '1', '32', '5');
INSERT INTO `caregiver_questions` VALUES ('215', '2', '1', '31', '5');
INSERT INTO `caregiver_questions` VALUES ('216', '2', '1', '40', '5');
INSERT INTO `caregiver_questions` VALUES ('217', '2', '1', '39', '5');
INSERT INTO `caregiver_questions` VALUES ('218', '2', '1', '38', '5');
INSERT INTO `caregiver_questions` VALUES ('219', '2', '1', '37', '5');
INSERT INTO `caregiver_questions` VALUES ('220', '2', '1', '36', '5');
INSERT INTO `caregiver_questions` VALUES ('221', '2', '1', '45', '5');
INSERT INTO `caregiver_questions` VALUES ('222', '2', '1', '44', '5');
INSERT INTO `caregiver_questions` VALUES ('223', '2', '1', '43', '5');
INSERT INTO `caregiver_questions` VALUES ('224', '2', '1', '42', '5');
INSERT INTO `caregiver_questions` VALUES ('225', '2', '1', '41', '5');
INSERT INTO `caregiver_questions` VALUES ('226', '2', '1', '50', '5');
INSERT INTO `caregiver_questions` VALUES ('227', '2', '1', '49', '5');
INSERT INTO `caregiver_questions` VALUES ('228', '2', '1', '48', '5');
INSERT INTO `caregiver_questions` VALUES ('229', '2', '1', '47', '5');
INSERT INTO `caregiver_questions` VALUES ('230', '2', '1', '46', '5');
INSERT INTO `caregiver_questions` VALUES ('231', '2', '1', '55', '5');
INSERT INTO `caregiver_questions` VALUES ('232', '2', '1', '54', '5');
INSERT INTO `caregiver_questions` VALUES ('233', '2', '1', '53', '5');
INSERT INTO `caregiver_questions` VALUES ('234', '2', '1', '52', '5');
INSERT INTO `caregiver_questions` VALUES ('235', '2', '1', '51', '5');
INSERT INTO `caregiver_questions` VALUES ('236', '2', '1', '60', '4');
INSERT INTO `caregiver_questions` VALUES ('237', '2', '1', '59', '5');
INSERT INTO `caregiver_questions` VALUES ('238', '2', '1', '58', '5');
INSERT INTO `caregiver_questions` VALUES ('239', '2', '1', '57', '5');
INSERT INTO `caregiver_questions` VALUES ('240', '2', '1', '56', '5');
INSERT INTO `caregiver_questions` VALUES ('241', '3', '2', '5', '5');
INSERT INTO `caregiver_questions` VALUES ('242', '3', '1', '4', '5');
INSERT INTO `caregiver_questions` VALUES ('243', '3', '1', '3', '5');
INSERT INTO `caregiver_questions` VALUES ('244', '3', '1', '2', '5');
INSERT INTO `caregiver_questions` VALUES ('245', '3', '1', '1', '5');
INSERT INTO `caregiver_questions` VALUES ('246', '3', '1', '10', '5');
INSERT INTO `caregiver_questions` VALUES ('247', '3', '1', '9', '5');
INSERT INTO `caregiver_questions` VALUES ('248', '3', '1', '8', '5');
INSERT INTO `caregiver_questions` VALUES ('249', '3', '1', '7', '5');
INSERT INTO `caregiver_questions` VALUES ('250', '3', '1', '6', '5');
INSERT INTO `caregiver_questions` VALUES ('251', '3', '1', '15', '5');
INSERT INTO `caregiver_questions` VALUES ('252', '3', '1', '14', '5');
INSERT INTO `caregiver_questions` VALUES ('253', '3', '1', '13', '5');
INSERT INTO `caregiver_questions` VALUES ('254', '3', '1', '12', '5');
INSERT INTO `caregiver_questions` VALUES ('255', '3', '1', '11', '5');
INSERT INTO `caregiver_questions` VALUES ('256', '3', '1', '20', '5');
INSERT INTO `caregiver_questions` VALUES ('257', '3', '1', '19', '2');
INSERT INTO `caregiver_questions` VALUES ('258', '3', '1', '18', '5');
INSERT INTO `caregiver_questions` VALUES ('259', '3', '1', '17', '5');
INSERT INTO `caregiver_questions` VALUES ('260', '3', '1', '16', '5');
INSERT INTO `caregiver_questions` VALUES ('261', '3', '1', '25', '5');
INSERT INTO `caregiver_questions` VALUES ('262', '3', '1', '24', '5');
INSERT INTO `caregiver_questions` VALUES ('263', '3', '1', '23', '5');
INSERT INTO `caregiver_questions` VALUES ('264', '3', '1', '22', '5');
INSERT INTO `caregiver_questions` VALUES ('265', '3', '1', '21', '5');
INSERT INTO `caregiver_questions` VALUES ('266', '3', '1', '30', '5');
INSERT INTO `caregiver_questions` VALUES ('267', '3', '1', '29', '5');
INSERT INTO `caregiver_questions` VALUES ('268', '3', '1', '28', '5');
INSERT INTO `caregiver_questions` VALUES ('269', '3', '1', '27', '5');
INSERT INTO `caregiver_questions` VALUES ('270', '3', '1', '26', '5');
INSERT INTO `caregiver_questions` VALUES ('271', '3', '1', '35', '5');
INSERT INTO `caregiver_questions` VALUES ('272', '3', '1', '34', '5');
INSERT INTO `caregiver_questions` VALUES ('273', '3', '1', '33', '5');
INSERT INTO `caregiver_questions` VALUES ('274', '3', '1', '32', '5');
INSERT INTO `caregiver_questions` VALUES ('275', '3', '1', '31', '5');
INSERT INTO `caregiver_questions` VALUES ('276', '3', '1', '40', '5');
INSERT INTO `caregiver_questions` VALUES ('277', '3', '1', '39', '5');
INSERT INTO `caregiver_questions` VALUES ('278', '3', '1', '38', '5');
INSERT INTO `caregiver_questions` VALUES ('279', '3', '1', '37', '5');
INSERT INTO `caregiver_questions` VALUES ('280', '3', '1', '36', '5');
INSERT INTO `caregiver_questions` VALUES ('281', '3', '1', '45', '5');
INSERT INTO `caregiver_questions` VALUES ('282', '3', '1', '44', '5');
INSERT INTO `caregiver_questions` VALUES ('283', '3', '1', '43', '5');
INSERT INTO `caregiver_questions` VALUES ('284', '3', '1', '42', '5');
INSERT INTO `caregiver_questions` VALUES ('285', '3', '1', '41', '5');
INSERT INTO `caregiver_questions` VALUES ('286', '3', '1', '50', '5');
INSERT INTO `caregiver_questions` VALUES ('287', '3', '1', '49', '5');
INSERT INTO `caregiver_questions` VALUES ('288', '3', '1', '48', '5');
INSERT INTO `caregiver_questions` VALUES ('289', '3', '1', '47', '5');
INSERT INTO `caregiver_questions` VALUES ('290', '3', '1', '46', '5');
INSERT INTO `caregiver_questions` VALUES ('291', '3', '1', '55', '5');
INSERT INTO `caregiver_questions` VALUES ('292', '3', '1', '54', '5');
INSERT INTO `caregiver_questions` VALUES ('293', '3', '1', '53', '5');
INSERT INTO `caregiver_questions` VALUES ('294', '3', '1', '52', '5');
INSERT INTO `caregiver_questions` VALUES ('295', '3', '1', '51', '5');
INSERT INTO `caregiver_questions` VALUES ('296', '3', '1', '60', '4');
INSERT INTO `caregiver_questions` VALUES ('297', '3', '1', '59', '5');
INSERT INTO `caregiver_questions` VALUES ('298', '3', '1', '58', '5');
INSERT INTO `caregiver_questions` VALUES ('299', '3', '1', '57', '5');
INSERT INTO `caregiver_questions` VALUES ('300', '3', '1', '56', '5');
INSERT INTO `caregiver_questions` VALUES ('301', '4', '2', '5', '5');
INSERT INTO `caregiver_questions` VALUES ('302', '4', '1', '4', '5');
INSERT INTO `caregiver_questions` VALUES ('303', '4', '1', '3', '5');
INSERT INTO `caregiver_questions` VALUES ('304', '4', '1', '2', '4');
INSERT INTO `caregiver_questions` VALUES ('305', '4', '1', '1', '4');
INSERT INTO `caregiver_questions` VALUES ('306', '4', '1', '10', '5');
INSERT INTO `caregiver_questions` VALUES ('307', '4', '1', '9', '4');
INSERT INTO `caregiver_questions` VALUES ('308', '4', '1', '8', '5');
INSERT INTO `caregiver_questions` VALUES ('309', '4', '1', '7', '5');
INSERT INTO `caregiver_questions` VALUES ('310', '4', '1', '6', '5');
INSERT INTO `caregiver_questions` VALUES ('311', '4', '1', '15', '5');
INSERT INTO `caregiver_questions` VALUES ('312', '4', '1', '14', '5');
INSERT INTO `caregiver_questions` VALUES ('313', '4', '1', '13', '5');
INSERT INTO `caregiver_questions` VALUES ('314', '4', '1', '12', '5');
INSERT INTO `caregiver_questions` VALUES ('315', '4', '1', '11', '5');
INSERT INTO `caregiver_questions` VALUES ('316', '4', '1', '20', '5');
INSERT INTO `caregiver_questions` VALUES ('317', '4', '1', '19', '5');
INSERT INTO `caregiver_questions` VALUES ('318', '4', '1', '18', '5');
INSERT INTO `caregiver_questions` VALUES ('319', '4', '1', '17', '5');
INSERT INTO `caregiver_questions` VALUES ('320', '4', '1', '16', '5');
INSERT INTO `caregiver_questions` VALUES ('321', '4', '1', '25', '5');
INSERT INTO `caregiver_questions` VALUES ('322', '4', '1', '24', '5');
INSERT INTO `caregiver_questions` VALUES ('323', '4', '1', '23', '5');
INSERT INTO `caregiver_questions` VALUES ('324', '4', '1', '22', '5');
INSERT INTO `caregiver_questions` VALUES ('325', '4', '1', '21', '5');
INSERT INTO `caregiver_questions` VALUES ('326', '4', '1', '30', '5');
INSERT INTO `caregiver_questions` VALUES ('327', '4', '1', '29', '5');
INSERT INTO `caregiver_questions` VALUES ('328', '4', '1', '28', '5');
INSERT INTO `caregiver_questions` VALUES ('329', '4', '1', '27', '5');
INSERT INTO `caregiver_questions` VALUES ('330', '4', '1', '26', '5');
INSERT INTO `caregiver_questions` VALUES ('331', '4', '1', '35', '5');
INSERT INTO `caregiver_questions` VALUES ('332', '4', '1', '34', '5');
INSERT INTO `caregiver_questions` VALUES ('333', '4', '1', '33', '5');
INSERT INTO `caregiver_questions` VALUES ('334', '4', '1', '32', '5');
INSERT INTO `caregiver_questions` VALUES ('335', '4', '1', '31', '5');
INSERT INTO `caregiver_questions` VALUES ('336', '4', '1', '40', '5');
INSERT INTO `caregiver_questions` VALUES ('337', '4', '1', '39', '5');
INSERT INTO `caregiver_questions` VALUES ('338', '4', '1', '38', '5');
INSERT INTO `caregiver_questions` VALUES ('339', '4', '1', '37', '5');
INSERT INTO `caregiver_questions` VALUES ('340', '4', '1', '36', '5');
INSERT INTO `caregiver_questions` VALUES ('341', '4', '1', '45', '5');
INSERT INTO `caregiver_questions` VALUES ('342', '4', '1', '44', '5');
INSERT INTO `caregiver_questions` VALUES ('343', '4', '1', '43', '5');
INSERT INTO `caregiver_questions` VALUES ('344', '4', '1', '42', '5');
INSERT INTO `caregiver_questions` VALUES ('345', '4', '1', '41', '5');
INSERT INTO `caregiver_questions` VALUES ('346', '4', '1', '50', '5');
INSERT INTO `caregiver_questions` VALUES ('347', '4', '1', '49', '5');
INSERT INTO `caregiver_questions` VALUES ('348', '4', '1', '48', '5');
INSERT INTO `caregiver_questions` VALUES ('349', '4', '1', '47', '5');
INSERT INTO `caregiver_questions` VALUES ('350', '4', '1', '46', '5');
INSERT INTO `caregiver_questions` VALUES ('351', '4', '1', '55', '5');
INSERT INTO `caregiver_questions` VALUES ('352', '4', '1', '54', '5');
INSERT INTO `caregiver_questions` VALUES ('353', '4', '1', '53', '5');
INSERT INTO `caregiver_questions` VALUES ('354', '4', '1', '52', '5');
INSERT INTO `caregiver_questions` VALUES ('355', '4', '1', '51', '5');
INSERT INTO `caregiver_questions` VALUES ('356', '4', '1', '60', '4');
INSERT INTO `caregiver_questions` VALUES ('357', '4', '1', '59', '5');
INSERT INTO `caregiver_questions` VALUES ('358', '4', '1', '58', '5');
INSERT INTO `caregiver_questions` VALUES ('359', '4', '1', '57', '5');
INSERT INTO `caregiver_questions` VALUES ('360', '4', '1', '56', '3');

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
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) DEFAULT '',
  `mobile` varchar(20) DEFAULT '',
  `email` varchar(100) NOT NULL,
  `status` varchar(3) NOT NULL DEFAULT 'ACT',
  `dob` date DEFAULT NULL,
  `companyName` varchar(150) DEFAULT '',
  `city` varchar(100) DEFAULT '',
  `password` varchar(255) NOT NULL,
  `address` text DEFAULT NULL,
  PRIMARY KEY (`empId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of employer
-- ----------------------------
INSERT INTO `employer` VALUES ('1', 'Jack', 'Ryan', '433111222', 'jack.r@gmail.com', 'ACT', '1991-04-18', '', '2000', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '55 George Street, Sydney, New South Wales');
INSERT INTO `employer` VALUES ('2', 'Ruby', 'Matthews', '455444333', 'ruby.m@gmail.com', 'ACT', '1995-11-02', '', '3000', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '142 Collins Street, Melbourne, Victoria');
INSERT INTO `employer` VALUES ('3', 'Cooper', 'Evans', '422777888', 'coop.e@gmail.com', 'ACT', '1987-08-27', '', '4000', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '88 Albert Street, Brisbane, Queensland');
INSERT INTO `employer` VALUES ('4', 'Sienna', 'Morris', '466999000', 'sienna.m@gmail.com', 'ACT', '1993-01-15', '', '5000', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '21 King William Street, Adelaide, South Australia');
INSERT INTO `employer` VALUES ('5', 'Eli', 'Watson', '411888555', 'eli.w@gmail.com', 'ACT', '1990-06-30', '', '6000', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '73 St Georges Terrace, Perth, Western Australia');
INSERT INTO `employer` VALUES ('6', 'Isla', 'Brooks', '477222111', 'isla.b@gmail.com', 'ACT', '1996-12-11', '', '7000', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '64 Murray Street, Hobart, Tasmania');
INSERT INTO `employer` VALUES ('7', 'Hudson', 'Price', '499333444', 'hud.p@gmail.com', 'ACT', '1984-03-09', '', '2601', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '19 Northbourne Avenue, Canberra, Australian Capital Territory');
INSERT INTO `employer` VALUES ('8', 'Maya', 'Bennett', '488555666', 'maya.b@gmail.com', 'ACT', '1992-09-24', '', '800', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '42 Mitchell Street, Darwin, Northern Territory');
INSERT INTO `employer` VALUES ('9', 'Archer', 'Wood', '444666777', 'archer.w@gmail.com', 'ACT', '1989-07-05', '', '2000', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '109 Pitt Street, Sydney, New South Wales');
INSERT INTO `employer` VALUES ('10', 'Evie', 'Barnes', '412444999', 'evie.b@gmail.com', 'ACT', '1994-02-17', '', '3000', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '82 Bourke Street, Melbourne, Victoria');
INSERT INTO `employer` VALUES ('11', 'Connor', 'Henderson', '431555222', 'connor.h@gmail.com', 'ACT', '1986-10-22', '', '4000', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '50 Queen Street, Brisbane, Queensland');
INSERT INTO `employer` VALUES ('12', 'Aria', 'Fisher', '452666111', 'aria.f@gmail.com', 'ACT', '1997-05-08', '', '5000', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', '37 Rundle Mall, Adelaide, South Australia');

-- ----------------------------
-- Table structure for `questions`
-- ----------------------------
DROP TABLE IF EXISTS `questions`;
CREATE TABLE `questions` (
  `q_id` int(12) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT '',
  `question` text DEFAULT NULL,
  `status` enum('Deleted','Active') DEFAULT 'Active',
  PRIMARY KEY (`q_id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of questions
-- ----------------------------
INSERT INTO `questions` VALUES ('1', 'Communication & Relational Care', 'I understand others’ needs through both verbal and non-verbal communication.', 'Active');
INSERT INTO `questions` VALUES ('2', 'Communication & Relational Care', 'I adjust how I communicate based on the emotional state of others.', 'Active');
INSERT INTO `questions` VALUES ('3', 'Communication & Relational Care', 'I build trust through respectful and attentive communication.', 'Active');
INSERT INTO `questions` VALUES ('4', 'Communication & Relational Care', 'I communicate calmly during emotionally difficult situations.', 'Active');
INSERT INTO `questions` VALUES ('5', 'Communication & Relational Care', 'I communicate effectively across age, cultural, or family differences.', 'Active');
INSERT INTO `questions` VALUES ('6', 'System Navigation & Advocacy', 'I know how to access health, aged care, or disability services.', 'Active');
INSERT INTO `questions` VALUES ('7', 'System Navigation & Advocacy', 'I can manage forms, referrals, and service applications.', 'Active');
INSERT INTO `questions` VALUES ('8', 'System Navigation & Advocacy', 'I advocate effectively when care needs are not being met.', 'Active');
INSERT INTO `questions` VALUES ('9', 'System Navigation & Advocacy', 'I coordinate multiple services or providers when required.', 'Active');
INSERT INTO `questions` VALUES ('10', 'System Navigation & Advocacy', 'My actions help reduce barriers to accessing care.', 'Active');
INSERT INTO `questions` VALUES ('11', 'Emotional Resilience & Self-Regulation', 'I remain emotionally steady during stressful caregiving situations.', 'Active');
INSERT INTO `questions` VALUES ('12', 'Emotional Resilience & Self-Regulation', 'I manage strong emotions without them affecting care quality.', 'Active');
INSERT INTO `questions` VALUES ('13', 'Emotional Resilience & Self-Regulation', 'I use strategies to regulate my emotional responses.', 'Active');
INSERT INTO `questions` VALUES ('14', 'Emotional Resilience & Self-Regulation', 'I recover emotionally after difficult caregiving experiences.', 'Active');
INSERT INTO `questions` VALUES ('15', 'Emotional Resilience & Self-Regulation', 'I can support others emotionally while maintaining my own stability.', 'Active');
INSERT INTO `questions` VALUES ('16', 'Self-Care & Energy Management', 'I recognise early signs of physical or emotional fatigue in myself.', 'Active');
INSERT INTO `questions` VALUES ('17', 'Self-Care & Energy Management', 'I pace my energy to sustain caregiving over time.', 'Active');
INSERT INTO `questions` VALUES ('18', 'Self-Care & Energy Management', 'I take breaks before exhaustion affects safety or care.', 'Active');
INSERT INTO `questions` VALUES ('19', 'Self-Care & Energy Management', 'I seek help or respite when needed.', 'Active');
INSERT INTO `questions` VALUES ('20', 'Self-Care & Energy Management', 'I actively protect my own wellbeing while caring for others.', 'Active');
INSERT INTO `questions` VALUES ('21', 'Social connection & Belonging', 'I maintain social connections outside my caregiving role.', 'Active');
INSERT INTO `questions` VALUES ('22', 'Social connection & Belonging', 'I feel connected to peers, family, or community.', 'Active');
INSERT INTO `questions` VALUES ('23', 'Social connection & Belonging', 'I seek support when feeling isolated.', 'Active');
INSERT INTO `questions` VALUES ('24', 'Social connection & Belonging', 'I maintain interests or identity beyond caregiving.', 'Active');
INSERT INTO `questions` VALUES ('25', 'Social connection & Belonging', 'I experience a sense of belonging rather than isolation.', 'Active');
INSERT INTO `questions` VALUES ('26', 'Group Communication & Information Filtering', 'I manage communication among multiple people involved in care.', 'Active');
INSERT INTO `questions` VALUES ('27', 'Group Communication & Information Filtering', 'I share information selectively and appropriately.', 'Active');
INSERT INTO `questions` VALUES ('28', 'Group Communication & Information Filtering', 'I reduce emotional overload in group or family settings.', 'Active');
INSERT INTO `questions` VALUES ('29', 'Group Communication & Information Filtering', 'I manage disagreements respectfully.', 'Active');
INSERT INTO `questions` VALUES ('30', 'Group Communication & Information Filtering', 'I protect others from unnecessary distressing information.', 'Active');
INSERT INTO `questions` VALUES ('31', 'Practical Care & Safety Awareness', 'I provide daily care tasks safely and competently.', 'Active');
INSERT INTO `questions` VALUES ('32', 'Practical Care & Safety Awareness', 'I follow safe practices for mobility, hygiene, and medication.', 'Active');
INSERT INTO `questions` VALUES ('33', 'Practical Care & Safety Awareness', 'I recognise safety risks in care environments.', 'Active');
INSERT INTO `questions` VALUES ('34', 'Practical Care & Safety Awareness', 'I take action to prevent harm or accidents.', 'Active');
INSERT INTO `questions` VALUES ('35', 'Practical Care & Safety Awareness', 'I know when professional support is required.', 'Active');
INSERT INTO `questions` VALUES ('36', 'Cultural, Spiritual & Ethical Practice', 'I respect cultural, spiritual, and personal values in care.', 'Active');
INSERT INTO `questions` VALUES ('37', 'Cultural, Spiritual & Ethical Practice', 'I adapt care practices to align with beliefs or traditions.', 'Active');
INSERT INTO `questions` VALUES ('38', 'Cultural, Spiritual & Ethical Practice', 'I protect dignity and autonomy in daily care.', 'Active');
INSERT INTO `questions` VALUES ('39', 'Cultural, Spiritual & Ethical Practice', 'I consider ethical implications when making care decisions.', 'Active');
INSERT INTO `questions` VALUES ('40', 'Cultural, Spiritual & Ethical Practice', 'I provide culturally safe and respectful care.', 'Active');
INSERT INTO `questions` VALUES ('41', 'Adaptability & Learning Orientation', 'I learn new caregiving skills when required.', 'Active');
INSERT INTO `questions` VALUES ('42', 'Adaptability & Learning Orientation', 'I adapt to changes in health needs, systems, or technology.', 'Active');
INSERT INTO `questions` VALUES ('43', 'Adaptability & Learning Orientation', 'I seek information when faced with unfamiliar situations.', 'Active');
INSERT INTO `questions` VALUES ('44', 'Adaptability & Learning Orientation', 'I adjust my approach based on experience.', 'Active');
INSERT INTO `questions` VALUES ('45', 'Adaptability & Learning Orientation', 'I am confident learning through practice.', 'Active');
INSERT INTO `questions` VALUES ('46', 'Digital Literacy', 'I use digital tools to support caregiving tasks.', 'Active');
INSERT INTO `questions` VALUES ('47', 'Digital Literacy', 'I manage digital records and information effectively.', 'Active');
INSERT INTO `questions` VALUES ('48', 'Digital Literacy', 'I track appointments and care information digitally.', 'Active');
INSERT INTO `questions` VALUES ('49', 'Digital Literacy', 'I protect privacy and confidentiality online.', 'Active');
INSERT INTO `questions` VALUES ('50', 'Digital Literacy', 'I feel confident using care-related technology.', 'Active');
INSERT INTO `questions` VALUES ('51', 'Planning & Organisation', 'I plan daily and weekly caregiving tasks effectively.', 'Active');
INSERT INTO `questions` VALUES ('52', 'Planning & Organisation', 'I prioritise tasks when time or resources are limited.', 'Active');
INSERT INTO `questions` VALUES ('53', 'Planning & Organisation', 'I coordinate multiple responsibilities successfully.', 'Active');
INSERT INTO `questions` VALUES ('54', 'Planning & Organisation', 'I adjust plans when unexpected situations arise.', 'Active');
INSERT INTO `questions` VALUES ('55', 'Planning & Organisation', 'I stay organised under pressure.', 'Active');
INSERT INTO `questions` VALUES ('56', 'Leadership & Coordination', 'I coordinate caregiving tasks among others.', 'Active');
INSERT INTO `questions` VALUES ('57', 'Leadership & Coordination', 'I delegate responsibilities appropriately.', 'Active');
INSERT INTO `questions` VALUES ('58', 'Leadership & Coordination', 'I manage conflict constructively.', 'Active');
INSERT INTO `questions` VALUES ('59', 'Leadership & Coordination', 'I keep others informed about care needs.', 'Active');
INSERT INTO `questions` VALUES ('60', 'Leadership & Coordination', 'I take initiative when leadership is required.', 'Active');

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
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', '$2b$10$Mtjji.QahUOmlKQT5w2tOeY1RVLxiYXJbUELB4y99lSJqNqQLaUiK', 'ADMIN', '1');
INSERT INTO `user` VALUES ('2', 'nadee3@g.c', '$2b$10$Mtjji.QahUOmlKQT5w2tOeY1RVLxiYXJbUELB4y99lSJqNqQLaUiK', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('3', 'ban@gmail.com', '$2b$10$JstYoBpQ4uMLFDj8FEIaV.Yfvho1T470BacEbsjCybYgLrNQtAnXq', 'EMPLOYER', '1');
INSERT INTO `user` VALUES ('4', 'anne@g.c', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('5', 'lucy@g.c', '$2b$10$wsQZGdPgyxD89sKNRKyZseAs6TSmkARvdTCm8ftRJbjwfL6J/cQGG', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('6', 'mark@g.c', '$2b$10$Ywky/.cmX.rGJV3HwBTctudPRPP9VHTaMJAOGDS8ycEsz4ZK6P3Tu', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('7', 'griff@gmail.com', '$2b$10$s3pXIT06Liv9F64xdlKqK.OFIsJ1z.pTBnUasDqfOVnPEmACAHSQi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('8', 'miyas@gmail.com', '$2b$10$ZYbomfoOeXFzULED6hNlWelr.gtAOd5tmIQ1K.11ABzZliI7RnbTC', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('9', 'oliver.s@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('10', 'char.b@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('11', 'will.j@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('12', 'amelia.m@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('13', 'lucas.d@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('14', 'mia.w@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('15', 'ethan.t@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('16', 'chloe.a@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('17', 'noah.t@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('18', 'ava.w@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('19', 'jack.m@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('20', 'isabella.t@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('21', 'thomas.g@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('22', 'sophia.m@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('23', 'james.r@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('24', 'grace.c@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('25', 'ben.r@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('26', 'harper.l@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('27', 'leo.l@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('28', 'lily.w@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('29', 'henry.h@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('30', 'evelyn.a@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('31', 'alex.y@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('32', 'ella.k@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('33', 'sam.w@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('34', 'scarlett.l@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('35', 'daniel.h@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('36', 'emily.s@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('37', 'harry.g@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('38', 'zoe.a@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'CAREGIVER', '1');
INSERT INTO `user` VALUES ('39', 'jack.r@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'EMPLOYER', '1');
INSERT INTO `user` VALUES ('40', 'ruby.m@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'EMPLOYER', '1');
INSERT INTO `user` VALUES ('41', 'coop.e@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'EMPLOYER', '1');
INSERT INTO `user` VALUES ('42', 'sienna.m@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'EMPLOYER', '1');
INSERT INTO `user` VALUES ('43', 'eli.w@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'EMPLOYER', '1');
INSERT INTO `user` VALUES ('44', 'isla.b@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'EMPLOYER', '1');
INSERT INTO `user` VALUES ('45', 'hud.p@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'EMPLOYER', '1');
INSERT INTO `user` VALUES ('46', 'maya.b@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'EMPLOYER', '1');
INSERT INTO `user` VALUES ('47', 'archer.w@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'EMPLOYER', '1');
INSERT INTO `user` VALUES ('48', 'evie.b@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'EMPLOYER', '1');
INSERT INTO `user` VALUES ('49', 'connor.h@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'EMPLOYER', '1');
INSERT INTO `user` VALUES ('50', 'aria.f@gmail.com', '$2b$10$pjW1jPrZkPBHRcagqmKRquBPozEW9WIf.WBxcGIX0aRLBk3rcYnwi', 'EMPLOYER', '1');