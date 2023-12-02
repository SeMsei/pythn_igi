import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import AuthButtons from '../components/AuthButtons';
import BookList from '../components/BookList';
import axios from 'axios';
import ApiJoke from '../components/ApiJoke';
import ApiImage from '../components/ApiImage';
//import TimeZoneInfo from '../components/TimeZoneInfo';
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';

import './styles/utils.css';

const Home = ({ loggedInUser, onLogout }) => {
  console.log(loggedInUser, "jaba2");
  const location = useLocation();
  return (
    <div>
      <Header logout={onLogout}/>

     <BookList />
     <div className='container'>
     {loggedInUser && <Link to="/add-book" className="add-book-link">Add Book</Link>}
     </div>

     <ApiJoke/>
      <ApiImage/>
    </div>
  );
};

export default Home;