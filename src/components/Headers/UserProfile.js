import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing Font Awesome Icons

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  // Fetch the user data using the API
  useEffect(() => {
    axios.get('https://localhost:7219/api/User/getUserData', {
      headers: {
        "Authorization": "Bearer " + getCookie("token")
      }
    })
      .then(response => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        setError("Kuch gadbad ho gayi!");
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Function to handle profile update
  const handleUpdateProfile = () => {
    axios.put(`https://localhost:7219/api/User/${userData.user_id}`, // Assuming user_id is in userData
      {
        username: userData.username,
        email: userData.email,
        mobile: userData.mobile,
        password: userData.password // Send the new password if updated
      },
      {
        headers: {
          "Authorization": "Bearer " + getCookie("token")
        }
      })
      .then(response => {
        // Handle success
        // alert("Profile updated successfully!");
      })
      .catch(error => {
        console.error("Error updating profile:", error);
        setError("Profile update failed!");
      });
  };

  if (loading) return <div className="text-center text-gray-500 font-medium">Loading...</div>;
  if (error) return <div className="text-center text-red-500 font-medium">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">User Profile</h2>

        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Username</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={userData.username}
              className="border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="text"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={userData.mobile}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field with Toggle */}
          <div className="flex flex-col relative">
            <label className="text-gray-700 font-medium">Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"} // Toggle password visibility
                name="password"
                value={userData.password || ''} // Default empty value if not available
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" // Added padding-right for icon
              />
              {/* Toggle Password Visibility Icon */}
              <span
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              >
                {passwordVisible ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleUpdateProfile}
              className="w-full sm:w-auto bg-blue-600 text-white font-semibold rounded-lg px-6 py-3 shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
