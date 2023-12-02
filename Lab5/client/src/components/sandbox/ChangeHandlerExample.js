import React, { useState } from 'react';

function ChangeHandlerExample() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
    <h1>{inputValue}</h1>
    <input type="text" value={inputValue} onChange={handleChange} />
    </div>
  );
}

export default ChangeHandlerExample;
