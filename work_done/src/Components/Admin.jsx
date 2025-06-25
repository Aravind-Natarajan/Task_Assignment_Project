import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css'; // Make sure to style the card layout here

function Admin() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, employeeId, branch } = location.state || {};
  const [users, setUsers] = useState([]);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning,');
    else if (hour < 17) setGreeting('Good Afternoon,');
    else if (hour < 21) setGreeting('Good Evening,');
    else setGreeting('Good Night,');
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/registers');
        const filtered = res.data.filter(user =>
          user.branch === branch &&
          !["Admin Kattur", "Admin Puthur", "Admin Thillainagar"].includes(user.name)
        );
        setUsers(filtered);
      } catch (err) {
        console.error('Error fetching users', err);
      }
    };

    fetchUsers();
  }, [branch]);

  const getWelcomeName = () => {
    switch (name) {
      case 'Admin Kattur':
        return 'Mr.Shafic Ahamed';
      case 'Admin Puthur':
        return 'Ms.Jayapriya';
      case 'Admin Thillainagar':
        return 'Ms.Dharshini';
      default:
        return '';
    }
  };

  const handleUserClick = (name, email, employeeId, branch) => {
    navigate('/employee', { state: { name, email, employeeId, branch } });
  };

  return (
    <div className="admin-container container mt-4">
      
      {/* Header Bar */}
      <div className="top-bar d-flex justify-content-between align-items-center px-3 py-2 bg-light rounded shadow-sm">
        <button className="btn btn-outline-primary btn-md" onClick={() => navigate('/')}>
          <i className="bi bi-house-door-fill"></i>
        </button>
        <div className="text-end">
          <div className="greeting-text">{greeting}</div>
          <div className="welcome-text fw-bold">
            <h3>{getWelcomeName()}</h3>
          </div>
        </div>
      </div>
      <div className='m-2 text-center'>
        <h3>{branch} Branch</h3>
      </div>
      {/* Users Card Grid */}
      <div className="row mt-4">
        {users.map((user, index) => (
          <div key={user._id} className="col-md-4 mb-4">
            <div
              className="user-card card gradient-card text-white shadow-lg h-100"
              onClick={() => handleUserClick(user.name,user.email,user.employeeId,user.branch)}
              style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title"><strong>Name :</strong> {user.name}</h5>
                <p className="card-text mb-0"><strong>Emp.ID :</strong> {user.employeeId}</p>
                <p className="card-text"><strong>designation :</strong> {user.designation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
