import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';

function App() {
  // State for storing first name and last name
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
  };

  return (
    <div className="App">
      <h1>Name Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name: </label>
          <input 
            type="text" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} 
            placeholder="Enter first name" 
          />
        </div>
        <div>
          <label>Last Name: </label>
          <input 
            type="text" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} 
            placeholder="Enter last name" 
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
