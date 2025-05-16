// src/pages/Profile.js
import React from 'react';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   logoutUser(navigate);
  //   window.location.reload(); // ✅ Refresh navbar
  // };

  return (
    <div className='flex flex-col items-center mt-10'>
      <h1 className='text-2xl font-bold mb-4'>Welcome to your Profile</h1>
      
    </div>
  );
};

export default Profile;
