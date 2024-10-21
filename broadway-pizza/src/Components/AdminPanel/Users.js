import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import axios from 'axios';
import '../AdminPanel/AdminPanel.css'

const Users = () => {
  const [values, setvalues]= useState([])

  const displayUser = async ()=>{
    let result = await axios.get('http://localhost:5000/users')
    setvalues(result.data)
  }
  useEffect(()=>{
    displayUser()
  },[])

  return (
    <div className="admin-dashboard ">
      <Sidebar />
      <div className="dashboard-content">
        <Topbar />
        <div className="main-content">
        <div>
      <h4 className='text-center'>Broadway Pizza Users</h4>
    </div>
    <div className="userTableContainer">
    <table className="userTable shadow">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Password</th>
            <th>User Status</th>
          </tr>
        </thead>
        <tbody>
          {values.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.password}</td>
              <td>
                {user.isOnline ? (
                  <span className="online">Online</span>
                ) : (
                  <span className="offline">Offline</span>
                )}
              </td> 
            </tr>
          ))}
        </tbody>
      </table>
      </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
