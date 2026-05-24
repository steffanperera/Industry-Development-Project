const express = require('express');
const Admin = require('../models/adminModel');
const router = express.Router();
const bcrypt = require('bcrypt');

// POST /api/admin — admin login
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  Admin.check({ username, password }, async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (user.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user[0].password);
    if (!match) return res.status(401).json({ message: 'Invalid password' });

    res.json({ message: 'Login successful', user: user[0], password: match });
  });
});

// GET /api/admin — get all admin users
router.get('/', (req, res) => {
  Admin.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;
