const express = require('express');
const Product = require('../models/Product'); // Ensure this path is correct based on your project structure

const router = express.Router();

// Route to list all transactions with search and pagination
router.get('/transactions', async (req, res) => {
    try {
        const { page = 1, perPage = 10, search } = req.query;

        const query = {};

        // If a search parameter is provided, apply search conditions on title, description, price, and category
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },        // Case-insensitive search on title
                { description: { $regex: search, $options: 'i' } },  // Case-insensitive search on description
                { category: { $regex: search, $options: 'i' } },     // Case-insensitive search on category
                { price: !isNaN(Number(search)) ? Number(search) : undefined } // Exact match for price if it's a valid number
            ].filter(condition => Object.values(condition)[0] !== undefined); // Ensure no undefined conditions
        }

        // Pagination settings
        const skip = (parseInt(page) - 1) * parseInt(perPage);
        const limit = parseInt(perPage);

        // Fetch paginated and filtered transactions
        const products = await Product.find(query).skip(skip).limit(limit);

        // Return the paginated results
        res.status(200).json({
            currentPage: page,
            perPage: perPage,
            total: await Product.countDocuments(query), // Total count of matching products
            products: products
        });
    } catch (error) {
        console.error("Error fetching transactions: ", error);
        res.status(500).json({ message: 'Failed to fetch transactions', error });
    }
});

module.exports = router;

//-------------Check API-----------------
//http://localhost:5000/api/transactions?page=2&perPage=10&search=jewelery
