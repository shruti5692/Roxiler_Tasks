const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Import Routes
const initializeRoutes = require('./tasks/Task_01'); // Route for initializing the database
const transactionRoutes = require('./tasks/Task_02'); // Route for listing transactions
const task03Routes = require('./tasks/Task_03');
const task04Routes = require('./tasks/Task_04'); // Add the path for Task 04
const task05Routes = require('./tasks/Task_05'); // Add the path for Task 05
const task06Routes = require('./tasks/Task_06'); // Add the path for Task 06


// Use Routes
app.use('/api', initializeRoutes); // Initialize the database
app.use('/api', transactionRoutes); // Transactions related routes
app.use('/api', task03Routes);
app.use('/api', task04Routes); // Register the routes under '/api'
app.use('/api', task05Routes); // Register the routes under '/api'
app.use('/api', task06Routes); 



// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'An error occurred on the server',
    error: err.message
  });
});

// Set the server to listen on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
