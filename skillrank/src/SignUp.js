import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.status === 201) {
        // Store user data in localStorage and redirect to NameForm
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/nameform');
      } else {
        alert(result.error || 'Sign up failed.');
      }
    } catch (error) {
      console.error('Sign Up Error:', error);
      alert('An error occurred during sign up.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp} className="auth-form">
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="auth-button">Sign Up</button>
      </form>
      <p>Already registered? <button onClick={() => navigate('/login')} className="link-button">Login</button></p>
    </div>
  );
}

export default SignUp;
