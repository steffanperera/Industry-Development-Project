const express = require('express');
const cors = require('cors');
const user = require('./routes/userRoutes');
const caregiver = require('./routes/caregiversRoutes');
const questionsRoutes = require('./routes/questionsRoutes');
const admin = require('./routes/adminRoutes');
const employersRoutes = require('./routes/employersRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('CareAble API is running...');
});

app.use('/api/user', user);
app.use('/api/caregivers', caregiver);
app.use('/api/questions', questionsRoutes);
app.use('/api/admin', admin);
app.use('/api/employers', employersRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
