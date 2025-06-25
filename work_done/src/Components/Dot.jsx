import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logo from '../assets/logo t4teq.ico';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa';
import './Dot.css';
import { Link } from 'react-router-dom';

function Dot() {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, employeeId } = location.state || {};
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const filterData = (branch) => {
    if (branch === 'All') {
      setFilteredData(allData);
    } else {
      setFilteredData(allData.filter(item => item.branch === branch));
    }
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/registers')
      .then(res => {
        const filtered = res.data.filter(item => 
          !["Admin Kattur", "Admin Puthur", "Admin Thillainagar"].includes(item.name)
        );
        setAllData(filtered);
        setFilteredData(filtered);
      })
      .catch(err => console.error(err));
  }, []);

  const handleCardClick = (employee) => {
    navigate('/dot_view', {
      state: {
        name: employee.name,
        email: employee.email,
        employeeId: employee.employeeId,
        branch: employee.branch
      }
    });
  };

  return (
    <div className="dot-container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav-section shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
                        <img src={Logo} alt="Logo" className="logo-img me-2" />
                    </Link>
          <span className="brand-text h1">T<span>4</span>TEQ Software Solutions</span>
          <div className="welcome">
            <div>Welcome, DOT</div>
            <small>Employee ID: {employeeId}</small>
          </div>
        </div>
      </nav>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {['Kattur', 'Puthur', 'Thillainagar', 'All'].map(branch => (
          <button key={branch} onClick={() => filterData(branch)} className="filter-btn">
            <FaFilter className="icon" /> {branch}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="card-container">
        {filteredData.map((item, index) => (
          <div className="employee-card" key={index} onClick={() => handleCardClick(item)} style={{ cursor: 'pointer' }}>
            <h3>{item.name}</h3>
            <p><strong>Emp.ID:</strong> {item.employeeId}</p>
            <p><strong>Designation:</strong> {item.designation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dot;
