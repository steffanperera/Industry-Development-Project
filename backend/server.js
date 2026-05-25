const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db');
const user = require('./routes/userRoutes');
const caregiver = require('./routes/caregiversRoutes');
const questionsRoutes = require('./routes/questionsRoutes');
const admin = require('./routes/adminRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
    res.send('CareAble API is running...');
});

app.use('/api/user', user);
app.use('/api/caregivers', caregiver);
app.use('/api/questions', questionsRoutes);
app.use('/api/admin', admin);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
