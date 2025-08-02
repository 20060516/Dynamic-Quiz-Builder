// src/pages/ManageQuizzes.jsx
import React, { useEffect, useState } from 'react';
import './pages.css';

const ManageQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  const fetchQuizzes = async () => {
    const res = await fetch('https://dynamic-quiz-builder.onrender.com/api/quiz/all');
    const data = await res.json();
    setQuizzes(data);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const deleteQuiz = async (id) => {
    const confirm = window.confirm('Are you sure?');
    if (!confirm) return;

    await fetch(`https://dynamic-quiz-builder.onrender.com/api/quiz/${id}`, {
      method: 'DELETE',
    });

    fetchQuizzes();
  };

  return (
    <div className="container">
      <h2>Manage Quizzes</h2>
      {quizzes.map((quiz) => (
        <div key={quiz._id} className="quiz-item">
          <span>{quiz.title}</span>
          <button className="button delete" onClick={() => deleteQuiz(quiz._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ManageQuizzes;
