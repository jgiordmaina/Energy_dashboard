// backend/index.js
/**
 * @fileoverview Entry point for the Energy Dashboard backend server.
 * @requires express
 */
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON request bodies

// POST route to handle meter reading submissions
app.post('/api/meterreadings', (req, res) => {
/**
 * Destructures the `personName`, `readingDate`, and `meterValue` properties from the request body.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.personName - The name of the person.
 * @param {string} req.body.readingDate - The date of the meter reading.
 * @param {number} req.body.meterValue - The value of the meter reading.
 */
  const { personName, readingDate, meterValue } = req.body;

  // Logic to process the data and save it to a database or perform other actions
  console.log('Meter Reading Submitted:', { personName, readingDate, meterValue });

  res.status(200).json({ message: 'Reading submitted successfully.' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
