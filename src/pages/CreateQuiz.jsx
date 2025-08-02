// src/pages/CreateQuiz.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css';

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctAnswer: '' }
  ]);

  const navigate = useNavigate();

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    if (field === 'question') updated[index].question = value;
    else if (field.startsWith('option')) {
      const optionIndex = parseInt(field.slice(-1));
      updated[index].options[optionIndex] = value;
    } else if (field === 'correctAnswer') {
      updated[index].correctAnswer = value;
    }
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleSubmit = async () => {
    const quizData = { title: quizTitle, questions };
    try {
      const res = await fetch('https://dynamic-quiz-builder.onrender.com/api/quiz/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData),
      });

      if (res.ok) {
        alert('Quiz created successfully!');
        setQuizTitle('');
        setQuestions([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
        navigate('/quizzes');
      } else {
        const error = await res.json();
        alert(`Failed: ${error.message}`);
      }
    } catch (err) {
      alert('Error connecting to server.');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Create Quiz</h2>
      
      <input
        style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #ccc' }}
        placeholder="Quiz Title"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
      />

      {questions.map((q, idx) => (
        <div key={idx} style={{ marginBottom: '25px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <input
            style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder="Question"
            value={q.question}
            onChange={(e) => handleQuestionChange(idx, 'question', e.target.value)}
          />
          {q.options.map((opt, i) => (
            <input
              key={i}
              style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => handleQuestionChange(idx, `option${i}`, e.target.value)}
            />
          ))}
          <input
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder="Correct Answer"
            value={q.correctAnswer}
            onChange={(e) => handleQuestionChange(idx, 'correctAnswer', e.target.value)}
          />
        </div>
      ))}

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={addQuestion}
          style={{ padding: '10px 20px', backgroundColor: '#6c63ff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          + Add Question
        </button>
        <button
          onClick={handleSubmit}
          style={{ padding: '10px 20px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
};

export default CreateQuiz;
