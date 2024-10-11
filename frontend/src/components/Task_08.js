import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsStatistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  const fetchStatistics = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/statistics', {
        params: { month: selectedMonth } 
      });

      setStatistics({
        totalSaleAmount: response.data.totalSaleAmount,
        totalSoldItems: response.data.totalSoldItems,
        totalNotSoldItems: response.data.totalNotSoldItems,
      });
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, [selectedMonth]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
    
      <div>
        <h3>Total Sale Amount</h3>
        <p>${statistics.totalSaleAmount}</p>
      </div>
      <div>
        <h3>Total Sold Items</h3>
        <p>{statistics.totalSoldItems}</p>
      </div>
      <div>
        <h3>Total Not Sold Items</h3>
        <p>{statistics.totalNotSoldItems}</p>
      </div>
    </div>
  );
};

export default TransactionsStatistics;
