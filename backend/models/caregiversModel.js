const db = require('../db');
const bcrypt = require('bcrypt');

async function hashPassword(plainPassword) {
  const hash = await bcrypt.hash(plainPassword, 10);
  return hash;
}

// Get all caregivers
const getAll = (callback) => {
  const sql = `SELECT * FROM caregivers`;
  db.query(sql, callback);
};

// Get one caregiver by ID
const getOne = (caregiverId, callback) => {
  console.log(caregiverId);
  const sql = `SELECT * FROM caregivers WHERE id = ?`;
  db.query(sql, caregiverId, callback);
};

// Save caregiver main data
const createCaregiver = async (data, callback) => {
  try {
    const hashedPassword = await hashPassword(data.password);

    const sql = `
      INSERT INTO caregivers 
      (full_name, dob, gender, nic_passport, photo,
       mobile, email, address, city, experience_years, organization,
       has_certifications, certification_list, languages,
       availability, working_hours, weekends, preferred_location,
       medical_conditions, criminal_record, emergency_contact,
       username, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.fullName,
      data.dob,
      data.gender,
      data.nic,
      data.photo,

      data.mobile,
      data.email,
      data.address,
      data.city,

      data.years || null,
      data.organization,

      data.certifications,
      data.certificationList,
      data.languages,

      data.availability,
      data.hours,
      data.weekends === 'Yes',
      data.location,

      data.medical,
      data.criminal === 'Yes',
      data.emergency,

      data.username,
      hashedPassword,
    ];

    db.query(sql, values, (err, result) => {
      if (err) return callback(err);
      callback(null, result.insertId);
    });

  } catch (error) {
    callback(error, null);
  }
};

// Save care types (many-to-many)
const saveCareTypes = (caregiverId, careTypes, callback) => {
  if (!careTypes || careTypes.length === 0) return callback(null);

  const sql = `INSERT INTO caregiver_care_types (caregiver_id, care_type) VALUES ?`;
  const values = careTypes.map(typeId => [caregiverId, typeId]);

  db.query(sql, [values], callback);
};

// Save skills (many-to-many)
const saveSkills = (caregiverId, skills, callback) => {
  if (!skills || skills.length === 0) return callback(null);

  const sql = `INSERT INTO caregiver_skills (caregiver_id, skill) VALUES ?`;
  const values = skills.map(skillId => [caregiverId, skillId]);

  db.query(sql, [values], callback);
};

module.exports = {
  createCaregiver,
  saveCareTypes,
  saveSkills,
  getOne,
  getAll,
};
