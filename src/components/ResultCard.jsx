import React from 'react';

const ResultCard = ({ result, onRetry }) => {
  return (
    <div className="card text-center shadow-sm p-4">
      <h3 className="text-success">Quiz Completed</h3>
      <p className="fs-5">Your Score: <strong>{result.score}</strong> / {result.total}</p>
      <p>Correct Answers: {result.correct}</p>
      <p>Wrong Answers: {result.wrong}</p>
      <button className="btn btn-warning mt-2" onClick={onRetry}>Retry Quiz</button>
    </div>
  );
};

export default ResultCard;
