import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Add_task from './Add_task';

function Employee() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, employeeId, branch } = location.state || {};

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filters, setFilters] = useState({ startDate: '', endDate: '', month: '' });
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);


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
  }, [employeeId,tasks]);

  const handleBackClick = () => {
    navigate('/admin', {
      state: { name: `Admin ${branch}`, email, employeeId, branch },
    });
  };

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

  const handleUpdate = (task) => {
    setCurrentTask({ ...task });
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
  

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-outline-secondary" onClick={handleBackClick}>
          &larr; Back
        </button>
        <h4>{name}'s Task Details</h4>
      </div>

      {/* Filter UI */}
      <div className="d-flex justify-content-between gap-3 mb-3 flex-wrap">
        <div className="d-flex gap-3 mb-3 flex-wrap">
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
          <div className="align-self-end">
            <button className="btn btn-success me-2" onClick={applyFilters}>Apply</button>
            <button className="btn btn-secondary" onClick={resetFilters}>Reset</button>
          </div>
        </div>
        <div className="text-end mb-3 align-self-end">
          <button className="btn btn-success me-2" onClick={() => setShowAddModal(true)}>Add Task</button>
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
            filteredTasks.map((task, index) => (
              <tr key={task._id}>
                <td>{index + 1}</td>
                <td>{task.month}</td>
                <td>{task.givenDate}</td>
                <td>{task.completedDate}</td>
                <td>{task.workDescription}</td>
                <td>{task.status}</td>
                <td>{task.assignedBy}</td>
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

      {/* Update Modal */}
      {showModal && currentTask && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Task</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Month</label>
                  <select name="month" value={currentTask.month} onChange={handleModalChange} className="form-control">
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July',
                      'August', 'September', 'October', 'November', 'December'].map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label>Given Date</label>
                  <input type="date" name="givenDate" value={currentTask.givenDate} onChange={handleModalChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label>Completed Date</label>
                  <input type="date" name="completedDate" value={currentTask.completedDate} onChange={handleModalChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label>Work Description</label>
                  <textarea name="workDescription" value={currentTask.workDescription} onChange={handleModalChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label>Assigned By</label>
                  <input type="text" name="assignedBy" value={currentTask.assignedBy} onChange={handleModalChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label>Status</label>
                  <select
                    name="status"
                    value={currentTask.status}
                    onChange={handleModalChange}
                    className="form-control"
                  >
                    <option value="Not Complete">Not Complete</option>
                    <option value="Complete">Complete</option>
                  </select>
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
      {showAddModal && (
  <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add New Task</h5>
          <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
        </div>
        <div className="modal-body">
          <Add_task
            employeeId={employeeId}
            onClose={() => setShowAddModal(false)}
            onTaskAdded={fetchTasks}
          />
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default Employee;
