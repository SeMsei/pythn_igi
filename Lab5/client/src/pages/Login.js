// Login.js
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import './styles/login.css';

const Login = ({ onLogin, setLoggedInUser }) => {
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const handleLogin = async (email, password) => {
    console.log(email, password);
    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        email,
        password,
      });
      console.log(response);
      localStorage.setItem('token', response.data);
      console.log('Login successful', response.data);
      onLogin(response.data);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error.message);

      if (error.response) {
        console.log(error.response);
        if (error.response.status === 404) {
          setError('User not found');
        } else if (error.response.status === 400) {
          setError('Invalid login or password');
        } else {
          setError('Error logging in');
        }
      } else if (error.request) {
        setError('Request error');
      } else {
        setError('Unknown error');
      }
    }
  };

  return (
    <div className="login-container">
    <LoginForm onSubmit={handleLogin} />
    {error && <p className="error-message">{error}</p>}
  </div>
  );
};

export default Login;