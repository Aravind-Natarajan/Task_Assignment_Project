import React, { useState } from 'react';
import './Registration.css'; 
import regimg from '../assets/T4TEQ_LOGO.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterForm() {
  const [form, setForm] = useState({
    name: '',
    employeeId: '', // ✅ Added
    branch: '',
    designation: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({}); 
  const nav = useNavigate();

  const validate = () => {
    const err = {};
    if (!form.name) err.name = 'Name is required';
    if (!form.employeeId) err.employeeId = 'Employee ID is required'; // ✅ Added
    if (!form.branch) err.branch = 'Branch is required';
    if (!form.designation) err.designation = 'Designation is required';
    if (!/\S+@\S+\.\S+/.test(form.email)) err.email = 'Invalid email';
    if (!/^\d{10}$/.test(form.phoneNumber)) err.phoneNumber = 'Phone must be 10 digits';
    if (form.password.length < 6) err.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) err.confirmPassword = 'Passwords do not match';
    return err;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      try {
        const res = await axios.post('http://localhost:5000/api/register', form);
        alert(res.data.message);
        nav('/');
        setForm({
          name: '',
          employeeId: '', // ✅ Clear this too
          branch: '',
          designation: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: ''
        });
      } catch (error) {
        alert(error.response?.data?.message || 'Error registering. Try again.');
      }
    }
  };

  return (
    <div className="register-container d-flex">
      <div className="left-image d-none d-md-block w-100">
        <img src={regimg} alt="side" className="img-fluid h-100 w-100" />
      </div>
      <div className="form-wrapper w-100 w-md-50 p-4 d-flex align-items-start justify-content-center">
        <div className="form-box shadow p-4 rounded w-100" style={{ maxWidth: '500px' }}>
          <Link to="/"><button className='btn btn-primary'><i className="bi bi-house-door-fill"></i></button></Link>
          <h2 className="text-center mb-4">Signup</h2>
          <form onSubmit={handleSubmit}>
            {[
              { placeholder: 'Name', name: 'name' },
              { placeholder: 'Employee ID', name: 'employeeId' }, // ✅ Inserted after name
              { placeholder: 'Branch', name: 'branch' },
              { placeholder: 'Designation', name: 'designation' },
              { placeholder: 'Email', name: 'email', type: 'email' },
              { placeholder: 'Phone Number', name: 'phoneNumber' },
              { placeholder: 'Password', name: 'password', type: 'password' },
              { placeholder: 'Confirm Password', name: 'confirmPassword', type: 'password' },
            ].map(({ placeholder, name, type = 'text' }) => (
              <div className="mb-3" key={name}>
                <input
                  type={type}
                  className={`form-control ${errors[name] ? 'is-invalid' : ''}`}
                  placeholder={placeholder}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                />
                {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
              </div>
            ))}
            <button type="submit" className="btn btn-primary w-100">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
