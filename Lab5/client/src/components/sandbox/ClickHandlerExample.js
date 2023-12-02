import React from 'react';

function ClickHandlerExample() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <button onClick={handleClick}>Click me</button>
  );
}

export default ClickHandlerExample;
