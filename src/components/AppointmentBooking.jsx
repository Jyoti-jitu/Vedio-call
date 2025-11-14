import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AppointmentBooking.css';

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    doctorId: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: ''
  });

  const [doctors] = useState([
    { id: 1, name: 'Dr. Smith', specialization: 'Cardiology', available: true },
    { id: 2, name: 'Dr. Johnson', specialization: 'Dermatology', available: true },
    { id: 3, name: 'Dr. Williams', specialization: 'Pediatrics', available: true },
    { id: 4, name: 'Dr. Brown', specialization: 'Orthopedics', available: true },
    { id: 5, name: 'Dr. Davis', specialization: 'Neurology', available: true }
  ]);

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate unique room ID for video call
    const roomId = `appointment-${Date.now()}-${formData.doctorId}`;
    
    // Find selected doctor
    const selectedDoctor = doctors.find(d => d.id === parseInt(formData.doctorId));
    
    const appointment = {
      ...formData,
      doctorName: selectedDoctor?.name || 'Unknown',
      doctorSpecialization: selectedDoctor?.specialization || 'N/A',
      roomId,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };

    // Store in localStorage (replace with backend API)
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    alert('Appointment scheduled successfully!');
    
    // Reset form
    setFormData({
      patientName: '',
      email: '',
      phone: '',
      doctorId: '',
      appointmentDate: '',
      appointmentTime: '',
      reason: ''
    });

    // Navigate to appointments list
    navigate('/appointments');
  };

  return (
    <div className="appointment-container">
      <div className="appointment-booking">
        <h2>Schedule Doctor Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Patient Name *</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+1 (555) 000-0000"
              required
            />
          </div>

          <div className="form-group">
            <label>Select Doctor *</label>
            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleInputChange}
              required
            >
              <option value="">Choose a doctor</option>
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Appointment Date *</label>
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label>Time Slot *</label>
              <select
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleInputChange}
                required
              >
                <option value="">Select time</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Reason for Visit *</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              rows="4"
              placeholder="Describe your symptoms or reason for consultation..."
              required
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/')} className="cancel-btn-form">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentBooking;
