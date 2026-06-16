import React,{ useEffect, useState } from "react";
import './AdminDashboard.css';
import { API_BASE } from '../utils/api';
import { getAuthHeaders, getAuthHeadersForFormData, isAuthenticated, logout } from '../utils/auth';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('members');
  const [selectedAction, setSelectedAction] = useState('');
  const [formData, setFormData] = useState({});
  const [membersList, setMembersList] = useState([]);
  const [activitiesList, setActivitiesList] = useState([]); // separate state for activities
  const [albumsList, setAlbumsList] = useState([]); // for gallery admin
  const [galleryFiles, setGalleryFiles] = useState(null);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState('');

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      alert('Please login to access admin dashboard');
      window.location.href = '/login';
      return;
    }
  }, []);
 const handleActionClick = (action) => {
  setSelectedAction(action);

  // ✅ FIX: Explicitly fetch members when View is clicked
  if (activeTab === 'members' && action === 'view') {
    fetchMembers();
  }
};



// Fetch albums when gallery tab is active
useEffect(() => {
  if (activeTab === 'gallery') {
    fetch("https://nss-website-backend.onrender.com/api/albums")
      .then((res) => res.json())
      .then((data) => {
        const arr = data || [];
        setAlbumsList(arr);
      })
      .catch((err) => console.error('Error fetching albums:', err));
  }
}, [activeTab]);



useEffect(() => {
  setFormData({});
}, [selectedAction]);

useEffect(() => {
  if (!isAuthenticated()) return;
  if (activeTab === 'activities' && selectedAction === 'view') {
    fetch("https://nss-website-backend.onrender.com/admin/get-activities", {
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
}, [activeTab, selectedAction]);

const fetchMembers = async () => {
  try {
    const res = await fetch(
      "https://nss-website-backend.onrender.com/admin/get-users",
      { headers: getAuthHeaders() }
    );

    if (res.status === 401) {
      logout();
      return;
    }

    const data = await res.json();
    setMembersList(data || []);
  } catch (err) {
    console.error("Error fetching members:", err);
  }
};

const renderForm = () => {
  

const handleChange = (e) => {
  setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};



const handleReportUpload = async (files) => {
  const formData = new FormData();
  files.forEach((file, index) => {
    formData.append('reports', file);
  });

  try {
    const res = await fetch('https://nss-website-backend.onrender.com/admin/upload-reports', {
      method: 'POST',
      headers: getAuthHeadersForFormData(),
      body: formData
    });
    
    if (res.status === 401) {
      logout();
      return [];
    }
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || data.message);
    alert(`Successfully uploaded ${files.length} reports!`);
    return data.reports; // Return uploaded reports
  } catch (err) {
    alert('Report Upload Error: ' + err.message);
    return [];
  }
};

const handleAddUser = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('https://nss-website-backend.onrender.com/admin/add-user', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(formData)
    });

    if (res.status === 401) {
      logout();
      return;
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || data.message);
    alert(data.message);
    setFormData({});
  } catch (err) {
    alert('Add Error: ' + err.message);
  }
};

const handleUpdateUser = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('https://nss-website-backend.onrender.com/admin/update-user', {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(formData)
    });

    if (res.status === 401) {
      logout();
      return;
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || data.message);
    alert(data.message);
    setFormData({});
  } catch (err) {
    alert('Update Error: ' + err.message);
  }
};

const handleDeleteUser = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('https://nss-website-backend.onrender.com/admin/delete-user', {
      method: 'DELETE',
      headers: getAuthHeaders(),
      body: JSON.stringify({ email: formData.email })
    });

    if (res.status === 401) {
      logout();
      return;
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || data.message);
    alert(data.message);
    setFormData({});
  } catch (err) {
    alert('Delete Error: ' + err.message);
  }
};



  if (activeTab === 'members') {
    switch (selectedAction) {
      case 'add':
        return (
          <form
            className="form-card"
            onSubmit={(e) => handleAddUser(e, 'https://nss-website-backend.onrender.com/admin/add-user','POST')}
          >
            <h3>Add Member</h3>
            <input name="email" type="email" placeholder="Email" value={formData.email || ""} onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" value={formData.password || ""} onChange={handleChange} required />
            <input name="role" type="text" placeholder="Role" value={formData.role || ""} onChange={handleChange} required />
            {formData.role === 'verticalhead' && (
            <input name="vertical" type="text" placeholder="Vertical (e.g. Finance, Photography)" value={formData.vertical || ''} onChange={handleChange} required />
            )}
            <button type="submit">Add</button>
          </form>
        );
      case 'delete':
        return (
          <form
            className="form-card"
            onSubmit={(e) => handleDeleteUser(e, 'https://nss-website-backend.onrender.com/admin/delete-user','DELETE')}
          >
            <h3>Delete Member</h3>
            <input name="email" type="email" placeholder="Email" value={formData.email || ""} onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" value={formData.password || ""} onChange={handleChange} required />
            <button type="submit">Delete</button>
          </form>
        );
      case 'update':
        return (
          <form
            className="form-card"
            onSubmit={(e) => handleUpdateUser(e, 'https://nss-website-backend.onrender.com/admin/update-user','PUT')}
          >
            <h3>Update Member</h3>
            <input name="existingEmail" type="email" placeholder="Existing Email" value={formData.existingEmail || ""} onChange={handleChange} required />
            <input name="existingPassword" type="password" placeholder="Existing Password" value={formData.existingPassword || ""} onChange={handleChange} required />
            <input name="existingRole" type="text" placeholder="Existing Role" value={formData.existingRole || ""} onChange={handleChange} required />
            <input name="newEmail" type="email" placeholder="New Email"  value={formData.newEmail || ""}onChange={handleChange} required />
            <input name="newPassword" type="password" placeholder="New Password" value={formData.newPassword || ""} onChange={handleChange} required />
            <input name="newRole" type="text" placeholder="New Role" value={formData.newRole || ""} onChange={handleChange} required />
            {formData.newRole === 'verticalhead' && (
            <input name="newVertical" type="text" placeholder="New Vertical Name" value={formData.newVertical || ""} onChange={handleChange} required />
            )}
            <button type="submit">Update</button>
          </form>
        );
      case 'view':
        return (
          <div className="form-card">
            <h3>Members List</h3>
            <table>
              <thead>
                <tr><th>Email</th><th>Password</th><th>Role</th><th>Vertical</th></tr>
              </thead>
              <tbody>
                {membersList.map((user, index) => (
                  <tr key={index}>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.role}</td>
                    {/* Show vertical only if present */}
                    {user.vertical ? <td>{user.vertical}</td> : <td>-</td>}
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        );

      default:
        return <p className="placeholder-text">Select an action to proceed.</p>;
    }
  }

  if (activeTab === 'activities') {
  switch (selectedAction) {
    case 'add':
      return (
        <form className="form-card" onSubmit={async (e) => {
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
              formData.activityPhotos.forEach((file, index) => {
                photoFormData.append('photos', file);
              });

              const photoRes = await fetch('https://nss-website-backend.onrender.com/admin/upload-photos', {
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
              photos: uploadedPhotos,
              reports: uploadedReports
            };

            const res = await fetch("https://nss-website-backend.onrender.com/admin/add-activity", {
              method: 'POST',
              headers: getAuthHeaders(),
              body: JSON.stringify(activityData),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || data.message);
            alert("Activity added successfully! It will now appear on the Home page's latest activities section.");
            
            // Clear form
            setFormData({});
            
            // Refresh activities list if we're in view mode
            if (selectedAction === 'view') {
              fetch("https://nss-website-backend.onrender.com/admin/get-activities")
                .then((res) => res.json())
                .then((data) => setActivitiesList(data || []))
                .catch((err) => console.error("Fetch activities error:", err));
            }
            
            // Optionally redirect to home page after successful addition
            // window.location.href = '/';
          } catch (err) {
            alert("Add Activity Error: " + err.message);
          }
        }}>
          <h3>Add Latest Activity</h3>
          <label htmlFor="title">Title:</label>
          <input id="title" name="title" type="text" placeholder="Activity Title" value={formData.title || ''} onChange={handleChange} required />
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" placeholder="Activity Description" value={formData.description || ''} onChange={handleChange} required />
          <label htmlFor="date">Date:</label>
          <input id="date" name="date" type="date" value={formData.date || ''} onChange={handleChange} required />
          <div className="photo-section">
            <h4>Upload Activity Photos</h4>
            <label htmlFor="photos">Photos:</label>
            
            {/* Upload Photos for Activity */}
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
              
              {/* Show selected photos */}
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

          {/* Reports Section */}
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
              
              {/* Show selected report files */}
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
        <form className="form-card" onSubmit={async (e) => {
          e.preventDefault();
          try {
            const res = await fetch("https://nss-website-backend.onrender.com/admin/delete-activity", {
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
        }}>
          <h3>Delete Activity</h3>
          <input name="title" type="text" placeholder="Title to delete" value={formData.title || ''} onChange={handleChange} required />
          <button type="submit">Delete</button>
        </form>
      );

    case 'update':
      return (
        <form className="form-card" onSubmit={async (e) => {
          e.preventDefault();

          // Validate required fields
          if (!formData.oldTitle || !formData.newTitle || !formData.newDescription || !formData.newDate) {
            alert("Please fill in all required fields: Old Title, New Title, New Description, and New Date");
            return;
          }

          try {
            // Upload new activity photos if any
            let uploadedPhotos = [];
            if (formData.newActivityPhotos && formData.newActivityPhotos.length > 0) {
              const photoFormData = new FormData();
              formData.newActivityPhotos.forEach((file, index) => {
                photoFormData.append('photos', file);
              });

              const photoRes = await fetch('https://nss-website-backend.onrender.com/admin/upload-photos', {
                method: 'POST',
                headers: getAuthHeadersForFormData(),
                body: photoFormData
              });
              const photoData = await photoRes.json();
              if (!photoRes.ok) throw new Error(photoData.error || photoData.message);
              uploadedPhotos = photoData.photos || [];
            }

            // Upload new reports if any
            let uploadedReports = [];
            if (formData.newReportFiles && formData.newReportFiles.length > 0) {
              uploadedReports = await handleReportUpload(formData.newReportFiles);
            }

            // Prepare update data
            const updateData = {
              oldTitle: formData.oldTitle,
              newTitle: formData.newTitle,
              newDescription: formData.newDescription,
              newDate: formData.newDate,
              newPhotos: uploadedPhotos,
              newReports: uploadedReports
            };

            const res = await fetch("https://nss-website-backend.onrender.com/admin/update-activity", {
              method: 'PUT',
              headers: getAuthHeaders(),
              body: JSON.stringify(updateData),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || data.message);
            alert("Activity updated successfully!");

            // Clear form
            setFormData({});

            // Refresh activities list
            fetch("https://nss-website-backend.onrender.com/admin/get-activities", {
              headers: getAuthHeaders()
            })
              .then((res) => res.json())
              .then((data) => setActivitiesList(data || []))
              .catch((err) => console.error("Fetch activities error:", err));
          } catch (err) {
            alert("Update Activity Error: " + err.message);
          }
        }}>
          <h3>Update Activity</h3>
          <label htmlFor="oldTitle">Old Title (to identify activity):</label>
          <input id="oldTitle" name="oldTitle" type="text" placeholder="Old Title" value={formData.oldTitle || ''} onChange={handleChange} required />
          <label htmlFor="newTitle">New Title:</label>
          <input id="newTitle" name="newTitle" type="text" placeholder="New Title" value={formData.newTitle || ''} onChange={handleChange} required />
          <label htmlFor="newDescription">New Description:</label>
          <textarea id="newDescription" name="newDescription" placeholder="New Description" value={formData.newDescription || ''} onChange={handleChange} required />
          <label htmlFor="newDate">New Date:</label>
          <input id="newDate" name="newDate" type="date" value={formData.newDate || ''} onChange={handleChange} required />

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

              {/* Show selected new photos */}
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

          {/* New Reports Section */}
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

              {/* Show selected new report files */}
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
          <h3>Latest Activities</h3>
          <table>
            <thead>
              <tr><th>Title</th><th>Description</th><th>Date</th><th>Photos</th><th>Reports</th></tr>
            </thead>
            <tbody>
              {activitiesList.length > 0 ? (
                activitiesList.map((act, idx) => (
                  <tr key={idx}>
                    <td>{act.title}</td>
                    <td>{act.description}</td>
                    <td>{act.date}</td>
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
                <tr><td colSpan="5">No activities found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      );

    default:
      return <p className="placeholder-text">Select an action to proceed.</p>;
  }
}

if (activeTab === 'gallery') {
  // gallery action-based UI
  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    if (!newAlbumName) return alert('Enter album name');
    try {
      const res = await fetch('https://nss-website-backend.onrender.com/api/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newAlbumName })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message);
      alert('Album created');
      setNewAlbumName('');
      const ref = await fetch('https://nss-website-backend.onrender.com/api/albums');
      const arr = await ref.json();
      setAlbumsList(arr || []);
      // notify gallery viewers to refresh
      try { localStorage.setItem('galleryUpdated', Date.now().toString()); window.dispatchEvent(new Event('galleryUpdated')); } catch (e) {}
    } catch (err) {
      alert('Create album error: ' + err.message);
    }
  };

  const handleGalleryFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setGalleryFiles(files.length ? files : null);
  };

  // const handleGalleryUpload = async (albumName) => {
  //   if (!galleryFiles || galleryFiles.length === 0) return alert('Choose photos to upload');

  //   // If no album selected, create a default one
  //   let finalAlbumName = albumName;
  //   if (!finalAlbumName) {
  //     finalAlbumName = `Gallery ${new Date().getFullYear()}`;
  //     try {
  //       const createRes = await fetch('https://nss-website-backend.onrender.com/api/albums', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ name: finalAlbumName })
  //       });
  //       // if album already exists, it will error but we continue
  //       if (createRes.ok) {
  //         setAlbumsList(prev => [...prev, { name: finalAlbumName, photos: [] }]);
  //       }
  //     } catch (err) {
  //       console.log('Album may already exist, continuing...');
  //     }
  //   }

  //   // 1) Upload files to admin upload endpoint with JWT
  //   const form = new FormData();
  //   galleryFiles.forEach((f) => form.append('photos', f));

  //   try {
  //     setGalleryUploading(true);

  //     const uploadRes = await fetch('https://nss-website-backend.onrender.com/admin/upload-photos', {
  //       method: 'POST',
  //       headers: getAuthHeadersForFormData(),
  //       body: form
  //     });

  //     if (uploadRes.status === 401) {
  //       logout();
  //       return;
  //     }

  //     const uploadData = await uploadRes.json();
  //     if (!uploadRes.ok) throw new Error(uploadData.error || uploadData.message || 'Admin upload failed');

  //     const uploadedPhotos = uploadData.photos || [];

  //     // 2) Associate uploaded photos with album via JSON to album endpoint
  //     const associateRes = await fetch(`https://nss-website-backend.onrender.com/api/albums/${encodeURIComponent(finalAlbumName)}/photos`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ photos: uploadedPhotos })
  //     });

  //     const assocData = await associateRes.json();
  //     if (!associateRes.ok) throw new Error(assocData.error || assocData.message || 'Associate failed');

  //     alert('Uploaded and associated ' + (uploadedPhotos.length) + ' photos');
  //     setGalleryFiles(null);

  //     // refresh albums
  //     const ref = await fetch('https://nss-website-backend.onrender.com/api/albums');
  //     const arr = await ref.json();
  //     setAlbumsList(arr || []);
  //     // notify gallery viewers to refresh
  //     try { localStorage.setItem('galleryUpdated', Date.now().toString()); window.dispatchEvent(new Event('galleryUpdated')); } catch (e) {}

  //   } catch (err) {
  //     console.error('Gallery upload error', err);
  //     alert('Upload error: ' + err.message);
  //   } finally {
  //     setGalleryUploading(false);
  //   }
  // };
  const handleGalleryUpload = async (albumName) => {
    if (!galleryFiles || galleryFiles.length === 0) return alert('Choose photos to upload');

    // If no album selected, create a default one
    let finalAlbumName = albumName;
    if (!finalAlbumName) {
      finalAlbumName = `Gallery ${new Date().getFullYear()}`;
      try {
        await fetch('https://nss-website-backend.onrender.com/api/albums', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: finalAlbumName })
        });
      } catch (err) {
        console.log('Album creation check ignored');
      }
    }

    // --- NEW ONE-STEP UPLOAD LOGIC ---
    const form = new FormData();
    galleryFiles.forEach((f) => form.append('photos', f)); // 'photos' key matches backend

    try {
      setGalleryUploading(true);

      // Send files DIRECTLY to the album endpoint
      const res = await fetch(`https://nss-website-backend.onrender.com/api/albums/${encodeURIComponent(finalAlbumName)}/photos`, {
        method: 'POST',
        // We manually add the token. Do NOT add 'Content-Type': 'multipart/form-data' 
        // because the browser must generate the boundary string automatically.
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: form
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message || 'Upload failed');

      alert(`Success! ${data.message || 'Photos uploaded.'}`);
      setGalleryFiles(null);

      // Refresh albums list
      const ref = await fetch('https://nss-website-backend.onrender.com/api/albums');
      const arr = await ref.json();
      setAlbumsList(arr || []);
      
      // Notify listeners (for the public gallery page to update)
      try { 
          localStorage.setItem('galleryUpdated', Date.now().toString()); 
          window.dispatchEvent(new Event('galleryUpdated')); 
      } catch (e) {}

    } catch (err) {
      console.error('Gallery upload error', err);
      alert('Upload error: ' + err.message);
    } finally {
      setGalleryUploading(false);
    }
  };

  const handleDeleteAlbum = async (albumName) => {
    if (!albumName) return alert('Select an album');
    if (!window.confirm(`Delete album "${albumName}"? This will remove all photos.`)) return;
    try {
      const res = await fetch(`https://nss-website-backend.onrender.com/api/albums/${encodeURIComponent(albumName)}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message || 'Delete failed');
      alert(data.message || 'Album deleted');
      const ref = await fetch('https://nss-website-backend.onrender.com/api/albums');
      const arr = await ref.json();
      setAlbumsList(arr || []);
      // notify gallery viewers to refresh
      try { localStorage.setItem('galleryUpdated', Date.now().toString()); window.dispatchEvent(new Event('galleryUpdated')); } catch (e) {}
      setFormData(prev => ({ ...prev, albumName: '' }));
    } catch (err) {
      alert('Delete error: ' + err.message);
    }
  };

  const handleDeletePhoto = async (albumName, index) => {
    if (!window.confirm('Delete this photo?')) return;
    try {
      const res = await fetch(`https://nss-website-backend.onrender.com/api/albums/${encodeURIComponent(albumName)}/photos/${index}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message || 'Delete photo failed');
      alert(data.message || 'Photo deleted');
      const ref = await fetch('https://nss-website-backend.onrender.com/api/albums');
      const arr = await ref.json();
      setAlbumsList(arr || []);
      // notify gallery viewers to refresh
      try { localStorage.setItem('galleryUpdated', Date.now().toString()); window.dispatchEvent(new Event('galleryUpdated')); } catch (e) {}
    } catch (err) {
      alert('Delete photo error: ' + err.message);
    }
  };

  switch (selectedAction) {
    case 'add':
      return (
        <div className="form-card">
          <h3>Create Album / Upload</h3>
          <form onSubmit={handleCreateAlbum} style={{ marginBottom: 12 }}>
            <input type="text" placeholder="New album name" value={newAlbumName} onChange={(e) => setNewAlbumName(e.target.value)} />
            <button type="submit">Create Album</button>
          </form>

          <div style={{ marginBottom: 12 }}>
            <label>Select album to upload (or create above):</label>
            <select name="albumName" value={formData.albumName || ''} onChange={(e) => setFormData(prev => ({ ...prev, albumName: e.target.value }))}>
              <option value="">-- Select --</option>
              {albumsList.map((a, idx) => (
                <option key={idx} value={a.name}>{a.name}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: 12 }}>
            <input type="file" multiple accept="image/*" onChange={handleGalleryFileChange} />
            <button onClick={() => handleGalleryUpload(formData.albumName)} disabled={galleryUploading} style={{ marginLeft: 8 }}>{galleryUploading ? 'Uploading...' : 'Upload to Album'}</button>
          </div>
        </div>
      );

    case 'update':
      return (
        <div className="form-card">
          <h3>Update Album (upload/delete photos)</h3>
          <div style={{ marginBottom: 12 }}>
            <label>Select album:</label>
            <select name="albumName" value={formData.albumName || ''} onChange={(e) => setFormData(prev => ({ ...prev, albumName: e.target.value }))}>
              <option value="">-- Select --</option>
              {albumsList.map((a, idx) => (
                <option key={idx} value={a.name}>{a.name}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: 12 }}>
            <input type="file" multiple accept="image/*" onChange={handleGalleryFileChange} />
            <button onClick={() => handleGalleryUpload(formData.albumName)} disabled={galleryUploading} style={{ marginLeft: 8 }}>{galleryUploading ? 'Uploading...' : 'Upload Photos'}</button>
          </div>

          <div>
            <h4>Photos</h4>
            {formData.albumName ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 8 }}>
                {(albumsList.find(a => a.name === formData.albumName)?.photos || []).map((p, idx) => {
                  const src = p.url && p.url.startsWith('http') ? p.url : `${API_BASE}${p.url}`;
                  return (
                  <div key={idx} style={{ position: 'relative' }}>
                    <img src={src} alt={p.filename || p.original_name} style={{ width: '100%', height: 90, objectFit: 'cover', borderRadius: 4 }} />
                    <button type="button" onClick={() => handleDeletePhoto(formData.albumName, idx)} style={{ position: 'absolute', top: 6, right: 6, background: '#dc3545', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 6px', cursor: 'pointer' }}>Delete</button>
                  </div>
                  )
                })}
              </div>
            ) : <div>Select an album to view photos</div>}
          </div>
        </div>
      );

    case 'delete':
      return (
        <div className="form-card">
          <h3>Delete Album</h3>
          <div style={{ marginBottom: 12 }}>
            <label>Select album to delete:</label>
            <select name="albumName" value={formData.albumName || ''} onChange={(e) => setFormData(prev => ({ ...prev, albumName: e.target.value }))}>
              <option value="">-- Select --</option>
              {albumsList.map((a, idx) => (
                <option key={idx} value={a.name}>{a.name}</option>
              ))}
            </select>
          </div>
          <button onClick={() => handleDeleteAlbum(formData.albumName)} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: 6 }}>Delete Album</button>
        </div>
      );

    case 'view':
      return (
        <div className="form-card">
          <h3>Albums Preview</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
            {albumsList.map((a, idx) => (
              <div key={idx} style={{ padding: 8, border: '1px solid #ddd', borderRadius: 6 }}>
                <strong style={{ display: 'block', marginBottom: 8 }}>{a.name}</strong>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                  {(a.photos || []).slice(0,6).map((p, i) => (
                    <img key={i} src={p.url} alt={p.filename || p.original_name} style={{ width: '100%', height: 60, objectFit: 'cover', borderRadius: 4 }} />
                  ))}
                  {(a.photos || []).length === 0 && <div style={{ color: '#666' }}>No Photos</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return <p className="placeholder-text">Select an action to proceed.</p>;
  }
}



};

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li
            className={activeTab === 'members' ? 'active' : ''}
            onClick={() => {
              setActiveTab('members');
              setSelectedAction('');
            }}
          >
            Members
          </li>
          <li
            className={activeTab === 'activities' ? 'active' : ''}
            onClick={() => {
              setActiveTab('activities');
              setSelectedAction('');
            }}
          >
            Activities
          </li>
          <li
            className={activeTab === 'gallery' ? 'active' : ''}
            onClick={() => {
              setActiveTab('gallery');
              setSelectedAction('');
            }}
          >
            Gallery
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <>
          <div className="button-group">
            {['add', 'update', 'delete', 'view'].map((action) => (
              <button
                key={action}
                onClick={() => handleActionClick(action)}
                className={selectedAction === action ? 'selected' : ''}
              >
                {action.charAt(0).toUpperCase() + action.slice(1)}
              </button>
            ))}
          </div>
          {renderForm()}
        </>
      </main>
    </div>
  );
};

export default AdminDashboard;
