import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          User Profile
        </h2>

        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Username</label>
            <input
              type="text"
              name="username"
              disabled
              value={userData?.username || ""}
              className="border border-gray-300 rounded-lg p-3 text-gray-700"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="text"
              name="email"
              disabled
              value={userData?.email || ""}
              className="border border-gray-300 rounded-lg p-3 text-gray-700"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Mobile</label>
            <input
              type="text"
              name="mobile"
              disabled
              value={userData?.mobile || ""}
              className="border border-gray-300 rounded-lg p-3 text-gray-700"
            />
          </div>

          <div className="text-right">
            <button
              onClick={() => setShowPasswordField(!showPasswordField)}
              className="text-sm text-blue-600 hover:underline"
            >
              {showPasswordField
                ? "Cancel Password Change"
                : "Change Password"}
            </button>
          </div>

          {showPasswordField && (
            <div className="flex flex-col relative">
              <label className="text-gray-700 font-medium">New Password</label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 pr-10"
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                >
                  {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>
          )}

          {showPasswordField && (
            <div className="flex justify-center">
              <button
                onClick={handleUpdatePassword}
                className="w-full sm:w-auto bg-blue-600 text-white font-semibold rounded-lg px-6 py-3 shadow-md hover:bg-blue-700"
              >
                Update Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
