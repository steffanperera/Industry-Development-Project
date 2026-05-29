const express = require("express");
const router = express.Router();

const employerModel = require("../models/employersModel");
const userModel = require("../models/userModel");

/* =========================
   REGISTER EMPLOYER
========================= */
router.post("/register", (req, res) => {
  const data = req.body;

  employerModel.createEmployer(
    data,
    (err, employerId, hashedPassword) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Error saving employer",
        });
      }

      userModel.SaveUser(
        data,
        hashedPassword,
        "EMPLOYER",
        (err, userId) => {
          if (err) {
            console.error(err);
          }
        }
      );

      res.json({
        message: "Employer registered successfully",
        employerId,
      });
    }
  );
});

/* =========================
   GET ALL EMPLOYERS
========================= */
router.get("/", (req, res) => {
  employerModel.getAll((err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
console.log(results)
    res.json(results);
  });
});

/* =========================
   GET SINGLE EMPLOYER
========================= */
router.get("/:id", (req, res) => {
  const empId = req.params.id;

  employerModel.getOne(empId, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(results[0]);
  });
});

/* =========================
   SEARCH EMPLOYERS
========================= */
router.get("/search/:keyword", (req, res) => {
  const keyword = req.params.keyword;

  employerModel.searchEmployers(keyword, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
});

/* =========================
   FILTER EMPLOYERS
========================= */
router.get("/filter/data", (req, res) => {
  const { city, status } = req.query;

  employerModel.filterEmployers(
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
   UPDATE EMPLOYER
========================= */
router.put("/:id", (req, res) => {
  const empId = req.params.id;
  const data = req.body;

  employerModel.updateEmployer(
    empId,
    data,
    (err, result) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Error updating employer",
        });
      }

      res.json({
        message: "Employer updated successfully",
      });
    }
  );
});

/* =========================
   DELETE EMPLOYER
========================= */
router.delete("/:id", (req, res) => {
  const empId = req.params.id;

  employerModel.deleteEmployer(
    empId,
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Error deleting employer",
        });
      }

      res.json({
        message: "Employer deleted successfully",
      });
    }
  );
});
router.get('/getonebyemail/:userName', (req, res) => {
  
    employerModel.getonebyemail(req.params.userName,(err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;