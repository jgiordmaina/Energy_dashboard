// index.js
const express = require('express');
const cors = require('cors');
const sql = require('mssql');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Configuration
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true, // Use encryption
        trustServerCertificate: false, // Change to true for local dev
    },
};

// Connect to the database
sql.connect(dbConfig)
    .then(() => {
        console.log('Connected to Azure SQL Database');
    })
    .catch(err => {
        console.error('Database Connection Failed! Bad Config: ', err);
    });

// Routes
app.get('/', (req, res) => {
    res.send('Meter Reading API is running.');
});

// Submit Meter Reading
app.post('/api/meterreadings', async (req, res) => {
    const { userId, readingDate, meterValue } = req.body;

    // Basic Validation
    if (!userId || !readingDate || !meterValue) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const request = new sql.Request();
        const result = await request
            .input('UserId', sql.NVarChar, userId)
            .input('ReadingDate', sql.Date, readingDate)
            .input('MeterValue', sql.Decimal(18, 2), meterValue)
            .query(
                `INSERT INTO MeterReadings (UserId, ReadingDate, MeterValue) 
                 VALUES (@UserId, @ReadingDate, @MeterValue)`
            );

        res.status(200).json({ message: 'Reading submitted successfully.' });
    } catch (error) {
        console.error('Error inserting meter reading:', error);
        res.status(500).json({ message: 'Internal Server Error.' });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
