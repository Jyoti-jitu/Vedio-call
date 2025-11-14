import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AppointmentList.css';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('all'); // all, upcoming, completed, cancelled
  const navigate = useNavigate();

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    const stored = JSON.parse(localStorage.getItem('appointments') || '[]');
    setAppointments(stored);
  };

  const joinCall = (roomId, patientName) => {
    navigate(`/room/${roomId}?name=${encodeURIComponent(patientName)}`);
  };

  const cancelAppointment = (index) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      const updated = [...appointments];
      updated[index].status = 'cancelled';
      localStorage.setItem('appointments', JSON.stringify(updated));
      setAppointments(updated);
    }
  };

  const deleteAppointment = (index) => {
    if (confirm('Are you sure you want to delete this appointment?')) {
      const updated = appointments.filter((_, i) => i !== index);
      localStorage.setItem('appointments', JSON.stringify(updated));
      setAppointments(updated);
    }
  };

  const completeAppointment = (index) => {
    const updated = [...appointments];
    updated[index].status = 'completed';
    localStorage.setItem('appointments', JSON.stringify(updated));
    setAppointments(updated);
  };

  const filteredAppointments = appointments.filter(apt => {
    if (filter === 'all') return true;
    return apt.status === filter;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="appointment-list-container">
      <div className="appointment-list">
        <div className="list-header">
          <h2>Your Appointments</h2>
          <button onClick={() => navigate('/book-appointment')} className="book-new-btn">
            + Book New Appointment
          </button>
        </div>

        <div className="filter-tabs">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            All ({appointments.length})
          </button>
          <button 
            className={filter === 'scheduled' ? 'active' : ''} 
            onClick={() => setFilter('scheduled')}
          >
            Upcoming ({appointments.filter(a => a.status === 'scheduled').length})
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''} 
            onClick={() => setFilter('completed')}
          >
            Completed ({appointments.filter(a => a.status === 'completed').length})
          </button>
          <button 
            className={filter === 'cancelled' ? 'active' : ''} 
            onClick={() => setFilter('cancelled')}
          >
            Cancelled ({appointments.filter(a => a.status === 'cancelled').length})
          </button>
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="no-appointments">
            <div className="empty-state">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <h3>No appointments found</h3>
              <p>Book your first appointment with our doctors</p>
              <button onClick={() => navigate('/book-appointment')} className="book-first-btn">
                Book Appointment
              </button>
            </div>
          </div>
        ) : (
          <div className="appointments-grid">
            {filteredAppointments.map((apt, index) => (
              <div key={index} className={`appointment-card ${apt.status}`}>
                <div className="apt-header">
                  <div className="apt-patient-info">
                    <h3>{apt.patientName}</h3>
                    <span className="apt-email">{apt.email}</span>
                  </div>
                  <span className={`status-badge ${apt.status}`}>
                    {apt.status}
                  </span>
                </div>
                
                <div className="apt-details">
                  <div className="detail-row">
                    <span className="detail-label">Doctor:</span>
                    <span className="detail-value">{apt.doctorName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Specialization:</span>
                    <span className="detail-value">{apt.doctorSpecialization}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Date:</span>
                    <span className="detail-value">{formatDate(apt.appointmentDate)}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Time:</span>
                    <span className="detail-value">{apt.appointmentTime}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{apt.phone}</span>
                  </div>
                  <div className="reason-box">
                    <span className="detail-label">Reason:</span>
                    <p className="reason-text">{apt.reason}</p>
                  </div>
                </div>
                
                <div className="apt-actions">
                  {apt.status === 'scheduled' && (
                    <>
                      <button 
                        onClick={() => joinCall(apt.roomId, apt.patientName)} 
                        className="action-btn join-btn"
                      >
                        📹 Join Call
                      </button>
                      <button 
                        onClick={() => completeAppointment(appointments.indexOf(apt))} 
                        className="action-btn complete-btn"
                      >
                        ✓ Complete
                      </button>
                      <button 
                        onClick={() => cancelAppointment(appointments.indexOf(apt))} 
                        className="action-btn cancel-btn"
                      >
                        ✕ Cancel
                      </button>
                    </>
                  )}
                  {(apt.status === 'completed' || apt.status === 'cancelled') && (
                    <button 
                      onClick={() => deleteAppointment(appointments.indexOf(apt))} 
                      className="action-btn delete-btn"
                    >
                      🗑 Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="back-home">
          <button onClick={() => navigate('/')} className="back-btn">
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentList;
