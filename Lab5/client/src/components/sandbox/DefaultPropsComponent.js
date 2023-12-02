import React from 'react';

const DefaultPropsComponent = (props) => {
  // Используем значение из props, если оно передано, или значение по умолчанию
  const { text = 'Значение по умолчанию' } = props;

  return (
    <div>
      <p>{text}</p>
    </div>
  );
};

export default DefaultPropsComponent;
