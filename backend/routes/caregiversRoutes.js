const express = require('express');
const router = express.Router();
const caregiverModel = require('../models/caregiversModel');

// POST /api/caregivers/register — register a new caregiver
router.post('/register', (req, res) => {
  const data = req.body;

  caregiverModel.createCaregiver(data, (err, caregiverId) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error saving caregiver' });
    }

    // Save care types
    caregiverModel.saveCareTypes(caregiverId, data.careTypes, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error saving care types' });
      }

      // Save skills
      caregiverModel.saveSkills(caregiverId, data.skills, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error saving skills' });
        }

        res.json({
          message: 'Caregiver registered successfully',
          caregiverId,
        });
      });
    });
  });
});

// GET /api/caregivers/getone/:caregiverId — fetch single caregiver profile
router.get('/getone/:caregiverId', (req, res) => {
  caregiverModel.getOne(req.params.caregiverId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;
