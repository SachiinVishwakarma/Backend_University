const express = require('express');
const cors = require('cors');
const dbOperation = require('./Assignment/dbOperations');

const API_PORT = process.env.PORT || 8000;
const app = express();

// CORS configuration
const corsOption = {
  origin: 'http://localhost:3000', // Allow requests from localhost:4000
  methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
  credentials: true               // Allow credentials (cookies, etc.)
};
app.use(cors(corsOption));
app.use((req, res, next) => {
  console.log('Request Headers:', req.headers);
  next();
});

// Middleware to parse JSON
app.use(express.json());

// Routes
app.post('/api/getPerson', async (req, res) => {
  try {
    const result = await dbOperation.getPerson(req.body.ID);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Person not found' });
    }
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error in /api/getPerson:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error });
  }
});

app.get('/api/getAllPerson', async (req, res) => {
  try {
    const result = await dbOperation.getAllPerson();
    res.status(200).json({ success: true, data: result.recordset });
  } catch (error) {
    console.error('Error in /api/getAllPerson:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error });
  }
});

app.post('/api/createPerson', async (req, res) => {
  console.log('Request Body:', req.body);
  try {
    const result = await dbOperation.createPerson(req.body);
    res.status(201).json({ success: true, message: 'Person created successfully', data: result });
  } catch (error) {
    console.error('Error in /api/createPerson:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error });
  }
});

app.post('/api/deletePerson', async (req, res) => {
  try {
    const result = await dbOperation.deletePerson(req.body.ID);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Person not found or already deleted' });
    }
    res.status(200).json({ success: true, message: 'Person deleted successfully' });
  } catch (error) {
    console.error('Error in /api/deletePerson:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error });
  }
});

app.post('/api/updatePerson', async (req, res) => {
  try {
    const result = await dbOperation.updatePerson(req.body);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Person not found' });
    }
    res.status(200).json({ success: true, message: 'Person updated successfully', data: result });
  } catch (error) {
    console.error('Error in /api/updatePerson:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error });
  }
});

// Start the server
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
