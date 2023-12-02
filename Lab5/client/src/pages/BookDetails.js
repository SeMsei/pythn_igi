import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './styles/bookDetails.css';

const BookDetails = ({ loggedInUser }) => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [author, setAuthor] = useState(null);
  const [genre, setGenre] = useState(null);
  const navigate = useNavigate();

  //const history = useHistory();

  useEffect(() => {
    const fetchBookDetails = async () => {
    const token = localStorage.getItem('token');
  
      try {
        const response = await axios.get(`http://localhost:8000/books/${id}`);
        setBook(response.data);

            const authorId = response.data.author_id;
            const authorResponse = await axios.get(`http://localhost:8000/authors/${authorId}`);
            setAuthor(authorResponse.data.name);

            const genreId = response.data.genre_id;

            if (genreId) {
              const carcassTypeResponse = await axios.get(`http://localhost:8000/genres/${genreId}`);
              setGenre(carcassTypeResponse.data.name);
            }
        } catch (error) {
          console.error('Error fetching book details:', error.message);
        }


      };
  

    fetchBookDetails();
  }, [id,]);


  const handleDeleteBook = async () => {
    try {
      const token = localStorage.getItem('token');
      const resp = await axios.delete(`http://localhost:8000/books/${id}`, {
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZm9taWNoZXZzaml5QGdtYWlsLmNvbSIsInBob25lIjoiKzM3NTEyMzQ1Njc4OSIsInJvbGUiOiJBZG1pbiIsInBhc3N3b3JkIjoiJDJiJDEwJEdJcEJIYU54ZXN0VlEwY0xsRG4vRS5tYUpBZTEzTVlCR2ZuZm9vRGEuNEtuR3BjUVhpNWhHIiwibmFtZSI6IlNlTXNlaSIsImlkIjo0fSwiaWF0IjoxNzAxMzcyMDQ1LCJleHAiOjE3MDQ5NzIwNDV9.TyRe0fjBUD33uXVm575VNo-wBrXwBasliEDjmbhYGPY`
        },
      });
      console.log(resp);
      navigate("/");
      //history.push('/');

    } catch (error) {
      console.error('Error deleting car:', error.message);
    }
  };

  const handleOrder = async () => {
    console.log(book.title);
            const token = localStorage.getItem('token');
            console.log('Token: ', token);
            const title = book.title;
            await axios.post(`http://localhost:8000/orders`, {
              headers: {
                Authorization: `${token}`,
              },
              title
            })
  }

  if (!book) {
    return <p>Loading...</p>;
  }
  const isAuthor = loggedInUser && author === loggedInUser.fullName;
  
  return (

    <div><Header />
    <div className="containerr">
      
      <img className="book-imagee" alt='' src={`${book.imgUrl}`} />
      <p className="book-detailsss">Name: {book.title}</p>
      <p className="book-detailsss">Summary: {book.summary}</p>
      <p className="book-detailsss">Genres: {genre || 'Unknown'}</p>
      <p className="book-detailsss">Cost: {book.cost}</p>
      <p className="book-detailsss">Author: {author || 'Unknown'}</p>
  

      
      
      {loggedInUser && (
        <button className="book-detailss" onClick={handleDeleteBook}>Delete Book</button>
      )}
      {loggedInUser && (
        <Link to={`/edit-book/${id}`}>
          <button className="book-detailss">Edit Book</button>
        </Link>
      )}
      {loggedInUser && (
          <button className="book-detailss" onClick ={handleOrder}>Order Book</button>
      )}
    </div>
    </div>
  );
};

export default BookDetails;