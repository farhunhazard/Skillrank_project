import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.status === 200 && result.user) {
        // Store user data in localStorage and redirect to NameForm
        localStorage.setItem('user', JSON.stringify(result.user));
        navigate('/nameform');
      } else {
        alert(result.error || 'Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="auth-button">Login</button>
      </form>
    </div>
  );
}

export default Login;
