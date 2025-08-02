// src/pages/TakeQuiz.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css';

const TakeQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://dynamic-quiz-builder.onrender.com/api/quiz/all')
      .then(res => res.json())
      .then(data => setQuizzes(data))
      .catch(() => alert('Error loading quizzes'));
  }, []);

  const handleAnswer = (questionIndex, answer) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  const handleSubmit = () => {
    let correct = 0;
    selectedQuiz.questions.forEach((q, i) => {
      if (answers[i]?.toLowerCase() === q.correctAnswer.toLowerCase()) correct++;
    });

    // Navigate to result page with score
    navigate('/result', {
      state: {
        score: correct,
        total: selectedQuiz.questions.length,
        title: selectedQuiz.title
      }
    });
  };

  return (
    <div className="container">
      <h2>Take a Quiz</h2>
      {!selectedQuiz ? (
        <div className="quiz-list">
          {quizzes.map((quiz) => (
            <button key={quiz._id} onClick={() => setSelectedQuiz(quiz)} className="button">
              {quiz.title}
            </button>
          ))}
        </div>
      ) : (
        <div className="quiz-box">
          <h3>{selectedQuiz.title}</h3>
          {selectedQuiz.questions.map((q, i) => (
            <div key={i} className="question-block">
              <p>{q.question}</p>
              {q.options.map((opt, j) => (
                <label key={j}>
                  <input
                    type="radio"
                    name={`q-${i}`}
                    value={opt}
                    onChange={() => handleAnswer(i, opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          ))}
          <button onClick={handleSubmit} className="button submit">Submit</button>
        </div>
      )}
    </div>
  );
};

export default TakeQuiz;
