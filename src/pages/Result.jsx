// src/pages/Result.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './pages.css';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  const { quizTitle, total, correct } = state;

  // If missing state, show fallback
  if (typeof correct !== 'number' || typeof total !== 'number') {
    return (
      <div className="container result-box">
        <h2>No Result Found</h2>
        <button className="btn-outline-primary" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container result-box">
      <h2>Quiz Result</h2>
      <h4>{quizTitle || 'Untitled Quiz'}</h4>
      <p>
        You answered <strong>{correct}</strong> out of <strong>{total}</strong> questions correctly.
      </p>
      <div style={{ marginTop: '1rem' }}>
        <button className="btn-primary" onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </button>
        <button className="btn-outline-primary" onClick={() => navigate('/quizzes')}>
          Take Another Quiz
        </button>
      </div>
    </div>
  );
};

export default Result;
