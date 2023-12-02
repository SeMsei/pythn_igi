//import logo from './logo.svg';
//import './App.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import EditBook from './pages/EditBook'
import AddBook from './pages/AddBook'
import Login from './pages/Login'
import Register from './pages/Register'
import axios from 'axios';
import GoogleCallback from './pages/GoogleCallback'
import Articles from './pages/Articles'
import Vacancy from './pages/Vacancy';
import History from './pages/History'
import Sandbox from './pages/Sandbox'
import Orders from './pages/Orders';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(localStorage.getItem('token'), 'tokentoken');
    if (token) {
      axios.post('http://localhost:8000/auth/auth', {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then(response => {
        console.log(response);
        setUser(response.data);
        setLoggedInUser(response.data);
      })
      .catch(error => {
        console.error('Token verification error:', error.message, token);
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedInUser(null);
    window.location.reload();
  };

  const handleLogin = (user) => {
    console.log(user, ' :user');
    setLoggedInUser(user);
  }

  return (
    <Router>
      <Routes>
        {/*<Route path="/login">
          {loggedInUser ? <Redirect to="/" /> : <Login onLogin={(user) => setLoggedInUser(user)} />}
        </Route>
        
    

        

        
        
        <Route path = "/news" component = {News}/>
        <Route path = "/faq" component = {FAQ}/>*/}
        <Route path='/articles' element={<Articles/>}/>
        <Route path='/vacancies' element={<Vacancy/>}/>
        <Route path='/history' element={<History/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/sandbox' element={<Sandbox/>}/>
        <Route path="/login" element={loggedInUser ? <Navigate to="/" /> : <Login onLogin={(user) => {setLoggedInUser(user); console.log(loggedInUser,' jaba');}} />}/>
        <Route path="/register" element={loggedInUser ? <Navigate to="/" /> : <Register onRegister={(user) => {setLoggedInUser(user); console.log(loggedInUser);}} />}/>
        <Route path ="google-callback" onEnter={() => {console.log('xui')}} element={<GoogleCallback onLogin={handleLogin}/>}/>
        <Route exact path="/add-book" element = {<AddBook/>} />
        <Route exact path="/" element={<Home loggedInUser={!!loggedInUser} onLogout={handleLogout} />}/>
        <Route exact path="/edit-book/:id" element = {<EditBook/>} />
        <Route path="/books/:id" element={<BookDetails loggedInUser={!!loggedInUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
