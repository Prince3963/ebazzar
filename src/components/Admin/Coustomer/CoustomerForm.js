import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerForm = ({ user, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    role_id: '',
    status: 'active', // Default status
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        password: user.password,
        role_id: user.role_id,
        status: user.status || 'active', // Set initial status
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]?.toString());
    }

    if (user) {
      axios.put(`https://localhost:7219/api/User/updateUser/${user.user_id}`, form)
        .then(() => {
          onRefresh();
          onClose();
        })
        .catch((err) => {
          console.error("Error updating user:", err);
        });
    } else {
      axios.post("https://localhost:7219/api/User/addUser", form)
        .then(() => {
          onRefresh();
          onClose();
        })
        .catch((err) => {
          console.error("Error adding user:", err);
        });
    }
  };

  // Handle status change by admin
  const handleStatusChange = (newStatus) => {
    setFormData({
      ...formData,
      status: newStatus,
    });

    if (user) {
      axios.put(`https://localhost:7219/api/User/updateStatus/${user.user_id}`, { status: newStatus })
        .then(() => {
          console.log(`User status updated to ${newStatus}`);
        })
        .catch((err) => {
          console.error("Error updating status:", err);
        });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{user ? 'Edit' : 'Add'} User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="username" placeholder="Username" className="w-full p-2 border" value={formData.username} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" className="w-full p-2 border" value={formData.email} onChange={handleChange} required />
          <input name="mobile" placeholder="Mobile" className="w-full p-2 border" value={formData.mobile} onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" className="w-full p-2 border" value={formData.password} onChange={handleChange} required />
          
          <select
            name="role_id"
            className="w-full p-2 border"
            value={formData.role_id}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="1">Admin</option>
            <option value="2">User</option>
          </select>

          {/* Status Selection */}
          {user && user.role_id === '1' && ( // Only for Admin
            <div className="flex items-center space-x-2">
              <label>Status:</label>
              <button
                type="button"
                onClick={() => handleStatusChange('active')}
                className={`px-4 py-2 rounded ${formData.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}`}
              >
                Active
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange('inactive')}
                className={`px-4 py-2 rounded ${formData.status === 'inactive' ? 'bg-red-500' : 'bg-gray-500'}`}
              >
                Inactive
              </button>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <button type="button" className="px-4 py-2 hover:bg-yellow-600 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
            <button type="submit" className="px-4 py-2 hover:bg-yellow-600 bg-blue-600 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
