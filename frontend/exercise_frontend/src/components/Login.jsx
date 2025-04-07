// src/components/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', { 
        username, 
        password 
      });
      
      const { access: accessToken, refresh: refreshToken } = response.data;
      
      // AuthContext'e hem access hem de refresh token'i gönder
      login(accessToken, refreshToken);
      
      navigate('/calendar');
    } catch (err) {
      setError('Invalid username or password');
      console.error('Login error:', err);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '16px' }}>Login</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} 
          />
          <button 
            type="submit" 
            style={{ padding: '10px', borderRadius: '8px', backgroundColor: '#4f46e5', color: '#fff', border: 'none' }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;