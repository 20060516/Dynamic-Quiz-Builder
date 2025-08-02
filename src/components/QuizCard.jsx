import React from 'react';

const QuizCard = ({ quiz, onStart }) => {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title">{quiz.title}</h5>
        <p className="card-text">{quiz.description}</p>
        <p className="text-muted">Questions: {quiz.questions.length}</p>
        <button className="btn btn-primary" onClick={() => onStart(quiz)}>Start Quiz</button>
      </div>
    </div>
  );
};

export default QuizCard;
