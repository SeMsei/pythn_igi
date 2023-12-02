import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import './styles/articles.css';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching news:', error.message);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
    <Header/>
    <div className="article-cont">
      {articles.map((item) => (
        <div key={item.id} className="article_list">
          <h3 className="article_list-header">{item.title}</h3>
          <p className="article_list-content">{item.text}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Articles;