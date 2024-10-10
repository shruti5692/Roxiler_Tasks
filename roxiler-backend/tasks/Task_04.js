const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Helper function to extract the month from dateOfSale
const getMonthFromSaleDate = (date) => {
    const saleDate = new Date(date);
    return saleDate.getMonth() + 1;
};

// Route to get price range statistics for the bar chart
router.get('/bar-chart', async (req, res) => {
    const { month } = req.query;

    if (!month || isNaN(month) || month < 1 || month > 12) {
        return res.status(400).json({ message: "Please provide a valid month (1-12)." });
    }

    try {
        const allProducts = await Product.find();

        const productsInSelectedMonth = allProducts.filter(product => {
            return getMonthFromSaleDate(product.dateOfSale) === parseInt(month);
        });

        const priceRanges = {
            "0-100": 0,
            "101-200": 0,
            "201-300": 0,
            "301-400": 0,
            "401-500": 0,
            "501-600": 0,
            "601-700": 0,
            "701-800": 0,
            "801-900": 0,
            "901-above": 0
        };

        productsInSelectedMonth.forEach(product => {
            const price = product.price;
            
            if (price >= 0 && price <= 100) {
                priceRanges["0-100"]++;
            } else if (price >= 101 && price <= 200) {
                priceRanges["101-200"]++;
            } else if (price >= 201 && price <= 300) {
                priceRanges["201-300"]++;
            } else if (price >= 301 && price <= 400) {
                priceRanges["301-400"]++;
            } else if (price >= 401 && price <= 500) {
                priceRanges["401-500"]++;
            } else if (price >= 501 && price <= 600) {
                priceRanges["501-600"]++;
            } else if (price >= 601 && price <= 700) {
                priceRanges["601-700"]++;
            } else if (price >= 701 && price <= 800) {
                priceRanges["701-800"]++;
            } else if (price >= 801 && price <= 900) {
                priceRanges["801-900"]++;
            } else {
                priceRanges["901-above"]++;
            }
        });

        res.status(200).json(priceRanges);
    } catch (error) {
        console.error("Error fetching price range data: ", error);
        res.status(500).json({ message: 'Failed to fetch price range data', error });
    }
});

module.exports = router;


//------------------Check API----------------------
//http://localhost:5000/api/bar-chart?month=12