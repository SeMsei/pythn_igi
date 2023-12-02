// RegisterForm.js
import React, { useState } from 'react';
import './styles/register.css';

const RegisterForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+/i.test(email)) {
      errors.email = 'Invalid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (!name) {
      errors.fullName = 'Name is required';
    }

    const phone_regex = new RegExp('\\(?\\+375\\)? ?-?[0-9]{2} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})?');

    if (!phone) {
        errors.fullName = 'phone is required';
    } else if (!phone_regex.test(phone)) {
        errors.fullName = 'Invalid phone number';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await onSubmit(email, password, name, phone);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data);
      } else {
        console.error('Error during registration:', error.message);
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          {errors.phone && <p className="error-message">{errors.phone}</p>}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;