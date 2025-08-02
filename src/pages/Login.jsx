import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './pages.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (
      storedUser &&
      storedUser.email === formData.email &&
      storedUser.password === formData.password
    ) {
      alert('Login successful!');
      localStorage.setItem('loggedInUser', JSON.stringify(storedUser));

      // Route based on role (without changing any route names)
      if (storedUser.role === 'admin') {
        navigate('/admin'); // AdminDashboard
      } else {
        navigate('/dashboard'); // User side dashboard (quizzes, take-quiz, result)
      }
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="home-page">
      <div className="main-container">
        <section className="login-section">
          <div className="section-content small-container">
            <h2>Login to Quiz Builder</h2>
            <form className="form-container" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit" className="btn-hero">Login</button>
            </form>
            <p className="form-footer">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
