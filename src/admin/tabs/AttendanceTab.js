import React, { useEffect, useState } from 'react';
import { API_BASE } from '../../utils/api';
import { getAuthHeaders } from '../../utils/auth';
import './styles/AttendanceTab.css';

const AttendanceTab = ({ selectedAction }) => {

  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    fetchAttendanceSummary();
  }, []);

  const fetchAttendanceSummary = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/attendance/user-summary`,
        {
          headers: getAuthHeaders()
        }
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setAttendanceData(data);
      }

    } catch (err) {
      console.error(err);
    }
  };

  const viewUserAttendance = async (userId) => {
    try {

      const res = await fetch(
        `${API_BASE}/attendance/user/${userId}`,
        {
          headers: getAuthHeaders()
        }
      );

      const data = await res.json();

      setSelectedUser(userId);
      setUserDetails(data);

    } catch (err) {
      console.error(err);
    }
  };

  const closeModal = () => {
    setUserDetails(null);
    setSelectedUser(null);
  };

  useEffect(() => {
    if (userDetails) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [userDetails]);

  return (
    <div className="attendance-container">

      <h2>Attendance Summary</h2>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Activities Attended</th>
            <th>Total Hours</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {attendanceData.length > 0 ? (
            attendanceData.map((user) => (
              <tr key={user.user_id}>
                <td>{user.email}</td>
                <td>{user.activities_attended}</td>
                <td>{user.total_hours}</td>

                <td>
                  <button
                    onClick={() =>
                      viewUserAttendance(user.user_id)
                    }
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">
                No attendance data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {userDetails && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Attendance Details</h3>
              <button className="close-btn" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>
                <strong>Email:</strong> {userDetails.email}
              </p>
              <p>
                <strong>Total Hours:</strong> {userDetails.total_hours}
              </p>
              <p>
                <strong>Activities Attended:</strong> {userDetails.activities_attended}
              </p>
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Activity</th>
                    <th>Date</th>
                    <th>Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {userDetails.activities?.map((activity) => (
                    <tr key={activity.activity_id}>
                      <td>{activity.title}</td>
                      <td>{activity.date}</td>
                      <td>{activity.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AttendanceTab;