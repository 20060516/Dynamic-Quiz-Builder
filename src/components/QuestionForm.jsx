import React, { useState } from 'react';

const QuestionForm = ({ onSave }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [answerIndex, setAnswerIndex] = useState(null);

  const handleOptionChange = (value, index) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question || answerIndex === null || options.some(opt => opt === '')) {
      alert("Please fill all fields correctly.");
      return;
    }

    const newQuestion = {
      question,
      options,
      correctAnswer: options[answerIndex],
    };

    onSave(newQuestion);
    setQuestion('');
    setOptions(['', '', '', '']);
    setAnswerIndex(null);
  };

  return (
    <div className="card p-4 shadow-sm">
      <h4>Add a New Question</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Question</label>
          <input
            type="text"
            className="form-control"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>

        {options.map((opt, index) => (
          <div className="mb-3" key={index}>
            <label className="form-label">Option {index + 1}</label>
            <input
              type="text"
              className="form-control"
              value={opt}
              onChange={(e) => handleOptionChange(e.target.value, index)}
              required
            />
          </div>
        ))}

        <div className="mb-3">
          <label className="form-label">Correct Answer</label>
          <select
            className="form-select"
            value={answerIndex ?? ''}
            onChange={(e) => setAnswerIndex(parseInt(e.target.value))}
            required
          >
            <option value="" disabled>Select correct option</option>
            {options.map((_, idx) => (
              <option key={idx} value={idx}>Option {idx + 1}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-success">Add Question</button>
      </form>
    </div>
  );
};

export default QuestionForm;
