// backend/index.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON request bodies

// POST route to handle meter reading submissions
app.post('/api/meterreadings', (req, res) => {
  const { personName, readingDate, meterValue } = req.body;

  // Logic to process the data and save it to a database or perform other actions
  console.log('Meter Reading Submitted:', { personName, readingDate, meterValue });

  res.status(200).json({ message: 'Reading submitted successfully.' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
