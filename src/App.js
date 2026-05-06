import { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CurrencyProvider } from './CurrencyContext';
import Login from './components/Login';
import Inventory from './components/Inventory';
import './App.css';

function App() {
  const [user, setUser] = useState(localStorage.getItem('access_token') ? JSON.parse(localStorage.getItem('user') || '{}') : null);

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <CurrencyProvider>
        {user ? <Inventory user={user} onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}
      </CurrencyProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
