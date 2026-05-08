import { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CurrencyProvider } from './CurrencyContext';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Inventory from './components/Inventory';
import './App.css';

function App() {
  const [user, setUser] = useState(localStorage.getItem('access_token') ? JSON.parse(localStorage.getItem('user') || '{}') : null);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setShowLogin(false);
  };

  if (user) {
    return (
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <CurrencyProvider>
          <Inventory user={user} onLogout={handleLogout} />
        </CurrencyProvider>
      </GoogleOAuthProvider>
    );
  }

  if (showLogin) {
    return (
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Login onLogin={handleLogin} />
      </GoogleOAuthProvider>
    );
  }

  return <LandingPage onGetStarted={() => setShowLogin(true)} />;
}

export default App;
