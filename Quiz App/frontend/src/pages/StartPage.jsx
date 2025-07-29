import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api/quiz';
const StartPage = ({ setEmail, startQuiz }) => {
  const [inputEmail, setInputEmail] = useState('');
const [loading, setLoading] = useState(false);

const handleStart = async () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(inputEmail)) {
    toast.error('Please enter a valid email address.');
    return;
  }

  setLoading(true);
  try {
    await axios.post(`${BASE_URL}/save-email`, { email: inputEmail });
    setEmail(inputEmail);
    startQuiz();
  } catch (error) {
    toast.error(error.response?.data?.error || 'An Error Occurred.');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="card shadow-sm p-4 text-center">
      <h3 className="fw-light mb-4">
        <i className="bi bi-controller text-primary"></i> Welcome to the Quiz
      </h3>
      <p className="text-muted">Enter your email to begin.</p>
      <div className="input-group">
        <span className="input-group-text">
          <i className="bi bi-envelope"></i>
        </span>
        <input
          type="email"
          placeholder="your.email@example.com"
          value={inputEmail}
          className="form-control"
          onChange={(e) => setInputEmail(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && handleStart()}
        />
        <button className="btn btn-primary" onClick={handleStart} disabled={loading}>
      {loading ? 'Loading...' : 'Start Quiz'} <i className="bi bi-arrow-right-short"></i>
    </button>

      </div>
    </div>
  );
};

export default StartPage;