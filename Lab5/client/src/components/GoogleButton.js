/*const GoogleButton = () => {
    const handleLogin = () => {
      window.location.href = 'http://localhost:8000/auth/google'; // Используйте относительный путь
    };
  
    return (
      <button onClick={handleLogin}>Log In with Google</button>
    );
  };*/

  const handleLogin = () => {
    window.location.href = 'http://localhost:8000/auth/google'; // Используйте относительный путь
  };

  function GoogleButton() {
    return <button onClick={handleLogin}>Log In with Google</button>;
  }
  
  export default GoogleButton;
  