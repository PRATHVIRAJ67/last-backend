require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
const errorHandler = require('./middleware/errorHandler');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// CORS Middleware
app.use(cors()); // Enable CORS for all origins

// Database connection
connectDB();

// Routes
app.use('/api/contacts', contactRoutes);

// Error handling middleware
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
