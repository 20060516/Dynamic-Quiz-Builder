import React from 'react';
import { Link } from 'react-router-dom';
import './pages.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="section-content">
          <h1>Welcome to Quiz Builder</h1>
          <p>Create and manage interactive quizzes easily.</p>
          <div className="hero-buttons">
            <Link to="/register" className="btn-hero">Get Started</Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-content">
          <h2>Key Features</h2>
          <ul className="features-list">
            <li>🧠 Easy quiz creation</li>
            <li>📊 Instant results</li>
            <li>🛡️ Role-based login</li>
            <li>⏰ Timed questions</li>
          </ul>
        </div>
      </section>

      <section className="how-it-works">
        <div className="section-content">
          <h2>How It Works</h2>
          <ol>
            <li>Register as Admin or User</li>
            <li>Admin creates quizzes</li>
            <li>User takes quizzes</li>
            <li>Get instant score</li>
          </ol>
        </div>
      </section>

      <footer className="home-footer">
        <p>© {new Date().getFullYear()} Quiz Builder</p>
      </footer>
    </div>
  );
};

export default Home;
