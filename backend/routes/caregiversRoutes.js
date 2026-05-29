const express = require("express");
const router = express.Router();
const caregiverModel = require("../models/caregiversModel");
const userModel = require("../models/userModel");
const db = require('../db');

/* =========================
   GET ALL CaregiverS
========================= */
router.get("/", (req, res) => {
  caregiverModel.getAll((err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
//console.log(results)
    res.json(results);
  });
});


// POST: Save caregiver
router.post("/register", (req, res) => {
  const data = req.body;

  caregiverModel.createCaregiver(data, (err, caregiverId,hashedPassword) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error saving caregiver" });
    }

    userModel.SaveUser(data,hashedPassword,'CAREGIVER', (err, userId) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error saving caregiver" });
    }
  });
     res.json({
          message: "Caregiver registered successfully",
          caregiverId
        });
    // Save care types
    // caregiverModel.saveCareTypes(caregiverId, data.careTypes, (err) => {
    //   if (err) {
    //     console.error(err);
    //     return res.status(500).json({ message: "Error saving care types" });
    //   }

    //   // Save skills
    //   caregiverModel.saveSkills(caregiverId, data.skills, (err) => {
    //     if (err) {
    //       console.error(err);
    //       return res.status(500).json({ message: "Error saving skills" });
    //     }

    //     res.json({
    //       message: "Caregiver registered successfully",
    //       caregiverId
    //     });
    //   });
    // });
  });
});

router.post("/crquestions", (req, res) => {
  
  try {
    const { caregiverId, answers } = req.body;
    console.log(req.body);
    if (!caregiverId || !answers || answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data",
      });
    }

    // Get correct answers from DB
    const q_ids = answers.map((a) => a.q_id);
    console.log(answers);
    const query = `
      SELECT q_id
      FROM questions
      WHERE q_id IN (?)
    `;

    db.query(query, [q_ids], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false });
      }

      

      // Prepare final data
      const finalAnswers = answers.map((a) => {

        return {
          caregiverId,
          q_id: a.q_id,
          answer: a.answer,
        };
      });

      // Save to DB
      //console.log(finalAnswers);
      await caregiverModel.saveCaregiverAnswers(finalAnswers);

      // Calculate score
      const score = finalAnswers.filter((a) => a.is_correct === 1).length;
      const total = finalAnswers.length;

      res.json({
        success: true,
        message: "Quiz submitted",
        score,
        total,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

router.get('/getone/:caregiverId', (req, res) => {
  
    caregiverModel.getOne(req.params.caregiverId,(err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});
router.get('/getonebyemail/:userName', (req, res) => {
  
    caregiverModel.getonebyemail(req.params.userName,(err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.get("/getscore/:caregiverId/:attempt", (req, res) => {

  caregiverModel.getquestionsscore(
    req.params.caregiverId,req.params.attempt,
    (err, results) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false,
          message: "Server error",
        });
      }

      if (results.length === 0) {
        return res.json({
          success: false,
          message: "No data found",
        });
      }

      const data = results[0];

      // =========================
      // QUIZ SCORE
      // =========================
      const quizScore = Number(data.quiz_score || 0);
      console.log(quizScore);

      // =========================
      // EXPERIENCE MARKS
      // // =========================
      // let experienceMarks = 0;

      // switch (data.experience_years) {

      //   case "3 years or more":
      //     experienceMarks = 45;
      //     break;

      //   case "2–3 years":
      //     experienceMarks = 35;
      //     break;

      //   case "1–2 years":
      //     experienceMarks = 25;
      //     break;

      //   case "6 months–1 year":
      //     experienceMarks = 15;
      //     break;

      //   case "Less than 6 months":
      //     experienceMarks = 5;
      //     break;

      //   case "No experience":
      //     experienceMarks = 0;
      //     break;

      //   default:
      //     experienceMarks = 0;
      // }

      // =========================
      // QUALIFICATION MARKS
      // =========================
      // let qualificationMarks = 0;

      // switch (data.has_certifications) {

      //   case "Masters degree or higher (relevant field)":
      //     qualificationMarks = 30;
      //     break;

      //   case "Bachelors degree (relevant field)":
      //     qualificationMarks = 25;
      //     break;

      //   case "Bachelors degree (non-relevant field)":
      //     qualificationMarks = 18;
      //     break;

      //   case "Diploma / HND (relevant field)":
      //     qualificationMarks = 18;
      //     break;

      //   case "Diploma / HND (non-relevant field)":
      //     qualificationMarks = 12;
      //     break;

      //   case "Certificate III or IV (relevant field)":
      //     qualificationMarks = 12;
      //     break;

      //   case "Certificate I or II":
      //     qualificationMarks = 7;
      //     break;

      //   case "No formal qualification":
      //     qualificationMarks = 0;
      //     break;

      //   default:
      //     qualificationMarks = 0;
      // }

      // =========================
      // BONUS MARKS
      // =========================
      // let bonusMarks = 0;

      // const certList = (data.certification_list || "").toLowerCase();

      // if (
      //   certList.includes("diploma") ||
      //   certList.includes("degree")
      // ) {
      //   bonusMarks = 5;
      // }

      // =========================
      // TOTAL
      // =========================
      const totalScore =
        quizScore ;
       // experienceMarks +
       // qualificationMarks +
       // bonusMarks;

      // =========================
      // RESPONSE
      // =========================
      res.json({
        success: true,

        caregiverId: req.params.caregiverId,

        quizScore,
        //experienceMarks,
        //qualificationMarks,
        //bonusMarks,

        totalScore,

        //experience: data.experience_years,
        //qualification: data.has_certifications,
      });

    }
  );
});

router.get("/getgrade/:score", (req, res) => {
  try {
    const score = Number(req.params.score);

    let grade = "";

    if (score >= 40) {
      grade = "Strength area – High demonstrated capability";
    } else if (score >= 30) {
      grade = "Growth area – Developing competency";
    } else if (score >= 10) {
      grade = "Support area – Targeted learning recommended";
    } else {
      grade = "Try Again";
    }

    res.json({
      success: true,
      score,
      grade,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

router.get("/scoreboard/:caregiverId/:attempt", async (req, res) => {
  try {
    const { caregiverId,attempt } = req.params;

    const scoreboards = await caregiverModel.getscoreboard(caregiverId,attempt);
    console.log(scoreboards);
    res.json({
      success: true,
      data: scoreboards,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


/* =========================
   SEARCH CaregiverS
========================= */
router.get("/search/:keyword", (req, res) => {
  const keyword = req.params.keyword;

  caregiverModel.searchCaregivers(keyword, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
console.log(results)
    res.json(results);
  });
});

/* =========================
   FILTER CaregiverS
========================= */
router.get("/filter/data", (req, res) => {
  const { city, status } = req.query;

  caregiverModel.filterCaregivers(
    city,
    status,
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(results);
    }
  );
});

/* =========================
   UPDATE Caregiver
========================= */
router.put("/:id", (req, res) => {
  const empId = req.params.id;
  const data = req.body;

  caregiverModel.updateCaregiver(
    empId,
    data,
    (err, result) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Error updating Caregiver",
        });
      }

      res.json({
        message: "Caregiver updated successfully",
      });
    }
  );
});

/* =========================
   DELETE Caregiver
========================= */
router.delete("/:id", (req, res) => {
  const empId = req.params.id;

  caregiverModel.deleteCaregiver(
    empId,
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Error deleting Caregiver",
        });
      }

      res.json({
        message: "Caregiver deleted successfully",
      });
    }
  );
});


router.get('/certificatelist/:caregiverId', (req, res) => {
  console.log(req.params.caregiverId);
    caregiverModel.getAssessmentslist(req.params.caregiverId,(err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});


// ===================================
// INSERT onboarding data
// ===================================
router.post("/onboarding", async (req, res) => {

  try {

    const result = await caregiverModel.insertCaregiverOnboarding(req.body);

    res.status(201).json({
      success: true,
      message: "Onboarding data saved successfully",
      data: result
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to save onboarding data"
    });

  }

});


// ===================================
// GET onboarding data by caregiver ID
// ===================================
router.get("/onboarding/:caregiverId", async (req, res) => {

  try {

    const { caregiverId } = req.params;

    const data = await caregiverModel.getCaregiverOnboardingById(caregiverId);

    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch onboarding data"
    });

  }

});


// ===================================
// UPDATE onboarding data
// ===================================
router.put("/onboarding/:caregiverId", async (req, res) => {

  try {

    const { caregiverId } = req.params;

    const result = await caregiverModel.updateCaregiverOnboarding(
      caregiverId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Onboarding data updated successfully",
      data: result
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to update onboarding data"
    });

  }

});

module.exports = router;