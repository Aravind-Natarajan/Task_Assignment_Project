import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ChatForm.css'; // Styling file

function ChatForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const { toEmail, employeeName } = location.state || {};

    const [formData, setFormData] = useState({
        to: toEmail || '',
        subject: '',
        text: ''
    });

    const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'error'

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/send-email', formData);
            setStatus('success');
            setFormData({ to: toEmail, subject: '', text: '' });

            setTimeout(() => {
                setStatus('idle');
                navigate(-1);
            }, 2500);
        } catch (error) {
            console.error('Failed to send email:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 2500);
        }
    };

    return (
        <div className="chat-form-container">
            <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

            {status === 'success' && (
                <div className="status-circle success">
                    <div className="icon">&#10003;</div>
                    <p>Send Successfully</p>
                </div>
            )}

            {status === 'error' && (
                <div className="status-circle error">
                    <div className="icon">&#10060;</div>
                    <p>Failed to Send</p>
                </div>
            )}

            {status === 'idle' && (
                <form onSubmit={handleSubmit} className="chat-form mt-5">
                    <h2>Send Message to {employeeName}</h2>

                    <label>To:</label>
                    <input type="email" name="to" value={formData.to} readOnly />

                    <label>Enter your Name:</label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />

                    <label>Enter your Query:</label>
                    <textarea
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Send</button>
                </form>
            )}
        </div>
    );
}

export default ChatForm;
