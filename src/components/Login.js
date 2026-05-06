import { GoogleLogin } from '@react-oauth/google';
import { login } from '../api';
import { Package } from 'lucide-react';

function Login({ onLogin }) {
  const handleSuccess = async (response) => {
    try {
      const res = await login(response.credential);
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      onLogin(res.data.user);
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <Package size={40} color="#3b82f6" style={{ marginBottom: 16 }} />
        <h1>DukanStore</h1>
        <p>Sign in to manage your inventory</p>
        <GoogleLogin onSuccess={handleSuccess} onError={() => alert('Login failed')} />
      </div>
    </div>
  );
}

export default Login;
