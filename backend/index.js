const express = require('express');
const cors = require('cors');
const app = express();

// Use environment variable PORT or default to 5000
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes, you can restrict origins if needed
app.use(express.json()); // Middleware to parse JSON bodies

// Root Route (to verify the backend is running)
app.get('/', (req, res) => {
  res.send('Meter Reading Backend is running.');
});

// API Route for submitting meter readings
app.post('/api/meterreading', (req, res) => {
  const { personName, readingDate, meterValue } = req.body;

  // Validation: Ensure all fields are present
  if (!personName || !readingDate || !meterValue) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Here you would typically process the data (e.g., save it to a database)
  // For this example, we'll just send a success response
  res.status(200).json({
    message: 'Reading submitted successfully.',
    data: {
      personName,
      readingDate,
      meterValue
    }
  });
});

// Catch-all Route for Non-Existent Routes
app.use((req, res, next) => {
  res.status(404).send('Route not found.');
});

// Start the server
app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
