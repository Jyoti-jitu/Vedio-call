import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const [input,setInput] = useState("");
const navigate = useNavigate();
    const submitHandler = () =>{
        navigate(`/room/${input}`)

    }
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Doctor Appointment System</h1>
        <p className="home-subtitle">Schedule appointments and connect with doctors via video call</p>
        
        <div className="quick-join-section">
          <h2>Quick Join Video Call</h2>
          <div className="join-input-group">
            <input 
              value={input} 
              onChange={(e)=>setInput(e.target.value)}
              type='text' 
              placeholder='Enter Room ID...'
              className="join-input"
            />
            <button onClick={submitHandler} className="join-button">Join Room</button>
          </div>
        </div>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="appointment-actions">
          <button 
            onClick={() => navigate('/book-appointment')} 
            className="action-card book-card"
          >
            <span className="card-icon">📅</span>
            <h3>Book Appointment</h3>
            <p>Schedule a new appointment with our doctors</p>
          </button>

          <button 
            onClick={() => navigate('/appointments')} 
            className="action-card view-card"
          >
            <span className="card-icon">📋</span>
            <h3>View Appointments</h3>
            <p>See your scheduled and past appointments</p>
          </button>
        </div>

        <div className="features">
          <div className="feature-item">
            <span className="feature-icon">🎥</span>
            <span>HD Video Calls</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🔒</span>
            <span>Secure & Private</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⏰</span>
            <span>Easy Scheduling</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
