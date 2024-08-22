import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import NameForm from './NameForm';

function App() {
  const [loading, setLoading] = useState(true); // Loading state to prevent flicker
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/nameform');
    } else {
      navigate('/signup');
    }
    setLoading(false); // Set loading to false after navigation
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message or spinner while determining where to navigate
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/nameform" element={<NameForm />} />
        {/* Default Route */}
        <Route path="/" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
