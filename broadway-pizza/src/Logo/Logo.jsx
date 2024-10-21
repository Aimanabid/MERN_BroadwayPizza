import React, { useState } from 'react';
import './Logo.css';
import logoImage from '../images/asset 0.png'; 
import { useSnackbar } from 'notistack'; // Import useSnackbar hook
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Logo() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('addCart') === 'true');
  const { enqueueSnackbar } = useSnackbar(); 

  const handleLogout = async () => {
    try {
      localStorage.setItem('addCart', false);
      setIsLoggedIn(false); 
      enqueueSnackbar('Logged out successfully');
      const userId= localStorage.getItem('userId')

      const result = await axios.put('http://localhost:5000/logout',{userId});

      if (result.status === 200) {
        toast.info('Logged out Successfully');
      } else {
        console.log('Unexpected server response', result);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      enqueueSnackbar('Failed to log out. Please try again.', { variant: 'error' }); 
    }
  };

  return (
    <div className="sticky-logo d-flex justify-content-between">
      <img src={logoImage} style={{ width: '10%' }} alt="logo" />
      {isLoggedIn && (
        <button className='btn btn-warning btn-sm logoutbtn' onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
}
