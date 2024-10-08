const express = require('express');
const Product = require('../models/Product'); // Correct path to your Product model

const router = express.Router();

// Helper function to extract the month from dateOfSale
const getMonthFromSaleDate = (date) => {
    const saleDate = new Date(date);
    return saleDate.getMonth() + 1; // getMonth() returns 0-11, so we add 1 to match 1-12
};

// Route to get statistics for a selected month
router.get('/statistics', async (req, res) => {
    const { month } = req.query;

    if (!month || isNaN(month) || month < 1 || month > 12) {
        return res.status(400).json({ message: "Please provide a valid month (1-12)." });
    }

    try {
        const allProducts = await Product.find();

        const productsInSelectedMonth = allProducts.filter(product => {
            return getMonthFromSaleDate(product.dateOfSale) === parseInt(month);
        });

        const totalSaleAmount = productsInSelectedMonth.reduce((sum, product) => {
            return product.sold ? sum + product.price : sum;
        }, 0);

        const totalSoldItems = productsInSelectedMonth.filter(product => product.sold).length;
        const totalNotSoldItems = productsInSelectedMonth.filter(product => !product.sold).length;

        res.status(200).json({
            month: month,
            totalSaleAmount: totalSaleAmount.toFixed(2),
            totalSoldItems,
            totalNotSoldItems
        });
    } catch (error) {
        console.error("Error fetching statistics: ", error);
        res.status(500).json({ message: 'Failed to fetch statistics', error });
    }
});

module.exports = router;

//---------------Check API------------------
//http://localhost:5000/api/statistics?month=4
