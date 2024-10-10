import React, { useState } from 'react';
import TransactionsTable from './Task_07';
import SalesStatistics from './Task_08';
import PriceRangeBarChart from './Task_09'; // Import the bar chart component

const TransactionsPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(3); // Default to March (3)

  const handleMonthChange = (newMonth) => {
    setSelectedMonth(newMonth);
  };

  return (
    <div>
      <h1>Transactions and Sales Statistics</h1>
      
      {/* Dropdown for month selection */}
      <label htmlFor="month-select">Select Month:</label>
      <select
        id="month-select"
        value={selectedMonth}
        onChange={(e) => handleMonthChange(Number(e.target.value))}
      >
        <option value={1}>January</option>
        <option value={2}>February</option>
        <option value={3}>March</option>
        <option value={4}>April</option>
        <option value={5}>May</option>
        <option value={6}>June</option>
        <option value={7}>July</option>
        <option value={8}>August</option>
        <option value={9}>September</option>
        <option value={10}>October</option>
        <option value={11}>November</option>
        <option value={12}>December</option>
      </select>

      {/* Pass selectedMonth to child components */}
      <TransactionsTable selectedMonth={selectedMonth} />
      <SalesStatistics selectedMonth={selectedMonth} />
      <PriceRangeBarChart selectedMonth={selectedMonth} /> {/* Task 09 */}
    </div>
  );
};

export default TransactionsPage;
