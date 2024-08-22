import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NameForm() {
  const navigate = useNavigate();

  // Retrieve user data from localStorage
  const user = localStorage.getItem('user');

  useEffect(() => {
    if (!user) {
      // Redirect to login if no user data is found in localStorage
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Prevent rendering if user data is not present
  }

  let parsedUser;
  try {
    parsedUser = JSON.parse(user);
  } catch (error) {
    console.error("Failed to parse user data:", error);
    localStorage.removeItem('user'); // Clean up corrupted data
    navigate('/login');
    return null;
  }

  return (
    <div className="auth-container">
      <h2>Name Form</h2>
      <div className="form-group">
        <label>First Name:</label>
        <p>{parsedUser.firstName}</p>
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <p>{parsedUser.lastName}</p>
      </div>
      <button onClick={() => {
        localStorage.removeItem('user');
        navigate('/login'); // Redirect to login page after logout
      }} className="auth-button">Logout</button>
    </div>
  );
}

export default NameForm;
