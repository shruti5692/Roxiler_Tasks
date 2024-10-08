const express = require('express');
const axios = require('axios');
const Product = require('../models/Product'); // Ensure this path matches your project structure

const router = express.Router();

// Route to initialize the database with seed data
router.get('/initialize', async (req, res) => {
    try {
        // Fetch data from the third-party API
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const products = response.data;

        // Check if data is an array
        if (!Array.isArray(products)) {
            return res.status(400).json({ message: 'Invalid data format' });
        }

        // Insert data into the MongoDB collection
        await Product.deleteMany({}); // Optional: Clear existing data
        await Product.insertMany(products);

        res.status(200).json({ message: 'Database initialized with seed data' });
    } catch (error) {
        console.error("Error initializing database: ", error);
        res.status(500).json({ message: 'Failed to initialize database', error });
    }
});

module.exports = router;

//---------------Check API---------------------
//http://localhost:5000/api/initialize