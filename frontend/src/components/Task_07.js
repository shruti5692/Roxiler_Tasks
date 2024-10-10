import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [month, setMonth] = useState('March'); // Default to March
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const perPage = 10;

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Function to fetch transactions from the backend API
  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transactions', {
        params: {
          page,
          perPage,
          search,
          month // Sending the selected month as a parameter to filter by month
        }
      });

      setTransactions(response.data.products);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Fetch transactions on component mount or when page, search, or month changes
  useEffect(() => {
    fetchTransactions();
  }, [page, month]);

  // Handle page change for pagination
  const handleNext = () => {
    if (page * perPage < total) {
      setPage(page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Handle search action on button click
  const handleSearch = () => {
    setPage(1); // Reset page to 1 when searching
    fetchTransactions(); // Trigger fetch with new search term and month
  };

  return (
    <div>
      {/* Month Selector */}
      <label>Select Month: </label>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        {months.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      {/* Search Input */}
      <input 
        type="text" 
        placeholder="Search transactions..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />

      {/* Search Button */}
      <button onClick={handleSearch}>Search</button>

      {/* Transactions Table */}
      {transactions.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction.title}</td>
                <td>{transaction.description}</td>
                <td>{transaction.price}</td>
                <td>{transaction.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions found for the selected month or search criteria.</p>
      )}

      {/* Pagination Controls */}
      <button onClick={handlePrevious} disabled={page === 1}>Previous</button>
      <button onClick={handleNext} disabled={page * perPage >= total}>Next</button>
    </div>
  );
};

export default TransactionsTable;
