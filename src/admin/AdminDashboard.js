import React, { useEffect, useState } from "react";
import './AdminDashboard.css';
import { API_BASE } from '../utils/api';
import { useNavigate } from "react-router-dom";
import { getAuthHeaders, getAuthHeadersForFormData, isAuthenticated, logout } from '../utils/auth';

import Sidebar from './components/Sidebar';
import ActionButtons from './components/ActionButtons';
import MembersTab from './tabs/MembersTab';
import ActivitiesTab from './tabs/ActivitiesTab';
import GalleryTab from './tabs/GalleryTab';
import RegistrationsTab from './tabs/RegistrationsTab';
import AnnouncementsTab from './tabs/AnnouncementsTab';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('members');
  const [selectedAction, setSelectedAction] = useState('');
  const [formData, setFormData] = useState({});
  const [membersList, setMembersList] = useState([]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      alert('Please login to access admin dashboard');
      navigate('/login');
      return;
    }
  }, [navigate]);

  const handleActionClick = (action) => {
    setSelectedAction(action);

    // Explicitly fetch members when View is clicked
    if (activeTab === 'members' && action === 'view') {
      fetchMembers();
    }
  };

  useEffect(() => {
    setFormData({});
  }, [selectedAction]);

  const fetchMembers = async () => {
    try {
      const res = await fetch(`${API_BASE}/user/get-users`, {
        headers: getAuthHeaders()
      });
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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReportUpload = async (files) => {
    const fd = new FormData();
    files.forEach((file) => {
      fd.append('reports', file);
    });

    try {
      const res = await fetch(`${API_BASE}/reports/upload-reports`, {
        method: 'POST',
        headers: getAuthHeadersForFormData(),
        body: fd
      });
      if (res.status === 401) {
        logout();
        return [];
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message);
      alert(`Successfully uploaded ${files.length} reports!`);
      return data.reports;
    } catch (err) {
      alert('Report Upload Error: ' + err.message);
      return [];
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/user/add-user`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(formData)
      });

      if (res.status === 401) {
        logout();
        return;
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.msg);
      alert(data.msg);
      setFormData({});
    } catch (err) {
      alert('Add Error: ' + err.message);
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/user/update-user`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(formData)
      });

      if (res.status === 401) {
        logout();
        return;
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.msg);
      alert(data.msg);
      setFormData({});
    } catch (err) {
      alert('Update Error: ' + err.message);
    }
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/user/delete-user`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        body: JSON.stringify({ email: formData.email })
      });

      if (res.status === 401) {
        logout();
        return;
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.msg);
      alert(data.msg);
      setFormData({});
    } catch (err) {
      alert('Delete Error: ' + err.message);
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'members':
        return (
          <MembersTab
            selectedAction={selectedAction}
            formData={formData}
            handleChange={handleChange}
            membersList={membersList}
            handleAddUser={handleAddUser}
            handleUpdateUser={handleUpdateUser}
            handleDeleteUser={handleDeleteUser}
          />
        );
      case 'activities':
        return (
          <ActivitiesTab
            selectedAction={selectedAction}
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            handleReportUpload={handleReportUpload}
          />
        );
      case 'gallery':
        return (
          <GalleryTab
            selectedAction={selectedAction}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 'registrations':
        return (
          <RegistrationsTab
            selectedAction={selectedAction}
          />
        );
      case 'announcements':
        return (
          <AnnouncementsTab
            selectedAction={selectedAction}
          />
        );
      default:
        return <p className="placeholder-text">Select an action to proceed.</p>;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setSelectedAction={setSelectedAction}
        handleLogout={handleLogout}
      />

      <main className="main-content">
        <>
          <ActionButtons
            selectedAction={selectedAction}
            handleActionClick={handleActionClick}
          />
          {renderForm()}
        </>
      </main>
    </div>
  );
};

export default AdminDashboard;
