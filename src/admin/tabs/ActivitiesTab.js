import React, { useEffect, useState } from 'react';
import { API_BASE } from '../../utils/api';
import { getAuthHeaders, getAuthHeadersForFormData, isAuthenticated, logout } from '../../utils/auth';

const ActivitiesTab = ({
  selectedAction,
  formData,
  setFormData,
  handleChange,
  handleReportUpload
}) => {
  const [activitiesList, setActivitiesList] = useState([]);

  // Fetch activities when selectedAction is 'view'
  useEffect(() => {
    if (!isAuthenticated()) return;
    if (selectedAction === 'view') {
      fetch(`${API_BASE}/activities/get-activities`, {
        headers: getAuthHeaders()
      })
        .then((res) => {
          if (res.status === 401) {
            logout();
            return [];
          }
          return res.json();
        })
        .then((data) => setActivitiesList(data || []))
        .catch((err) => console.error("Fetch activities error:", err));
    }
  }, [selectedAction]);

  switch (selectedAction) {
    case 'add':
      return (
        <form
          className="form-card"
          onSubmit={async (e) => {
            e.preventDefault();
            
            // Validate required fields
            if (!formData.title || !formData.description || !formData.date) {
              alert("Please fill in all required fields: Title, Description, and Date");
              return;
            }

            try {
              // Upload activity photos if any
              let uploadedPhotos = [];
              if (formData.activityPhotos && formData.activityPhotos.length > 0) {
                const photoFormData = new FormData();
                formData.activityPhotos.forEach((file) => {
                  photoFormData.append('photos', file);
                });

                const photoRes = await fetch(`${API_BASE}/photos/upload-photos`, {
                  method: 'POST',
                  headers: getAuthHeadersForFormData(),
                  body: photoFormData
                });
                const photoData = await photoRes.json();
                if (!photoRes.ok) throw new Error(photoData.error || photoData.message);
                uploadedPhotos = photoData.photos || [];
              }

              // Upload reports if any
              let uploadedReports = [];
              if (formData.reportFiles && formData.reportFiles.length > 0) {
                uploadedReports = await handleReportUpload(formData.reportFiles);
              }

              // Prepare activity data
              const activityData = {
                title: formData.title,
                description: formData.description,
                date: formData.date,
                location: formData.location,
                status: formData.status,
                attendance_hours: formData.attendance_hours,
                no_of_volunteers: formData.no_of_volunteers,
                photos: uploadedPhotos,
                reports: uploadedReports
              };

              const res = await fetch(`${API_BASE}/activities/add-activity`, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(activityData),
              });
              const data = await res.json();
              if (!res.ok) throw new Error(data.error || data.message);
              alert("Activity added successfully! It will now appear on the Home page's latest activities section.");
              
              // Clear form
              setFormData({});
            } catch (err) {
              alert("Add Activity Error: " + err.message);
            }
          }}
        >
          <h3>Add Latest Activity</h3>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Activity Title"
            value={formData.title || ''}
            onChange={handleChange}
            required
          />
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Activity Description"
            value={formData.description || ''}
            onChange={handleChange}
            required
          />
          <label htmlFor="date">Date:</label>
          <input
            id="date"
            name="date"
            type="date"
            value={formData.date || ''}
            onChange={handleChange}
            required
          />
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="Activity Location"
            value={formData.location || ''}
            onChange={handleChange}
            required
          />
          <label htmlFor="status">Status:</label>
          <input
            id="status"
            name="status"
            type="text"
            placeholder="Activity Status(upcoming/completed)"
            value={formData.status || ''}
            onChange={handleChange}
            required
          />
          <label htmlFor="attendance_hours">Attendance Hours:</label>
          <input
            id="attendance_hours"
            name="attendance_hours"
            type="text"
            placeholder="Activity attendance hours"
            value={formData.attendance_hours || ''}
            onChange={handleChange}
          />
          <label htmlFor="no_of_volunteers">No. of Volunteers:</label>
          <input
            id="no_of_volunteers"
            name="no_of_volunteers"
            type="text"
            placeholder="No. of Volunteers participated in the activity"
            value={formData.no_of_volunteers || ''}
            onChange={handleChange}
          />
          <div className="photo-section">
            <h4>Upload Activity Photos</h4>
            <label htmlFor="photos">Photos:</label>
            
            <div className="upload-section">
              <h5>Upload Photos</h5>
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  if (files.length > 0) {
                    setFormData(prev => ({ ...prev, activityPhotos: files }));
                  }
                }}
                style={{ marginBottom: '10px', width: '100%' }}
              />
              <p style={{ fontSize: '12px', color: '#666', margin: '5px 0' }}>
                Select multiple photos for this activity
              </p>
              
              {formData.activityPhotos && formData.activityPhotos.length > 0 && (
                <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #28a745', borderRadius: '4px', backgroundColor: '#f8fff9' }}>
                  <h6>Selected Photos:</h6>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px', marginTop: '10px' }}>
                    {formData.activityPhotos.map((file, idx) => (
                      <div key={idx} style={{ textAlign: 'center' }}>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          width="80"
                          height="80"
                          style={{ 
                            objectFit: 'cover', 
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                          }}
                        />
                        <p style={{ fontSize: '10px', margin: '2px 0', wordBreak: 'break-all' }}>
                          {file.name}
                        </p>
                        <button 
                          type="button"
                          onClick={() => {
                            const newFiles = formData.activityPhotos.filter((_, index) => index !== idx);
                            setFormData(prev => ({ ...prev, activityPhotos: newFiles.length > 0 ? newFiles : null }));
                          }}
                          style={{ 
                            padding: '2px 6px', 
                            fontSize: '10px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer'
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="reports-section" style={{ marginTop: '20px' }}>
            <h4>Activity Reports</h4>
            <label htmlFor="reports">Reports:</label>
            <div className="upload-section">
              <input 
                type="file" 
                multiple 
                accept=".pdf,.docx,.doc" 
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  if (files.length > 0) {
                    setFormData(prev => ({ ...prev, reportFiles: files }));
                  }
                }}
                style={{ marginBottom: '10px', width: '100%' }}
              />
              <p style={{ fontSize: '12px', color: '#666', margin: '5px 0' }}>
                Upload activity reports in PDF or DOCX format
              </p>
              
              {formData.reportFiles && formData.reportFiles.length > 0 && (
                <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #28a745', borderRadius: '4px', backgroundColor: '#f8fff9' }}>
                  <h6>Selected Reports:</h6>
                  {formData.reportFiles.map((file, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                      <span style={{ fontSize: '12px', color: '#28a745' }}>📄</span>
                      <span style={{ fontSize: '12px', marginLeft: '5px', flex: 1 }}>{file.name}</span>
                      <button 
                        type="button"
                        onClick={() => {
                          const newFiles = formData.reportFiles.filter((_, index) => index !== idx);
                          setFormData(prev => ({ ...prev, reportFiles: newFiles.length > 0 ? newFiles : null }));
                        }}
                        style={{ 
                          padding: '2px 6px', 
                          fontSize: '10px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px',
                          cursor: 'pointer'
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <button type="submit">Add</button>
        </form>
      );

    case 'delete':
      return (
        <form
          className="form-card"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const res = await fetch(`${API_BASE}/activities/delete-activity`, {
                method: 'DELETE',
                headers: getAuthHeaders(),
                body: JSON.stringify({ title: formData.title }),
              });
              const data = await res.json();
              if (!res.ok) throw new Error(data.error || data.message);
              alert(data.message);
              setFormData({});
            } catch (err) {
              alert("Delete Activity Error: " + err.message);
            }
          }}
        >
          <h3>Delete Activity</h3>
          <input
            name="title"
            type="text"
            placeholder="Title to delete"
            value={formData.title || ''}
            onChange={handleChange}
            required
          />
          <button type="submit">Delete</button>
        </form>
      );

    case 'update':
      return (
        <form
          className="form-card"
          onSubmit={async (e) => {
            e.preventDefault();

            if (!formData.oldTitle || !formData.newTitle || !formData.newDescription || !formData.newDate) {
              alert("Please fill in all required fields: Old Title, New Title, New Description, and New Date");
              return;
            }

            try {
              let uploadedPhotos = [];
              if (formData.newActivityPhotos && formData.newActivityPhotos.length > 0) {
                const photoFormData = new FormData();
                formData.newActivityPhotos.forEach((file) => {
                  photoFormData.append('photos', file);
                });

                const photoRes = await fetch(`${API_BASE}/photos/upload-photos`, {
                  method: 'POST',
                  headers: getAuthHeadersForFormData(),
                  body: photoFormData
                });
                const photoData = await photoRes.json();
                if (!photoRes.ok) throw new Error(photoData.error || photoData.message);
                uploadedPhotos = photoData.photos || [];
              }

              let uploadedReports = [];
              if (formData.newReportFiles && formData.newReportFiles.length > 0) {
                uploadedReports = await handleReportUpload(formData.newReportFiles);
              }

              const updateData = {
                oldTitle: formData.oldTitle,
                newTitle: formData.newTitle,
                newDescription: formData.newDescription,
                newDate: formData.newDate,
                newLocation: formData.newLocation,
                newStatus: formData.newStatus,
                newAttendanceHours: formData.newAttendanceHours,
                newNoOfVolunteers: formData.newNoOfVolunteers,
                newPhotos: uploadedPhotos,
                newReports: uploadedReports
              };

              const res = await fetch(`${API_BASE}/activities/update-activity`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(updateData),
              });
              const data = await res.json();
              if (!res.ok) throw new Error(data.error || data.message);
              alert("Activity updated successfully!");

              setFormData({});
            } catch (err) {
              alert("Update Activity Error: " + err.message);
            }
          }}
        >
          <h3>Update Activity</h3>
          <label htmlFor="oldTitle">Old Title (to identify activity):</label>
          <input
            id="oldTitle"
            name="oldTitle"
            type="text"
            placeholder="Old Title"
            value={formData.oldTitle || ''}
            onChange={handleChange}
            required
          />
          <label htmlFor="newTitle">New Title:</label>
          <input
            id="newTitle"
            name="newTitle"
            type="text"
            placeholder="New Title"
            value={formData.newTitle || ''}
            onChange={handleChange}
            required
          />
          <label htmlFor="newDescription">New Description:</label>
          <textarea
            id="newDescription"
            name="newDescription"
            placeholder="New Description"
            value={formData.newDescription || ''}
            onChange={handleChange}
            required
          />
          <label htmlFor="newDate">New Date:</label>
          <input
            id="newDate"
            name="newDate"
            type="date"
            value={formData.newDate || ''}
            onChange={handleChange}
            required
          />
          <label htmlFor="newLocation">New Location:</label>
          <input
            id="newLocation"
            name="newLocation"
            type="text"
            placeholder="New Location"
            value={formData.newLocation || ''}
            onChange={handleChange}
            required
          />
          <label htmlFor="newStatus">New Status:</label>
          <input
            id="newStatus"
            name="newStatus"
            type="text"
            placeholder="New Status(upcoming/completed)"
            value={formData.newStatus || ''}
            onChange={handleChange}
            required
          />
          <label htmlFor="newAttendanceHours">New Attendance Hours:</label>
          <input
            id="newAttendanceHours"
            name="newAttendanceHours"
            type="text"
            placeholder="New Attendance Hours"
            value={formData.newAttendanceHours || ''}
            onChange={handleChange}
          />
          <label htmlFor="newNoOfVolunteers">New No. Of Volunteers:</label>
          <input
            id="newNoOfVolunteers"
            name="newNoOfVolunteers"
            type="text"
            placeholder="New No. Of volunteers"
            value={formData.newNoOfVolunteers || ''}
            onChange={handleChange}
          />
          <div className="photo-section">
            <h4>Upload New Activity Photos (optional)</h4>
            <div className="upload-section">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  if (files.length > 0) {
                    setFormData(prev => ({ ...prev, newActivityPhotos: files }));
                  }
                }}
                style={{ marginBottom: '10px', width: '100%' }}
              />
              <p style={{ fontSize: '12px', color: '#666', margin: '5px 0' }}>
                Select multiple new photos to add/replace for this activity
              </p>

              {formData.newActivityPhotos && formData.newActivityPhotos.length > 0 && (
                <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #28a745', borderRadius: '4px', backgroundColor: '#f8fff9' }}>
                  <h6>Selected New Photos:</h6>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px', marginTop: '10px' }}>
                    {formData.newActivityPhotos.map((file, idx) => (
                      <div key={idx} style={{ textAlign: 'center' }}>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          width="80"
                          height="80"
                          style={{
                            objectFit: 'cover',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                          }}
                        />
                        <p style={{ fontSize: '10px', margin: '2px 0', wordBreak: 'break-all' }}>
                          {file.name}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            const newFiles = formData.newActivityPhotos.filter((_, index) => index !== idx);
                            setFormData(prev => ({ ...prev, newActivityPhotos: newFiles.length > 0 ? newFiles : null }));
                          }}
                          style={{
                            padding: '2px 6px',
                            fontSize: '10px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer'
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="reports-section" style={{ marginTop: '20px' }}>
            <h4>Upload New Activity Reports (optional)</h4>
            <div className="upload-section">
              <input
                type="file"
                multiple
                accept=".pdf,.docx,.doc"
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  if (files.length > 0) {
                    setFormData(prev => ({ ...prev, newReportFiles: files }));
                  }
                }}
                style={{ marginBottom: '10px', width: '100%' }}
              />
              <p style={{ fontSize: '12px', color: '#666', margin: '5px 0' }}>
                Upload new activity reports in PDF or DOCX format
              </p>

              {formData.newReportFiles && formData.newReportFiles.length > 0 && (
                <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #28a745', borderRadius: '4px', backgroundColor: '#f8fff9' }}>
                  <h6>Selected New Reports:</h6>
                  {formData.newReportFiles.map((file, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                      <span style={{ fontSize: '12px', color: '#28a745' }}>📄</span>
                      <span style={{ fontSize: '12px', marginLeft: '5px', flex: 1 }}>{file.name}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newFiles = formData.newReportFiles.filter((_, index) => index !== idx);
                          setFormData(prev => ({ ...prev, newReportFiles: newFiles.length > 0 ? newFiles : null }));
                        }}
                        style={{
                          padding: '2px 6px',
                          fontSize: '10px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px',
                          cursor: 'pointer'
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button type="submit">Update</button>
        </form>
      );

    case 'view':
      return (
        <div className="form-card">
          <h3>Activities</h3>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
                <th>Location</th>
                <th>Status</th>
                <th>Photos</th>
                <th>Reports</th>
              </tr>
            </thead>
            <tbody>
              {activitiesList.length > 0 ? (
                activitiesList.map((act, idx) => (
                  <tr key={idx}>
                    <td>{act.title}</td>
                    <td>{act.description}</td>
                    <td>{act.date}</td>
                    <td>{act.location}</td>
                    <td>{act.status}</td>
                    <td>
                      {act.photos && act.photos.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                          {act.photos.slice(0, 3).map((photo, photoIdx) => {
                            const src = photo.url && photo.url.startsWith('http') ? photo.url : `${API_BASE}${photo.url}`;
                            return (
                              <img 
                                key={photoIdx} 
                                src={src} 
                                alt={photo.original_name} 
                                width="40" 
                                height="40"
                                style={{ objectFit: 'cover', borderRadius: '4px' }}
                              />
                            );
                          })}
                          {act.photos.length > 3 && (
                            <span style={{ fontSize: '12px', color: '#666' }}>
                              +{act.photos.length - 3} more
                            </span>
                          )}
                        </div>
                      ) : "—"}
                    </td>
                    <td>
                      {act.reports && act.reports.length > 0 ? (
                        <div>
                          {act.reports.map((report, reportIdx) => (
                            <div key={reportIdx} style={{ margin: '2px 0' }}>
                              <a 
                                href={report.url && report.url.startsWith('http') ? report.url : `${API_BASE}${report.url}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ fontSize: '12px', color: '#007bff', textDecoration: 'none' }}
                              >
                                📄 {report.original_name}
                              </a>
                            </div>
                          ))}
                        </div>
                      ) : "—"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No activities found.</td>
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

export default ActivitiesTab;
