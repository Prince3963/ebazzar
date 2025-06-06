import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import img from '../Image/TriBase.png';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [userId, setUserId] = useState(null);

  // Cookie se token nikalne ka function
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  // JWT parse karne ka function
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  // Component mount hone par user data fetch karo
  useEffect(() => {
    const token = getCookie("token");
    const decoded = parseJwt(token);
    if (decoded?.user_id) {
      setUserId(decoded.user_id);

      axios
        .get("https://localhost:7219/api/User/getUserData", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setUserData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setError("Kuch gadbad ho gayi!");
          setLoading(false);
        });
    } else {
      setError("User ID token se nahi mil paya.");
      setLoading(false);
    }
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // ✅ Password update function updated for new backend API
  const handleUpdatePassword = async () => {
    const token = getCookie("token");

    if (!newPassword || newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      await axios.patch(
        `https://localhost:7219/api/User/userPassword/${userId}`,
        { password: newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // alert("Password updated successfully!");
      setShowPasswordField(false);
      setNewPassword("");
    } catch (err) {
      console.error("Password update failed:", err);
      // alert("Failed to update password. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="text-center text-gray-500 font-medium">Loading...</div>
    );
  if (error)
    return <div className="text-center text-red-500 font-medium">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8 space-y-8">
        {/* Static Profile Image */}
        <div className="flex flex-col items-center border-indigo-800 space-y-3">
          <img
            src={img} // You can use your own image URL or a local asset
            alt="User"
            className="w-24 h-24 rounded-full shadow-md object-cover border-2 border-blue-500"
          />
          <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-500 font-medium">Username</label>
            <input
              type="text"
              disabled
              value={userData?.username || ""}
              className="mt-1 w-full bg-gray-100 border border-gray-300 rounded-md p-3 text-gray-700"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 font-medium">Email</label>
            <input
              type="text"
              disabled
              value={userData?.email || ""}
              className="mt-1 w-full bg-gray-100 border border-gray-300 rounded-md p-3 text-gray-700"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 font-medium">Mobile</label>
            <input
              type="text"
              disabled
              value={userData?.mobile || ""}
              className="mt-1 w-full bg-gray-100 border border-gray-300 rounded-md p-3 text-gray-700"
            />
          </div>
          <div>{showPasswordField && (
            <div className="space-y-4 animate-fade-in">
              <div className="relative">
                <label className="text-sm text-gray-500 font-medium">New Password</label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-md p-3 pr-12 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute top-14 right-4 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </div>
              </div>
            </div>

          )} </div>
        </div>

        {/* Change Password Toggle */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowPasswordField(!showPasswordField)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
          >
            {showPasswordField ? "Cancel Password Change" : "Change Password"}
          </button>
        </div>

        {/* Password Field Below Mobile */}
        <div className="flex justify-center">
          <button
            onClick={handleUpdatePassword}
            className="bg-blue-600 text-white font-semibold rounded-lg px-6 py-3 shadow hover:bg-blue-700 transition duration-200"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );

}

export default UserProfile;
