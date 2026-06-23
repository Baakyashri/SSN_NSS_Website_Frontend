import React, { useEffect, useState } from 'react';
import { API_BASE } from '../../utils/api';
import { getAuthHeaders } from '../../utils/auth';

const AnnouncementsTab = ({ selectedAction }) => {
  const [announcementsList, setAnnouncementsList] = useState([]);
  const [formData, setFormData] = useState({
    ActivityName: '',
    ActivityDescription: '',
    oldName: '',
    newName: '',
    newText: '',
    deleteName: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch(`${API_BASE}/announcements/get-announcements`, {
        headers: getAuthHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        setAnnouncementsList(data || []);
      }
    } catch (err) {
      console.error('Error fetching announcements:', err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, [selectedAction]);

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    if (!formData.ActivityName || !formData.ActivityDescription) {
      alert("Please enter title and description");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/announcements/add-announcement`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ActivityName: formData.ActivityName,
          ActivityDescription: formData.ActivityDescription
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message);
      alert(data.message || 'Announcement added successfully');
      setFormData(prev => ({ ...prev, ActivityName: '', ActivityDescription: '' }));
      fetchAnnouncements();
    } catch (err) {
      alert('Add error: ' + err.message);
    }
  };

  const handleUpdateAnnouncement = async (e) => {
    e.preventDefault();
    if (!formData.oldName || !formData.newName || !formData.newText) {
      alert("Please select an announcement and fill out all fields");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/announcements/update-announcement`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          oldName: formData.oldName,
          newName: formData.newName,
          newText: formData.newText
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message);
      alert(data.message || 'Announcement updated successfully');
      setFormData(prev => ({ ...prev, oldName: '', newName: '', newText: '' }));
      fetchAnnouncements();
    } catch (err) {
      alert('Update error: ' + err.message);
    }
  };

  const handleDeleteAnnouncement = async (e) => {
    e.preventDefault();
    if (!formData.deleteName) {
      alert("Please select an announcement to delete");
      return;
    }
    if (!window.confirm(`Delete announcement "${formData.deleteName}"?`)) {
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/announcements/delete-announcement`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          Activity: formData.deleteName
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message);
      alert(data.message || 'Announcement deleted successfully');
      setFormData(prev => ({ ...prev, deleteName: '' }));
      fetchAnnouncements();
    } catch (err) {
      alert('Delete error: ' + err.message);
    }
  };

  switch (selectedAction) {
    case 'add':
      return (
        <form className="form-card" onSubmit={handleAddAnnouncement}>
          <h3>Add Announcement</h3>
          <input
            name="ActivityName"
            type="text"
            placeholder="Announcement Title"
            value={formData.ActivityName}
            onChange={handleChange}
            required
          />
          <textarea
            name="ActivityDescription"
            placeholder="Announcement Description"
            value={formData.ActivityDescription}
            onChange={handleChange}
            required
          />
          <button type="submit">Add</button>
        </form>
      );

    case 'update':
      return (
        <form className="form-card" onSubmit={handleUpdateAnnouncement}>
          <h3>Update Announcement</h3>
          <label>Select Announcement to Update:</label>
          <select
            name="oldName"
            value={formData.oldName}
            onChange={(e) => {
              const selected = announcementsList.find(ann => ann.activityName === e.target.value);
              setFormData(prev => ({
                ...prev,
                oldName: e.target.value,
                newName: selected ? selected.activityName : '',
                newText: selected ? selected.activityDescription : ''
              }));
            }}
            required
          >
            <option value="">-- Select Announcement --</option>
            {announcementsList.map((ann) => (
              <option key={ann._id} value={ann.activityName}>
                {ann.activityName}
              </option>
            ))}
          </select>

          {formData.oldName && (
            <>
              <input
                name="newName"
                type="text"
                placeholder="New Announcement Title"
                value={formData.newName}
                onChange={handleChange}
                required
              />
              <textarea
                name="newText"
                placeholder="New Announcement Description"
                value={formData.newText}
                onChange={handleChange}
                required
              />
              <button type="submit">Update</button>
            </>
          )}
        </form>
      );

    case 'delete':
      return (
        <form className="form-card" onSubmit={handleDeleteAnnouncement}>
          <h3>Delete Announcement</h3>
          <label>Select Announcement to Delete:</label>
          <select
            name="deleteName"
            value={formData.deleteName}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Announcement --</option>
            {announcementsList.map((ann) => (
              <option key={ann._id} value={ann.activityName}>
                {ann.activityName}
              </option>
            ))}
          </select>
          <button type="submit" style={{ backgroundColor: '#dc3545', color: '#fff' }}>Delete</button>
        </form>
      );

    case 'view':
      return (
        <div className="form-card">
          <h3>Announcements List</h3>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {announcementsList.length > 0 ? (
                announcementsList.map((ann) => (
                  <tr key={ann._id}>
                    <td>{ann.activityName}</td>
                    <td>{ann.activityDescription}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No announcements found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      );

    default:
      return <p className="placeholder-text">Select an action to proceed.</p>;
  }
};

export default AnnouncementsTab;
