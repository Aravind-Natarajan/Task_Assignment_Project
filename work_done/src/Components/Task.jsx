import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function Task() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filters, setFilters] = useState({ startDate: '', endDate: '', month: '' });
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { employeeId } = location.state || {};

   const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', {
        params: { employeeId },
      });
      setTasks(res.data);
      setFilteredTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [employeeId]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`);
        alert('Task deleted successfully');
        fetchTasks();
      } catch (err) {
        alert('Error deleting task');
      }
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    let result = tasks;

    if (filters.month) {
      result = result.filter(task => task.month === filters.month);
    }

    if (filters.startDate) {
      result = result.filter(task => new Date(task.givenDate) >= new Date(filters.startDate));
    }

    if (filters.endDate) {
      result = result.filter(task => new Date(task.givenDate) <= new Date(filters.endDate));
    }

    setFilteredTasks(result);
  };

  const resetFilters = () => {
    setFilters({ startDate: '', endDate: '', month: '' });
    setFilteredTasks(tasks);
  };

  const handleUpdate = (task) => {
    setCurrentTask({ ...task }); // Clone to allow editing
    setShowModal(true);
  };

  const handleModalChange = (e) => {
    setCurrentTask({ ...currentTask, [e.target.name]: e.target.value });
  };

  const handleModalUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${currentTask._id}`, currentTask);
      alert('Task updated successfully');
      setShowModal(false);
      fetchTasks();
    } catch (err) {
      alert('Error updating task');
    }
  };

  return (
    <div className="container mt-4">
      {/* Filters */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>My Tasks</h3>
        <div className="d-flex gap-2 align-items-end">
          {/* Filter Controls */}
          <div>
            <label>Start Date</label>
            <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} className="form-control" />
          </div>
          <div>
            <label>End Date</label>
            <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} className="form-control" />
          </div>
          <div>
            <label>Month</label>
            <select name="month" value={filters.month} onChange={handleFilterChange} className="form-control">
              <option value="">All</option>
              {['January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'].map(m => (
                  <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <button onClick={applyFilters} className="btn btn-success">Apply</button>
          <button onClick={resetFilters} className="btn btn-secondary">Reset</button>
        </div>
      </div>

      {/* Task Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Month</th>
            <th>Given Date</th>
            <th>Completed Date</th>
            <th>Work Description</th>
            <th>Assigned By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length ? (
            filteredTasks.map((task,index) => (
              <tr key={task._id}>
                <td>{index+1}</td>
                <td>{task.month}</td>
                <td>{task.givenDate}</td>
                <td>{task.completedDate}</td>
                <td>{task.workDescription}</td>
                <td>{task.assignedBy}</td>
                <td>{task.status}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => handleUpdate(task)}>Update</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(task._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="8" className="text-center">No tasks found</td></tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(5px)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Task</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Month</label>
                  <select name="month" value={currentTask.month} onChange={handleModalChange} className="form-control">
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July',
                      'August', 'September', 'October', 'November', 'December'].map(m => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Given Date</label>
                  <input type="date" name="givenDate" value={currentTask.givenDate} onChange={handleModalChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Completed Date</label>
                  <input type="date" name="completedDate" value={currentTask.completedDate} onChange={handleModalChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Work Description</label>
                  <textarea name="workDescription" value={currentTask.workDescription} onChange={handleModalChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Assigned By</label>
                  <input type="text" name="assignedBy" value={currentTask.assignedBy} onChange={handleModalChange} className="form-control" />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                <button className="btn btn-primary" onClick={handleModalUpdate}>Update</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Task;
