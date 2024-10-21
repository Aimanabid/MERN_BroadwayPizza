import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Settings = () => {
  return (
    <div className="admin-dashboard ">
      <Sidebar />
      <div className="dashboard-content">
        <Topbar />
        <div className="main-content">
        <div>
      <h2>Settings Section</h2>
      <p>Manage your settings here.</p>
    </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
