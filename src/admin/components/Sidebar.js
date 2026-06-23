import React from 'react';

const Sidebar = ({ activeTab, setActiveTab, setSelectedAction, handleLogout }) => {
  return (
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
        <li
          className={activeTab === 'registrations' ? 'active' : ''}
          onClick={() => {
            setActiveTab('registrations');
            setSelectedAction('');
          }}
        >
          Registrations
        </li>
        <li
          className={activeTab === 'announcements' ? 'active' : ''}
          onClick={() => {
            setActiveTab('announcements');
            setSelectedAction('');
          }}
        >
          Announcements
        </li>
        <li onClick={handleLogout}>
          Logout
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
