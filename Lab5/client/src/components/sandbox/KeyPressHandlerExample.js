import React from 'react';

function KeyPressHandlerExample() {
  const handleKeyPress = (event) => {
    console.log('Key pressed:', event.key);
  };

  return (
    <input type="text" onKeyPress={handleKeyPress} />
  );
}

export default KeyPressHandlerExample;
