// Header.js

import React, { useState, useEffect } from 'react';
import AuthButtons from '../components/AuthButtons';
import TimeZoneInfo from '../components/TimeZone';
import Navigation from '../components/Navigation';
import axios from 'axios';
import './styles/userZone.css';

const Header = ({logout}) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('token in header: ', token);
    if (token) {
      axios.post('http://localhost:8000/auth/auth', {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(response => {
        setUser(response.data);
        setLoggedInUser(response.data);
      })
      .catch(error => {
        console.error('Token verification error:', error.message, token);
      });
    }
  }, []);

  const handleLogout = () => {
    console.log('asdasd');
    localStorage.removeItem('token');
    setLoggedInUser(null);
    window.location.reload();
  };

  return (
    <div className="header">
      <div className="containerheader">
          <div className="upperCont1">
            <Navigation />
          </div>
          <div className="upperCont2">
          <div className="upperCont21">
            <TimeZoneInfo />
          </div>
        <div className="upperCont22">
        <div className="user-greeting">
          {(loggedInUser ) && <p>Welcome, {loggedInUser?.name}!</p>}
          {!(loggedInUser ) && <p>Please, sing up or sing in</p>}
        </div>
        <AuthButtons isAuthenticated={!!loggedInUser} onLogout={handleLogout} onParentLogout={logout} />
      </div>
      </div>
      </div>
    </div>
  );
};

export default Header;