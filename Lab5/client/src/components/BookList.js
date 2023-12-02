import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/bookList.css'; 
import { Helmet } from 'react-helmet';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedGenreId, setSelectedGenreId] = useState('');
    const [find, setFind] = useState('')
  
    useEffect(() => {
      const fetchData = async () => {
        console.log('msg', localStorage.getItem('msg'));
        try {
          let url = 'http://localhost:8000/books';
  
          /*if (selectedGenre) {
            url += `?carcassType=${selectedGenre}`;
          }*/
  
          if (sortOption) {
            //url += `${selectedCarcassType ? '&' : '?'}sort=${sortOption}`;
            url += `?sort=${sortOption}`;
          }

          console.log(selectedGenre);
          if (selectedGenre != null && selectedGenre != 'All' && selectedGenre != '') {
            if (sortOption) {
              url += `&filterGenre=${selectedGenre}`;
            } else {
              url += `?filterGenre=${selectedGenre}`;
            }
          }

          if (find != null && find != '') {
            if (sortOption || (selectedGenre != null && selectedGenre != 'All' && selectedGenre != '')) {
              url += `&find=${find}`;
            } else {
              url += `?find=${find}`;
            }
          }

          console.log(url);
  
          const response = await axios.get(url);
          console.log(response);
          setBooks(response.data);
        } catch (error) {
          console.error('Error fetching books:', error.message);
        }
      };
  
      const fetchGenres = async () => {
        try {
          const response = await axios.get('http://localhost:8000/genres');
          setGenres(response.data);
        } catch (error) {
          console.error('Error fetching genres:', error.message);
        }
      };
  
      fetchData();
      fetchGenres();    
      console.log(1234567890);
    }, [sortOption, selectedGenre, find]);
  
    const handleSortChange = (newSortOption) => {
      setSortOption(newSortOption);
    };
  
    const handleGenreChange = (event) => {
        //setSelectedGenre(event.target.value);
        var index = event.nativeEvent.target.selectedIndex;
        setSelectedGenre(event.nativeEvent.target[index].text);
        setSelectedGenreId(event.target.value);
    };

    const handleFindChange = (event) => {
        setFind(event.target.value);
    }
  
    return (
      <div className="container">
        <div className="sort-buttons">
          <button onClick={() => handleSortChange('asc')}>Sort by Price (Asc)</button>
          <button onClick={() => handleSortChange('desc')}>Sort by Price (Desc)</button>
          <select id="genreSelect" onChange={handleGenreChange} value={selectedGenreId}>
            <option value="">All</option>
            {genres.map((genre) => (
              <option className='select-dropdown__list-item' key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
          <input type="text" onChange={handleFindChange}/>
        </div>
        <div className="listBookCenter">
        <ul className="book-list">
          {books.map((book) => (
            <li key={book.id} className="book-item">
              <img src={`${book.imgUrl}`} alt={`${book.title} ${book.summary}`} className="book-image" />
              <Link to={`/books/${book.id}`} className="book-link">
                <p className="book-details">{book.title} {book.summary}</p>
              </Link>
              <p className="book-cost">Cost: {book.cost}$</p>
            </li>
          ))}
        </ul>
        </div>
      </div>
      
    );
  };
  
  export default BookList;