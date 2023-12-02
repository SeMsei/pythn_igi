import React from 'react';

function MouseOverHandlerExample() {
  const handleMouseOver = () => {
    console.log('Mouse over element!');
  };

  return (
    <div onMouseOver={handleMouseOver}>Hover over me</div>
  );
}

export default MouseOverHandlerExample;
