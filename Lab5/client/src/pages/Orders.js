import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import './styles/history.css';

const Orders = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token == null || token == undefined)
            navigate('/');
        const response = await axios.get('http://localhost:8000/orders',{
            headers: {
              Authorization: `${token}`,
            },
          });
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
    <h2>История заказов</h2>
    <dl class="company-history">
        {history.map((item) => (
        <div key={item.id} className="company-history-item">
            <dt class="company-history-year"><b>{ item.book_name }</b></dt>
        </div>
      ))}
    </dl>
    </div>
  );
};

export default Orders;