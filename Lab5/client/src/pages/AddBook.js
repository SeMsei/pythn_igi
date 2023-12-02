import React from 'react';
import AddBookForm from '../components/AddBookForm';
import { useNavigate } from "react-router-dom";

const AddBookPage = () => {
    const navigate = useNavigate();

  const handleAddBook = (bookData) => {
    console.log('Book added:', bookData);
    
  };

  return (
    <div>
      <AddBookForm />
    </div>
  );
};

export default AddBookPage;