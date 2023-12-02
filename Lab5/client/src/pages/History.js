import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import './styles/history.css';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8000/histories');
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching news:', error.message);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div>
    <Header/>
    <h2>История компании</h2>
    <dl class="company-history">
        {history.map((item) => (
        <div key={item.id} className="company-history-item">
            <dt class="company-history-year"><b>{ item.year }</b></dt>
          <dd className="company-history-description">{item.description}</dd>
        </div>
      ))}
    </dl>
    </div>
  );
};

export default History;