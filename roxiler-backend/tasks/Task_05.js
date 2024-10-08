const express = require('express');
const Product = require('../models/Product'); // Ensure the correct path to your Product model

const router = express.Router();

// Helper function to extract the month from dateOfSale
const getMonthFromSaleDate = (date) => {
    const saleDate = new Date(date);
    return saleDate.getMonth() + 1; // getMonth() returns 0-11, so we add 1 to match 1-12
};

// Route to get unique categories and the number of items in each for the pie chart
router.get('/pie-chart', async (req, res) => {
    const { month } = req.query;

    if (!month || isNaN(month) || month < 1 || month > 12) {
        return res.status(400).json({ message: "Please provide a valid month (1-12)." });
    }

    try {
        const allProducts = await Product.find();

        // Filter products by the selected month
        const productsInSelectedMonth = allProducts.filter(product => {
            return getMonthFromSaleDate(product.dateOfSale) === parseInt(month);
        });

        // Create an object to count categories
        const categoryCount = {};

        productsInSelectedMonth.forEach(product => {
            const category = product.category;
            if (categoryCount[category]) {
                categoryCount[category]++;
            } else {
                categoryCount[category] = 1;
            }
        });

        // Convert categoryCount object into an array format suitable for response
        const pieChartData = Object.keys(categoryCount).map(category => ({
            category: category,
            count: categoryCount[category]
        }));

        res.status(200).json(pieChartData);
    } catch (error) {
        console.error("Error fetching pie chart data: ", error);
        res.status(500).json({ message: 'Failed to fetch pie chart data', error });
    }
});

module.exports = router;

//----------------Check API------------------
//http://localhost:5000/api/pie-chart?month=5