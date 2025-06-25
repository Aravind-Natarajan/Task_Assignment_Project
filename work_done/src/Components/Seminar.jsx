import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Seminar() {
  const location = useLocation();
  const { employeeId } = location.state || {};

  const [form, setForm] = useState({
    month: '',
    givenDate: '',
    completedDate: '',
    workDescription: '',
    assignedBy: 'DOT',
    status: 'Not Complete',
    employeeId,
    trainerId: ''
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
    if (!form.trainerId) err.trainerId = 'Trainer ID is required';
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);

    if (Object.keys(err).length === 0) {
      const baseTask = {
        month: form.month,
        givenDate: form.givenDate,
        completedDate: form.completedDate,
        workDescription: form.workDescription,
        assignedBy: form.assignedBy,
        status: form.status
      };

      try {
        // Variant 1: for employeeId
        await axios.post('http://localhost:5000/api/tasks', {
          ...baseTask,
          employeeId: form.employeeId
        });

        // Variant 2: for trainerId
        await axios.post('http://localhost:5000/api/tasks', {
          ...baseTask,
          employeeId: form.trainerId
        });

        alert('Task added for both Employee and Trainer successfully');

        setForm({
          month: new Date().toLocaleString('default', { month: 'long' }),
          givenDate: '',
          completedDate: '',
          workDescription: '',
          assignedBy: 'DOT',
          status: 'Not Complete',
          employeeId,
          trainerId: ''
        });

      } catch (error) {
        alert(error.response?.data?.message || 'Error adding task');
      }
    }
  };

  return (
    <div className="container p-4 bg-white rounded shadow">
      <h3 className="mb-4">Seminar Task Assignment</h3>
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

        {/* Dates */}
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

        {/* Status - Enabled */}
        <div className="mb-3">
          <label>Status</label>
          <select
            className="form-control"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Not Complete">Not Complete</option>
            <option value="Complete">Complete</option>
          </select>
        </div>

        {/* Trainer ID */}
        <div className="mb-3">
          <label>Trainer ID</label>
          <input
            type="text"
            className={`form-control ${errors.trainerId ? 'is-invalid' : ''}`}
            name="trainerId"
            value={form.trainerId}
            onChange={handleChange}
          />
          {errors.trainerId && <div className="invalid-feedback">{errors.trainerId}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100">Submit Task</button>
      </form>
    </div>
  );
}

export default Seminar;
