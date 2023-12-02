import React from 'react';

function BlurHandlerExample() {
  const handleBlur = () => {
    console.log('Input blurred!');
  };

  return (
    <input type="text" onBlur={handleBlur} />
  );
}

export default BlurHandlerExample;
