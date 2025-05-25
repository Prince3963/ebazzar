// src/pages/Profile.js
import React, { useState } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    address: '123 Main St, Mumbai',
    phone: '9876543210',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = () => {
    // Later you can call API here
    alert('Profile updated successfully!');
  };

  const handleChangePassword = () => {
    if (userData.newPassword !== userData.confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }
    alert('Password changed successfully!');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Profile</h2>

      {/* Personal Info */}
      <div className="space-y-4">
        <div>
          <label className="block font-semibold">Full Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            readOnly
            className="w-full border bg-gray-100 p-2 rounded-md cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block font-semibold">Address</label>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold">Phone</label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>

        <button
          onClick={handleSaveProfile}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Profile
        </button>
      </div>

      {/* Change Password */}
      <div className="mt-10 border-t pt-6">
        <h3 className="text-xl font-semibold mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={userData.newPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <button
            onClick={handleChangePassword}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
