import React, { useState } from 'react';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      firstName: firstName,
      lastName: lastName
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/add_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
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