const express = require('express');
const User = require('../models/userModel');
const router = express.Router();
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => {
    //console.log(req.body);
    const { username, password } = req.body;
   User.check({ username, password }, async (err, caregivers) => {
    
        const match = await bcrypt.compare(password, caregivers[0].password);//bcrypt.compare(password, users[0].password);
        if (!match) return res.status(401).json({ message: "Invalid password" });

        if (err) return res.status(500).json({ error: err.message });
        if (caregivers.length === 0) return res.status(401).json({ message: "Invalid credentials" });
        
        res.json({ message: "Login successful", user: caregivers[0] ,password:match});
    }); 
});


router.get('/', (req, res) => {
    User.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

module.exports = router;
