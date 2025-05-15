// src/Authentications/Auth.js

// Save token on login
export const loginUser = (token) => {
  sessionStorage.setItem("token", token);
};

// Remove token on logout
// export const logoutUser = (navigate) => {
//   sessionStorage.removeItem("token");
//   navigate("/login");
// };

// Check login status
export const isLogin = () => {
  return !!sessionStorage.getItem("token");
};
