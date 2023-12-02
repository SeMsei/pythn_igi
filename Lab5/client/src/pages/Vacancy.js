import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import './styles/vacancy.css';

const Vacancy = () => {
  const [vacancy, setVacancy] = useState([]);

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        const response = await axios.get('http://localhost:8000/vacancies');
        setVacancy(response.data);
      } catch (error) {
        console.error('Error fetching news:', error.message);
      }
    };

    fetchVacancy();
  }, []);

  return (
    <div>
    <Header/>
    <div className="vacancy-container">
      {vacancy.map((item) => (
        <div key={item.id} className="vacancies">
          <h2 className="vacancy_name">{item.title}</h2>
          <p className="vacancy_description">{item.description}</p>
          <p className="vacancy_salary">{item.salary}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Vacancy;