import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import './Login.css';
import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (!form.email || !form.password) {
    return setError('Email and password are required');
  }

  try {
    const res = await axios.post('http://localhost:5000/api/login', form);
    alert(res.data.message);

    const { name, employeeId, email, branch } = res.data.user;

    // Admin redirection
    const adminEmails = [
      "adminkattur@gmail.com",
      "adminputhur@gmail.com",
      "adminthillainagar@gmail.com"
    ];

    //Project Manager redirection
    const pmEmails = [
      "dmkattur@gmail.com",
      "dmputhur@gmail.com",
      "dmthillainagar@gmail.com"
    ];

    if (adminEmails.includes(email)) {
      navigate('/admin', { state: { name, employeeId, branch } });
    }else if (pmEmails.includes(email)) {
      navigate('/project_manager', { state: { name, employeeId, branch } });
    }else if (email === "kishore.offmail@gmail.com") {
      navigate('/dot', { state: { name, employeeId, branch } });
    } else {
      navigate('/user', { state: { name, employeeId,branch } });
    }

  } catch (err) {
    setError(err.response?.data?.message || 'Login failed. Please try again.');
  }
};


  return (
    <div className="login-container d-flex align-items-center justify-content-center vh-100">
      <div className="login-box p-4 shadow rounded bg-white" style={{ maxWidth: '400px', width: '100%' }}>
        <button className="btn btn btn-primary text-start mb-2" onClick={() => navigate('/')}>
          <i className="bi bi-house-door-fill"></i>
        </button>
        <h3 className="text-center mb-4">Login</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-3"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control mb-3"
            value={form.password}
            onChange={handleChange}
          />
          <button className="btn btn-primary w-100" type="submit">Login</button>
        </form>

        <div className="mt-3 text-center">
          Don’t have an account? <Link to="/register">Signup</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
