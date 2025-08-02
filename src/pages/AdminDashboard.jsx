    import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import './pages.css';

    const AdminDashboard = () => {
      const navigate = useNavigate();

      return (
        <div className="container mt-5 text-center">
          <h2 className="mb-4">Admin Dashboard</h2>

          <div className="d-flex flex-column align-items-center gap-4">
            <button
              className="btn btn-primary w-50"
              onClick={() => navigate('/create-quiz')}
            >
              ➕ Create New Quiz
            </button>

            <button
              className="btn btn-outline-primary w-50"
              onClick={() => navigate('/manage-quizzes')}
            >
              📋 Manage Quizzes
            </button>
          </div>
        </div>
      );
    };

    export default AdminDashboard;
