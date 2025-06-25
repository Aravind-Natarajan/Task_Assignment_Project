import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Add_task() {
  const location = useLocation();
  const { employeeId } = location.state || {};

  const [form, setForm] = useState({
    month: '',
    givenDate: '',
    completedDate: '',
    workDescription: '',
    assignedBy: '',
    status: 'Not Complete',
    employeeId
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    setForm((prev) => ({ ...prev, month: currentMonth }));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const err = {};
    if (!form.month) err.month = 'Month is required';
    if (!form.givenDate) err.givenDate = 'Given Date is required';
    if (!form.completedDate) err.completedDate = 'Completed Date is required';
    if (!form.workDescription) err.workDescription = 'Work Description is required';
    if (!form.assignedBy) err.assignedBy = 'Assigned By is required';
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);

    if (Object.keys(err).length === 0) {
      try {
        const payload = { ...form, employeeId };  // Ensures employeeId is passed correctly
        const res = await axios.post('http://localhost:5000/api/tasks', payload);
        alert(res.data.message || 'Task added successfully');

        setForm({
          month: new Date().toLocaleString('default', { month: 'long' }),
          givenDate: '',
          completedDate: '',
          workDescription: '',
          assignedBy: '',
          status: 'Not Complete',
          employeeId
        });
      } catch (error) {
        alert(error.response?.data?.message || 'Error adding task');
      }
    }
  };

  return (
    <div className="container p-4 bg-white rounded shadow">
      <h3 className="mb-4">Add Task</h3>
      <form onSubmit={handleSubmit}>
        {/* Month */}
        <div className="mb-3">
          <label>Month</label>
          <input
            type="text"
            className={`form-control ${errors.month ? 'is-invalid' : ''}`}
            name="month"
            value={form.month}
            onChange={handleChange}
            readOnly
          />
          {errors.month && <div className="invalid-feedback">{errors.month}</div>}
        </div>

        {/* Given and Completed Dates */}
        <div className="row mb-3">
          <div className="col">
            <label>Given Date</label>
            <input
              type="date"
              className={`form-control ${errors.givenDate ? 'is-invalid' : ''}`}
              name="givenDate"
              value={form.givenDate}
              onChange={handleChange}
            />
            {errors.givenDate && <div className="invalid-feedback">{errors.givenDate}</div>}
          </div>
          <div className="col">
            <label>Completed Date</label>
            <input
              type="date"
              className={`form-control ${errors.completedDate ? 'is-invalid' : ''}`}
              name="completedDate"
              value={form.completedDate}
              onChange={handleChange}
            />
            {errors.completedDate && <div className="invalid-feedback">{errors.completedDate}</div>}
          </div>
        </div>

        {/* Work Description */}
        <div className="mb-3">
          <label>Work Description</label>
          <textarea
            className={`form-control ${errors.workDescription ? 'is-invalid' : ''}`}
            name="workDescription"
            rows="3"
            value={form.workDescription}
            onChange={handleChange}
          ></textarea>
          {errors.workDescription && <div className="invalid-feedback">{errors.workDescription}</div>}
        </div>

        {/* Assigned By */}
        <div className="mb-3">
          <label>Assigned By</label>
          <input
            type="text"
            className={`form-control ${errors.assignedBy ? 'is-invalid' : ''}`}
            name="assignedBy"
            value={form.assignedBy}
            onChange={handleChange}
          />
          {errors.assignedBy && <div className="invalid-feedback">{errors.assignedBy}</div>}
        </div>

        {/* Status - Dropdown (Disabled by default) */}
        <div className="mb-3">
          <label>Status</label>
          <select
            className="form-control"
            name="status"
            value={form.status}
            disabled
          >
            <option value="Not Complete">Not Complete</option>
            <option value="Complete">Complete</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">Submit Task</button>
      </form>
    </div>
  );
}

export default Add_task;
