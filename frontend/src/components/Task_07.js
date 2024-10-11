import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsTable = ({ selectedMonth }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const perPage = 10;

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transactions', {
        params: {
          page,
          perPage,
          search,
          month: selectedMonth,
        }
      });

      setTransactions(response.data.products);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [search, selectedMonth, page]);

  return (
    <div>
      {/* Search Input */}
      <input 
        type="text" 
        placeholder="Search transactions..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />

      {/* Transactions Table */}
      <table>
        <thead>
          <tr> 
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>${transaction.price.toFixed(2)}</td> {/* Formatting price with dollar sign */}
              <td>{transaction.category}</td>
              <td>{transaction.sold ? 'Yes' : 'No'}</td> {/* Display Sold status */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
      <button onClick={() => setPage(page + 1)} disabled={page * perPage >= total}>Next</button>
    </div>
  );
};

export default TransactionsTable;
