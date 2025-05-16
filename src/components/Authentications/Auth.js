// src/Authentications/Auth.js

// Save token on login
export const loginUser = (token) => {
  document.cookie = `token=${token}; path=/; max-age=3600`;
};

// Remove token on logout
export const logoutUser = (navigate) => {
  document.cookie = "token=; path=/; max-age=0";
  navigate("/");
};

// Check login status
export const isLogin = () => {
  return document.cookie
    .split(";")
    .some((item) => item.trim().startsWith("token="));
};
