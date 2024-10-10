const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Import Routes
const initializeRoutes = require('./tasks/Task_01'); 
const transactionRoutes = require('./tasks/Task_02');
const task03Routes = require('./tasks/Task_03');
const task04Routes = require('./tasks/Task_04'); 
const task05Routes = require('./tasks/Task_05'); 
const task06Routes = require('./tasks/Task_06'); 


// Use Routes
app.use('/api', initializeRoutes); 
app.use('/api', transactionRoutes);
app.use('/api', task03Routes);
app.use('/api', task04Routes);
app.use('/api', task05Routes); 
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
