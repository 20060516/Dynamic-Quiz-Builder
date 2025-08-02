import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './pages.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save user data to localStorage
    localStorage.setItem('user', JSON.stringify(formData));

    alert(`Registered as ${formData.name} (${formData.role})`);
    navigate('/login');
  };

  return (
    <div className="home-page">
      <div className="main-container">
        <section className="register-section">
          <div className="section-content small-container">
            <h2>Create a Free Account</h2>
            <form className="form-container" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
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
              <select name="role" value={formData.role} onChange={handleChange} required>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <button type="submit" className="btn-hero">Register</button>
            </form>
            <p className="form-footer">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Register;
