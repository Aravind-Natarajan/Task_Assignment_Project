import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Registration.css';

function Profile() {
  const [form, setForm] = useState({
    name: '',
    employeeId: '',
    branch: '',
    designation: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const nav = useNavigate();

  const validate = () => {
    const err = {};
    if (!form.name) err.name = 'Name is required';
    if (!form.employeeId) err.employeeId = 'Employee ID is required';
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

  const handleRetrieve = async () => {
    if (!form.employeeId) {
      // alert('Please enter Employee ID to retrieve.');
      return;
    }
    try {
      const res = await axios.get(`http://localhost:5000/api/register/${form.employeeId}`);
      setForm({
        ...res.data,
        confirmPassword: res.data.password // set confirmPassword = password
      });
      // alert('Data retrieved successfully!');
    } catch (err) {
      alert('No user found with this Employee ID');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      try {
        const res = await axios.put(`http://localhost:5000/api/register/${form.employeeId}`, form);
        alert(res.data.message || 'Profile updated successfully');
        nav('/');
      } catch (error) {
        alert(error.response?.data?.message || 'Update failed. Try again.');
      }
    }
  };

  return (
    <div className="register-container d-flex">
      <div className="form-wrapper w-100 p-4 d-flex align-items-start justify-content-center">
        <div className="form-box shadow p-4 rounded w-100" style={{ maxWidth: '500px' }}>
          <Link to="/">
            <button className="btn btn-primary mb-3">
              <i className="bi bi-house-door-fill"></i>
            </button>
          </Link>
          <h2 className="text-center mb-4">Profile Update</h2>
          <form onSubmit={handleSubmit}>
            {/* Top row: Employee ID + Retrieve Button */}
            <div className="mb-3 d-flex gap-2">
              <input
                type="text"
                className={`form-control ${errors.employeeId ? 'is-invalid' : ''}`}
                placeholder="Enter Employee ID"
                name="employeeId"
                value={form.employeeId}
                onChange={handleChange}
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleRetrieve}
              >
                Retrieve
              </button>
            </div>
            {errors.employeeId && (
              <div className="invalid-feedback d-block">{errors.employeeId}</div>
            )}

            {/* Rest of the form */}
            {[
              { placeholder: 'Name', name: 'name' },
              { placeholder: 'Branch', name: 'branch' },
              { placeholder: 'Designation', name: 'designation' },
              { placeholder: 'Email', name: 'email', type: 'email' },
              { placeholder: 'Phone Number', name: 'phoneNumber' },
              ,
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
            <div className="mb-3 position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              <i
                className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} position-absolute`}
                style={{ top: '50%', right: '15px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                onClick={() => setShowPassword(!showPassword)}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            {/* Confirm Password Field with Eye Icon */}
            <div className="mb-3 position-relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                placeholder="Confirm Password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <i
                className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'} position-absolute`}
                style={{ top: '50%', right: '15px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
