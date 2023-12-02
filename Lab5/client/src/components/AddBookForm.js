import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const AddBookForm = () => {
    const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    ISBN: '',
    cost: 0,
    imgUrl: '',
    genre_id: 0, 
    author_id: 0
  });
  const [genres, setGenres] = useState([]); 
  const [authors, setAuthors] = useState([]); 
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      try {
       /* const bookResponse = await axios.get(`http://localhost:8000/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });*/

        //const genreResponse = await axios.get(`http://localhost:8000/genres/${bookResponse.data.genre_id}`);
        const genresResponse = await axios.get(`http://localhost:8000/genres`);
        const authorsResponse = await axios.get(`http://localhost:8000/authors`);

        /*setFormData({
            /*brand: carResponse.data.brand,
            model: carResponse.data.model,
            cost: carResponse.data.cost.toString(),
            description: carResponse.data.description,
            yearOfPublication: carResponse.data.yearOfPublication.toString(),
            carUrl: carResponse.data.carUrl,
            carcassType: carResponse.data.carcassType._id,
            title: bookResponse.data.title,
            summary: bookResponse.data.summary,
            ISBN: bookResponse.data.ISBN,
            cost: bookResponse.data.cost,
            imgUrl: bookResponse.data.imgUrl,
            genre_id: bookResponse.data.genre_id, 
            author_id: bookResponse.data.author_id
        });*/

        setGenres(genresResponse.data);
        setAuthors(authorsResponse.data);
      } catch (error) {
        console.error('Error fetching car details:', error.message);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (e.target.files)
    {    const file = e.target.files[0];

        if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64Image = reader.result;
            console.log(base64Image);
            setFormData((prevData) => ({
            ...prevData,
            imgUrl: base64Image,
            }));
        };

        reader.readAsDataURL(file);
        }}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      console.log(formData);
      await axios.post(`http://localhost:8000/books`, formData, {
        headers: {
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiZm9taWNoZXZzaml5QGdtYWlsLmNvbSIsInBob25lIjoiKzM3NTEyMzQ1Njc4OSIsInJvbGUiOiJBZG1pbiIsInBhc3N3b3JkIjoiJDJiJDEwJEdJcEJIYU54ZXN0VlEwY0xsRG4vRS5tYUpBZTEzTVlCR2ZuZm9vRGEuNEtuR3BjUVhpNWhHIiwibmFtZSI6IlNlTXNlaSIsImlkIjo0fSwiaWF0IjoxNzAxMzcyMDQ1LCJleHAiOjE3MDQ5NzIwNDV9.TyRe0fjBUD33uXVm575VNo-wBrXwBasliEDjmbhYGPY`,
        },
      });

      navigate(`/`);
    } catch (error) {
      console.error('Error addiing book:', error.message);
      console.log(error.response);

      if (error.response && error.response.data) {
        setFormError(error.response.data);
      } else {
        setFormError('Error adding book. Please try again.');
      }
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label className="form-label">
        Title:
        <input
          className="form-input"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>

      <label className="form-label">
        Summary:
        <input
          className="form-input"
          type="text"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
        />
      </label>

      <label className="form-label">
        Cost:
        <input
          className="form-input"
          type="number"
          name="cost"
          value={formData.cost}
          onChange={handleChange}
        />
      </label>

      <label className="form-label">
        ISBN:
        <input
          className="form-textarea"
          type="number"
          name="ISBN"
          value={formData.ISBN}
          onChange={handleChange}
        />
      </label>

      <label className="form-label">
        Book Image:
        <input className="form-input" type="file" name="imgUrl" accept="image/*" onChange={handleChange} />
        {/*}input
          className="form-input"
          type="text"
          name="imgUrl"
          value={formData.carUrl}
          onChange={handleChange}
  />*/}
      </label>

      <label className="form-label">
        Genre:
        <select
          className="form-select"
          name="genre_id"
          value={formData.genre_id}
          onChange={handleChange}
        >
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </label>

      <label className="form-label">
        Author:
        <select
          className="form-select"
          name="author_id"
          value={formData.author_id}
          onChange={handleChange}
        >
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </label>

      <button className="form-button" type="submit">
        Create Book
      </button>

      {formError && <p className="form-error">{formError}</p>}
    </form>
  );
};

export default AddBookForm;