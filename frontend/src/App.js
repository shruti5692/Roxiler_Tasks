import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TransactionsPage from './components/TransactionsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TransactionsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
