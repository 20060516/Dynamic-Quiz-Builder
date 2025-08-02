import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const defaultQuizzes = [
  {
    title: 'HTML Basics',
    description: 'Test your fundamental knowledge of HTML.',
    questions: [
      {
        question: 'What does HTML stand for?',
        options: {
          A: 'Hyper Trainer Marking Language',
          B: 'Hyper Text Markup Language',
          C: 'Hyper Text Marketing Language',
          D: 'Hyper Transfer Markup Language',
        },
        correctAnswer: 'B',
      },
      {
        question: 'Which HTML tag is used to define an unordered list?',
        options: {
          A: '<ul>',
          B: '<ol>',
          C: '<li>',
          D: '<list>',
        },
        correctAnswer: 'A',
      },
    ],
  },
  {
    title: 'CSS Basics',
    description: 'Check your CSS styling fundamentals.',
    questions: [
      {
        question: 'Which CSS property controls the text size?',
        options: {
          A: 'font-style',
          B: 'text-size',
          C: 'font-size',
          D: 'text-style',
        },
        correctAnswer: 'C',
      },
      {
        question: 'Which property is used to change the background color?',
        options: {
          A: 'bgcolor',
          B: 'color',
          C: 'background-color',
          D: 'background',
        },
        correctAnswer: 'C',
      },
    ],
  },
  {
    title: 'JavaScript Fundamentals',
    description: 'A quiz on basic JavaScript concepts.',
    questions: [
      {
        question: 'Which keyword is used to declare a constant in JavaScript?',
        options: {
          A: 'let',
          B: 'var',
          C: 'const',
          D: 'static',
        },
        correctAnswer: 'C',
      },
      {
        question: 'What is the output of: console.log(typeof [])',
        options: {
          A: 'object',
          B: 'array',
          C: 'list',
          D: 'undefined',
        },
        correctAnswer: 'A',
      },
    ],
  },
];

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState(defaultQuizzes);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://dynamic-quiz-builder.onrender.com/api/quiz/all')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setQuizzes(data);
        }
      })
      .catch((err) => console.error('Error fetching quizzes:', err));
  }, []);

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers({ ...answers, [questionIndex]: answer });
  };

  const submitQuiz = () => {
    let correct = 0;
    selectedQuiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        correct++;
      }
    });
    setScore(correct);
    setSubmitted(true);

    setTimeout(() => {
      navigate('/result', {
        state: {
          quizTitle: selectedQuiz.title,
          total: selectedQuiz.questions.length,
          correct: correct,
        },
      });
    }, 1500);
  };

  if (selectedQuiz) {
    return (
      <div className="container">
        <h2>{selectedQuiz.title}</h2>
        <p>{selectedQuiz.description}</p>

        {selectedQuiz.questions.map((question, index) => (
          <div key={index} className="quiz-question">
            <h4>
              {index + 1}. {question.question}
            </h4>
            <div className="quiz-options">
              {['A', 'B', 'C', 'D'].map((optionKey) => (
                <label key={optionKey}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={optionKey}
                    onChange={() => handleAnswerChange(index, optionKey)}
                    disabled={submitted}
                  />
                  {optionKey}: {question.options[optionKey]}
                </label>
              ))}
            </div>
          </div>
        ))}

        {!submitted ? (
          <button className="btn-primary" onClick={submitQuiz}>
            Submit Quiz
          </button>
        ) : (
          <div className="result">
            🎉 You scored {score} out of {selectedQuiz.questions.length}
          </div>
        )}

        <br />
        <button
          className="btn-outline-primary"
          onClick={() => {
            setSelectedQuiz(null);
            setAnswers({});
            setSubmitted(false);
            setScore(0);
          }}
        >
          Back to All Quizzes
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Available Quizzes</h2>
      {quizzes.length === 0 ? (
        <p>No quizzes available. Please check back later.</p>
      ) : (
        quizzes.map((quiz, idx) => (
          <div
            key={idx}
            className="card"
            style={{
              marginBottom: '1rem',
              padding: '1rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
          >
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
            <button className="btn-primary" onClick={() => setSelectedQuiz(quiz)}>
              Take Quiz
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Quizzes;
