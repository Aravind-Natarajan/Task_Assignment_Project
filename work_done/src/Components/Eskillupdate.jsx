import React, { useState } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Eskill.css';

function Eskillupdate() {
  const navigate = useNavigate();
  const [employeeIdSearch, setEmployeeIdSearch] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    phoneNumber: '',
    emailId: '',
    skills: [''],
  });

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (name === 'skills') {
      const updatedSkills = [...formData.skills];
      updatedSkills[index] = value;
      setFormData({ ...formData, skills: updatedSkills });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addSkill = () => {
    setFormData({ ...formData, skills: [...formData.skills, ''] });
  };

  const handleRetrieve = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/skill/${employeeIdSearch}`);
      const data = res.data;
      setFormData({
        name: data.name,
        employeeId: data.employeeId,
        phoneNumber: data.phoneNumber,
        emailId: data.emailId,
        skills: data.skills.length > 0 ? data.skills : [''],
      });
      setIsDataLoaded(true);
    } catch (err) {
      console.error('Error fetching data:', err);
      alert('Employee not found!');
      setIsDataLoaded(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const cleanedSkills = formData.skills
      .map(skill => skill.trim().toLowerCase())
      .filter(skill => skill !== '');

    const dataToUpdate = {
      ...formData,
      skills: cleanedSkills,
    };

    try {
      await axios.put(`http://localhost:5000/api/skill/${formData.employeeId}`, dataToUpdate);
      alert('Data updated successfully!');
      setIsDataLoaded(false);
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update data');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/skill/${formData.employeeId}`);
      alert('Data deleted successfully!');
      setFormData({
        name: '',
        employeeId: '',
        phoneNumber: '',
        emailId: '',
        skills: [''],
      });
      setEmployeeIdSearch('');
      setIsDataLoaded(false);
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete data');
    }
  };

  return (
    <div className="eskill-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <h2 className="form-title">Update/Delete Employee Skill</h2>

      <div className="retrieve-row">
        <input
          type="text"
          placeholder="Enter Employee ID"
          value={employeeIdSearch}
          onChange={(e) => setEmployeeIdSearch(e.target.value)}
          className="retrieve-input"
        />
        <button onClick={handleRetrieve} className="retrieve-button">Retrieve</button>
      </div>

      {isDataLoaded && (
        <div className="form-wrapper">
          <form onSubmit={handleUpdate} className="eskill-form">
            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input name="employeeId" placeholder="Employee ID" value={formData.employeeId} onChange={handleChange} readOnly />
            <input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
            <input name="emailId" placeholder="Email ID" value={formData.emailId} onChange={handleChange} required />

            <label>Skills:</label>
            {formData.skills.map((skill, index) => (
              <div key={index} className="skill-input-row">
                <input
                  name="skills"
                  value={skill}
                  placeholder={`Skill ${index + 1}`}
                  onChange={(e) => handleChange(e, index)}
                />
                {index === formData.skills.length - 1 && (
                  <button type="button" className="plus-button" onClick={addSkill}>
                    <FaPlus />
                  </button>
                )}
              </div>
            ))}

            <button type="submit" className="submit-button">Update</button>
            <button type="button" className="submit-button delete-button" onClick={handleDelete}>Delete</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Eskillupdate;
