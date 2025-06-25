import React, { useState } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Eskill.css'; 

function Eskill() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    phoneNumber: '',
    emailId: '',
    skills: [''],
  });

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

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Clean up skills: remove empty strings and convert to lowercase
  const cleanedSkills = formData.skills
    .map(skill => skill.trim().toLowerCase())
    .filter(skill => skill !== '');

  const dataToSend = {
    ...formData,
    skills: cleanedSkills,
  };

  try {
    await axios.post('http://localhost:5000/api/skill', dataToSend);
    alert('Data saved successfully');
    setFormData({
      name: '',
      employeeId: '',
      phoneNumber: '',
      emailId: '',
      skills: [''],
    });
  } catch (error) {
    console.error('Error saving data', error);
    alert('Failed to save data');
  }
};



  return (
    <div className="eskill-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <h2 className="form-title">Add Employee Skill</h2>
      <div className="form-wrapper">
        
        <form onSubmit={handleSubmit} className="eskill-form">
          <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input name="employeeId" placeholder="Employee ID" value={formData.employeeId} onChange={handleChange} required />
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

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Eskill;
