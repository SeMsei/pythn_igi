import React, { useState, useEffect } from 'react';
import './styles/apiimage.css'

const ApiImage = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch('https://random.imagecdn.app/v1/image?width=500&height=150&format=json');
        const data = await response.json();
        if (data && data.url) {
            setImageUrl(data.url);
        } else {
          console.error('Invalid dog image data');
        }
      } catch (error) {
        console.error('Error fetching dog image:', error.message);
      }
    };

    fetchImage();
  }, []);

  return (
    <div className='container'>
      <div className='container-image'>
      {imageUrl && <img id='api-image' height={150} src={imageUrl} alt="Random" />}
      </div>
    </div>
  );
};

export default ApiImage;