// BarChart.js
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const BarChart = ({ selectedMonth }) => {
  const chartRef = useRef(null);
  const myChartRef = useRef(null);
  const [chartData, setChartData] = useState(null);

  // Fetch data from API when the selectedMonth changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bar-chart?month=${selectedMonth}`);
        setChartData(response.data);
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };

    if (selectedMonth) {
      fetchData();
    }
  }, [selectedMonth]);

  // Render the bar chart
  useEffect(() => {
    if (chartData && chartRef.current) {
      if (myChartRef.current) {
        myChartRef.current.destroy(); // Destroy previous chart instance
      }

      const ctx = chartRef.current.getContext('2d');
      myChartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(chartData),
          datasets: [{
            label: 'Number of Items',
            data: Object.values(chartData),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [chartData]);

  return (
    <div className="bar-chart-container">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default BarChart;
