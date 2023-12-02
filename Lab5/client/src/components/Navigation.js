import React from 'react';
import { Link } from 'react-router-dom';
import './styles/navigation.css';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/articles">Articles</Link>
        </li>
        <li>
          <Link to="/vacancies">Vacancies</Link>
        </li>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/sandbox">Sandbox</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;