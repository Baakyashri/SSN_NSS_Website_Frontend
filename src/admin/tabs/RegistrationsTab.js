import React, { useEffect, useState } from 'react';
import { API_BASE } from '../../utils/api';
import { getAuthHeaders } from '../../utils/auth';

const RegistrationsTab = ({ selectedAction }) => {
  const [registrations, setRegistrations] = useState([]);
  const [registrationForm, setRegistrationForm] = useState({
    user_id: '',
    activity_id: '',
    status: 'registered'
  });
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);

  // Fetch users and activities when selectedAction is 'add'
  useEffect(() => {
    if (selectedAction === 'add') {
      fetch(`${API_BASE}/user/get-users`, {
        headers: getAuthHeaders()
      })
        .then((res) => res.json())
        .then((data) => {
          setUsers(data || []);
        })
        .catch(console.error);

      fetch(`${API_BASE}/activities/get-activities`, {
        headers: getAuthHeaders()
      })
        .then((res) => res.json())
        .then((data) => setActivities(data || []))
        .catch(console.error);
    }
  }, [selectedAction]);

  // Fetch registrations when selectedAction is 'view'
  useEffect(() => {
    if (selectedAction === 'view') {
      fetch(`${API_BASE}/registrations/get-registrations`, {
        headers: getAuthHeaders()
      })
        .then((res) => res.json())
        .then((data) => {
          setRegistrations(data || []);
        })
        .catch((err) => {
          console.error('Error fetching registrations', err);
        });
    }
  }, [selectedAction]);

  const createRegistration = async () => {
    try {
      if (!registrationForm.user_id || !registrationForm.activity_id) {
        alert('Please select user and activity');
        return;
      }

      const res = await fetch(
        `${API_BASE}/registrations/create-registration`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(registrationForm)
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Registration failed');
        return;
      }

      alert('Registration created successfully');

      setRegistrationForm({
        user_id: '',
        activity_id: '',
        status: 'registered'
      });
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  const updateRegistration = async (registrationId, status) => {
    try {
      const res = await fetch(
        `${API_BASE}/registrations/update-registration/${registrationId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status })
        }
      );

      if (res.ok) {
        setRegistrations((prev) =>
          prev.map((reg) =>
            reg._id === registrationId
              ? { ...reg, status }
              : reg
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteRegistration = async (registrationId) => {
    if (!window.confirm('Delete this registration?')) {
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE}/registrations/delete-registration/${registrationId}`,
        {
          method: 'DELETE'
        }
      );

      if (res.ok) {
        setRegistrations((prev) =>
          prev.filter((reg) => reg._id !== registrationId)
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  switch (selectedAction) {
    case 'view':
      return (
        <div>
          <h3>All Registrations</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>User Email</th>
                <th>Activity</th>
                <th>Status</th>
                <th>Registered At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {registrations.length > 0 ? (
                registrations.map((reg) => (
                  <tr key={reg._id}>
                    <td>{reg.user_email}</td>
                    <td>{reg.activity_title}</td>
                    <td>{reg.status}</td>
                    <td>
                      {reg.registered_at
                        ? new Date(reg.registered_at).toLocaleString()
                        : '-'}
                    </td>
                    <td>
                      <button onClick={() => updateRegistration(reg._id, 'attended')}>
                        Mark Attended
                      </button>
                      <button onClick={() => deleteRegistration(reg._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No registrations found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      );

    case 'add':
      return (
        <div className="form-card">
          <h3>Create Registration</h3>

          {/* User Dropdown */}
          <select
            value={registrationForm.user_id}
            onChange={(e) =>
              setRegistrationForm((prev) => ({
                ...prev,
                user_id: e.target.value
              }))
            }
          >
            <option value="">-- Select User --</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.email}
              </option>
            ))}
          </select>

          {/* Activity Dropdown */}
          <select
            value={registrationForm.activity_id}
            onChange={(e) =>
              setRegistrationForm((prev) => ({
                ...prev,
                activity_id: e.target.value
              }))
            }
          >
            <option value="">-- Select Activity --</option>
            {activities.map((activity) => (
              <option key={activity._id} value={activity._id}>
                {activity.title}
              </option>
            ))}
          </select>

          <button onClick={createRegistration}>
            Create Registration
          </button>
        </div>
      );

    default:
      return <p className="placeholder-text">Select an action to proceed.</p>;
  }
};

export default RegistrationsTab;
