import React from 'react';

function FocusHandlerExample() {
  const handleFocus = () => {
    console.log('Input focused!');
  };

  return (
    <input type="text" onFocus={handleFocus} />
  );
}

export default FocusHandlerExample;
