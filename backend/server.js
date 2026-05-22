const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db');
const user = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
    res.send('CareAble API is running...');
});

app.use('/api/user', user);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
