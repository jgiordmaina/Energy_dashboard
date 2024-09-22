// src/components/MeterReadingForm.js
import React, { useState } from 'react';
import axios from 'axios';

function MeterReadingForm() {
  const [personName, setPersonName] = useState('');
  const [readingDate, setReadingDate] = useState('');
  const [meterValue, setMeterValue] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend API
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/meterreadings`, {
        personName,       // Include the person name in the request
        readingDate,
        meterValue: parseFloat(meterValue),
      });

      setMessage('Reading submitted successfully.');
    } catch (error) {
      console.error('Error submitting meter reading:', error);
      setMessage('Failed to submit reading.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="personName">Person Name:</label>
          <input
            type="text"
            id="personName"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="readingDate">Reading Date:</label>
          <input
            type="date"
            id="readingDate"
            value={readingDate}
            onChange={(e) => setReadingDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="meterValue">Meter Value:</label>
          <input
            type="number"
            id="meterValue"
            value={meterValue}
            onChange={(e) => setMeterValue(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default MeterReadingForm;
