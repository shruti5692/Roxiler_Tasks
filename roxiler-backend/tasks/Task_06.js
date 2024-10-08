const express = require('express');
const axios = require('axios');

const router = express.Router();

// Route to fetch data from all 3 APIs and combine the response
router.get('/combined-data', async (req, res) => {
    const { month } = req.query;

    if (!month || isNaN(month) || month < 1 || month > 12) {
        return res.status(400).json({ message: "Please provide a valid month (1-12)." });
    }

    try {
        // URLs for the three APIs
        const statisticsUrl = `http://localhost:5000/api/statistics?month=${month}`;
        const barChartUrl = `http://localhost:5000/api/bar-chart?month=${month}`;
        const pieChartUrl = `http://localhost:5000/api/pie-chart?month=${month}`;

        // Fetch data from all three APIs in parallel using axios
        const [statisticsResponse, barChartResponse, pieChartResponse] = await Promise.all([
            axios.get(statisticsUrl),
            axios.get(barChartUrl),
            axios.get(pieChartUrl)
        ]);

        // Combine the responses into a single JSON object
        const combinedData = {
            statistics: statisticsResponse.data,
            barChart: barChartResponse.data,
            pieChart: pieChartResponse.data
        };

        // Return the combined data
        res.status(200).json(combinedData);
    } catch (error) {
        console.error("Error fetching combined data: ", error);
        res.status(500).json({ message: 'Failed to fetch combined data', error });
    }
});

module.exports = router;

//------------------Check API---------------------
//http://localhost:5000/api/combined-data?month=8