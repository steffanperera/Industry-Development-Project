const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hashPassword(plainPassword) {
  // Automatically generates a salt and hashes the password
  const hash = await bcrypt.hash(plainPassword, 10);
  
  return hash;
}
/*
const Caregivers = {
    getAll: (callback) => {
        db.query('SELECT * FROM caregivers', callback);
    },
    check: async (User, callback) => {
        const { username,password} = User;
        //const hashedPassword = await bcrypt.hash(password, 10);
        //db.query('UPDATE users SET password= $1',[hashedPassword]);
        db.query('SELECT * FROM users WHERE username = $1', [username], 
            (err, res) => {
                if (err) return callback(err, null);
                callback(null, res.rows);
            }
        );
    }
};

module.exports = Caregivers;

*/
// get All care givers
const getAll = (callback) => {

  const sql = `SELECT * FROM caregivers`;


  db.query(sql,  callback);
};

const getOne = (caregiverId,callback) => {
console.log(caregiverId);
  const sql = `SELECT * FROM caregivers WHERE id=? `;

  const id=caregiverId;
  db.query(sql, id, callback);
  
};

// Save caregiver main data
const createCaregiver = async (data, callback) => {
  try {
  const hashedPassword =await hashPassword(data.password);
  //console.log("pw "+hashedPassword);
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
    data.weekends === "Yes",
    data.location,

    data.medical,
    data.criminal === "Yes",
    data.emergency,

    data.username,
    hashedPassword
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

const saveCaregiverAnswers = (answers) => {
  //console.log(answers);
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO caregiver_questions 
      (caregiverId, q_id, answer, correct_answer, is_correct)
      VALUES ?
    `;

    const values = answers.map((a) => [
      a.caregiverId,
      a.q_id,
      a.answer,
      a.correct_answer,
      a.is_correct,
    ]);

    db.query(query, [values], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const getquestionsscore = (caregiverId, callback) => {

  const sql = `
    SELECT 
      caregivers.experience_years,
      caregivers.has_certifications,
      caregivers.certification_list,

      SUM(
        CASE 
          WHEN caregiver_questions.is_correct = 1 THEN 2.5
          ELSE 0
        END
      ) AS quiz_score

    FROM caregiver_questions

    JOIN caregivers
      ON caregivers.id = caregiver_questions.caregiverId

    WHERE caregiver_questions.caregiverId = ?

    GROUP BY caregiver_questions.caregiverId
  `;

  db.query(sql, [caregiverId], callback);
};


module.exports = {
  createCaregiver,
  saveCareTypes,
  saveSkills,
  saveCaregiverAnswers,
  getOne,
  getAll,
  getquestionsscore
};