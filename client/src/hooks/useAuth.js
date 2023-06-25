import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (token, username) => {
    setIsLoggedIn(true);
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setUsername(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername('');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUsername = localStorage.getItem('username');
    if (token && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
    }
  }, []);

  return {
    isLoggedIn,
    username,
    handleLogin,
    handleLogout,
  };
};

export default useAuth;
