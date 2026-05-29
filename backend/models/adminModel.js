const db = require('../db');
const bcrypt = require('bcrypt');


const User = {
    getAll: (callback) => {
        db.query('SELECT * FROM user', callback);
    },
    check: async (User, callback) => {
        const { username,password} = User;
        //const hashedPassword = await bcrypt.hash(password, 10);
        //db.query('UPDATE users SET password= $1',[hashedPassword]);
        db.query('SELECT * FROM user WHERE userName = ? AND userRole="ADMIN"', [username], 
            (err, results) => {
    //console.log(err);
    if (err) return callback(err, null);

   //console.log(results); 
    
    callback(null, results);
  }
        );
    },

    getAssessmentslistAll: (callback) => {
  const sql = `SELECT
assessments.assessmentId,
assessments.caregiverId,
assessments.grade,
assessments.attempt,
caregivers.first_name,
caregivers.last_name,
SUM(caregiver_questions.answer)/300*100 AS score
FROM
assessments
LEFT JOIN caregivers ON assessments.caregiverId = caregivers.id
LEFT JOIN caregiver_questions ON assessments.attempt = caregiver_questions.attempt AND assessments.caregiverId = caregiver_questions.caregiverId
GROUP BY assessments.attempt,assessments.caregiverId`;

  db.query(sql, callback);
  
}
};


module.exports = User;