import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './pages.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('User');
  const [quizCount, setQuizCount] = useState(0);
  const [avgScore, setAvgScore] = useState(0);

  const fetchStats = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.id) return;

      const res = await fetch(`https://dynamic-quiz-builder.onrender.com/api/user/stats/${user.id}`);
      const data = await res.json();

      setQuizCount(data.quizAttempts || 0);
      setAvgScore(data.averageScore || 0);
    } catch (err) {
      console.error('Failed to fetch user stats:', err);
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user')) || { name: 'User' };
    setUsername(userData.name || 'User');
    fetchStats();
  }, []);

  useEffect(() => {
    if (location.state?.quizCompleted) {
      fetchStats(); 
    }
  }, [location.state]);

  const handleTakeQuiz = () => {
    navigate('/Quizzes');
  };

  const handleViewResults = () => {
    navigate('/Result');
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome back, {username}! 🎉</h1>

      <div className="stats-section">
        <div className="card">
          <h2>{quizCount}</h2>
          <p>Quizzes Taken</p>
        </div>
        <div className="card">
          <h2>{avgScore.toFixed(2)}%</h2>
          <p>Average Score</p>
        </div>
      </div>

      <div className="actions-section">
        <button onClick={handleTakeQuiz}>📝 Take New Quiz</button>
        <button onClick={handleViewResults}>📊 View My Results</button>
      </div>
    </div>
  );
};

export default Dashboard;
