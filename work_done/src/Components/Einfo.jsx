import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Einfo.css';

function Einfo() {
    const location = useLocation();
    const navigate = useNavigate();
    const title = (location.state?.title || '').toLowerCase();
    const [matchedEmployees, setMatchedEmployees] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/skill'); // assuming it returns all skills
                const filtered = res.data.filter(item =>
                    item.skills?.map(skill => skill.toLowerCase()).includes(title.toLowerCase())
                );
                setMatchedEmployees(filtered);
                console.log(setMatchedEmployees)
            } catch (err) {
                console.error('Error fetching skill data:', err);
            }
        };

        if (title) fetchData();
    }, [title]);

    return (
        <div className="einfo-container">
            <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
            <h2 className="page-title">{title.charAt(0).toUpperCase() + title.slice(1)} - Skilled Employees</h2>

            <div className="card-grid">
                {matchedEmployees.length > 0 ? (
                    matchedEmployees.map((emp, index) => (
                        <div className="employee-card animate-fade" key={index}>
                            <h5>{emp.name}</h5>
                            <p><strong>ID:</strong> {emp.employeeId}</p>
                            <p><strong>Phone:</strong> {emp.phoneNumber}</p>
                            <p><strong>Email:</strong> {emp.emailId}</p>
                            <button
                                className="chat-button"
                                onClick={() => navigate('/chat', {
                                    state: {
                                        toEmail: emp.emailId,
                                        employeeId: emp.employeeId,
                                        employeeName: emp.name
                                    }
                                })}
                            >
                                💬 Chat
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="no-data">No employees found with skill: {title}</p>
                )}
            </div>
        </div>
    );
}

export default Einfo;
