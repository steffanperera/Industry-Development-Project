const express = require('express');
const User = require('../models/adminModel');
const router = express.Router();
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => {
    
    const { username, password } = req.body;
   User.check({ username, password }, async (err, user) => {
    //console.log(match);
        const match = await bcrypt.compare(password, user[0].password);//bcrypt.compare(password, users[0].password);
        if (!match) return res.status(401).json({ message: "Invalid password" });
    
        if (err) return res.status(500).json({ error: err.message });
        if (user.length === 0) return res.status(401).json({ message: "Invalid credentials" });
        
        res.json({ message: "Login successful", user: user[0] ,password:match});
    }); 
});


router.get('/', (req, res) => {
    User.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.get('/certificatelistAll', (req, res) => {
    User.getAssessmentslistAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;
