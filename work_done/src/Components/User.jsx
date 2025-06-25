import React from 'react';
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import '../Components/user.css'
function UserPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, employeeId } = location.state || {};

  return (
    <div className="container mt-4">
      {/* Top Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          <i className="bi bi-house-door-fill"></i>
        </button>
        <div className="text-end">
          <h2 className="fw-bold">Welcome, {name || "T4TEQ"}</h2>
          <p className="text-muted mb-0">Employee ID : {employeeId || "T4TEQ"}</p>
        </div>
      </div>

      {/* Dashboard Navigation */}
      <div className="d-flex dashboard-container" style={{ height: '80vh', overflow: 'hidden' }}>
        {/* Sidebar */}
        <div className="sidebar p-3 bg-light border-end" style={{ width: '220px' }}>
          <h4 className="mb-4">Menu</h4>
          <Link
            to="/user/tasks"
            state={{ name,employeeId }}
            className="btn btn-outline-secondary w-100 mb-2"
          >
            Tasks
          </Link>
          <Link
            to="/user/add-task"
            state={{ name,employeeId }}
            className="btn btn-outline-secondary w-100"
          >
            Add Task
          </Link>
        </div>

        {/* Main Content */}
        <div
          className="main-content p-4 overflow-auto flex-grow-1 fade-in"
          style={{ backgroundColor: '#f8f9fa', borderRadius: '0 10px 10px 0' }}
        >
          <Outlet />
        </div>
      </div>


    </div>
  );
}

export default UserPage;
