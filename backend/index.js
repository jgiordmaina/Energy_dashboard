const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route to verify the app is running
app.get('/', (req, res) => {
  res.send('Meter Reading Backend is running.');
});

// API route
app.post('/api/meterreadings', (req, res) => {
  const { personName, readingDate, meterValue } = req.body;
  if (!personName || !readingDate || !meterValue) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  res.status(200).json({
    message: 'Reading submitted successfully.',
    data: { personName, readingDate, meterValue },
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
