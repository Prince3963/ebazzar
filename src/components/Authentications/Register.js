import axios from "axios";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPass: "",
  });

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  const inputChangeHandle = (e) => {
    const { name, value } = e.target;
    setInputValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateFields = () => {
    let newErrors = {};
    let focusingError = null;

    const emailExpr = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordExpr = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%&*]{6,}$/;

    if (!inputValue.username.trim()) {
      newErrors.username = "Username is required";
      focusingError = focusingError || "username";
    }

    if (!inputValue.email) {
      newErrors.email = "Email is required";
      focusingError = focusingError || "email";
    } else if (!emailExpr.test(inputValue.email)) {
      newErrors.email = "Invalid email format";
      focusingError = focusingError || "email";
    }

    if (!inputValue.mobile) {
      newErrors.mobile = "Mobile number is required";
      focusingError = focusingError || "mobile";
    } else if (!/^\d{10}$/.test(inputValue.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
      focusingError = focusingError || "mobile";
    }

    if (!inputValue.password) {
      newErrors.password = "Password is required";
      focusingError = focusingError || "password";
    } else if (!passwordExpr.test(inputValue.password)) {
      newErrors.password = "Password must have at least 1 uppercase, 1 lowercase, and 1 number";
      focusingError = focusingError || "password";
    }

    if (!inputValue.confirmPass) {
      newErrors.confirmPass = "Confirm Password is required";
      focusingError = focusingError || "confirmPass";
    } else if (inputValue.confirmPass !== inputValue.password) {
      newErrors.confirmPass = "Passwords do not match";
      focusingError = focusingError || "confirmPass";
    }

    setErrors(newErrors);

    if (focusingError) {
      document.getElementsByName(focusingError)[0]?.focus();
      return false;
    }

    return true;
  };

  const formSubmit = (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    const formData = new FormData();
    formData.append("username", inputValue.username);
    formData.append("password", inputValue.password);
    formData.append("email", inputValue.email);
    formData.append("mobile", inputValue.mobile);

    axios.post(`https://localhost:7219/api/User`, formData)
      .then((response) => {
        if (response.data.data === "0") {
          setApiError("**Email already exists");
        } else {
          navigate("/login");
          setInputValue({
            username: "",
            email: "",
            mobile: "",
            password: "",
            confirmPass: "",
          });
        }
      })
      .catch((error) => {
        alert("Please try again later.");
        console.error("Error:", error);
        setInputValue({
          username: "",
          email: "",
          mobile: "",
          password: "",
          confirmPass: "",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-800 to-blue-900 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>

        <form onSubmit={formSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={inputValue.username}
              onChange={inputChangeHandle}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            {errors.username && <span className="text-red-600 text-sm">{errors.username}</span>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="text"
              name="email"
              value={inputValue.email}
              onChange={inputChangeHandle}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            {errors.email && <span className="text-red-600 text-sm">{errors.email}</span>}
            {apiError && <div className="text-red-600 text-sm mt-1">{apiError}</div>}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Mobile No</label>
            <input
              type="number"
              name="mobile"
              value={inputValue.mobile}
              onChange={inputChangeHandle}
              placeholder="Enter your mobile number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            {errors.mobile && <span className="text-red-600 text-sm">{errors.mobile}</span>}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={inputValue.password}
              onChange={inputChangeHandle}
              placeholder="Enter your password"
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-[42px] cursor-pointer text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && <span className="text-red-600 text-sm">{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPass"
              value={inputValue.confirmPass}
              onChange={inputChangeHandle}
              placeholder="Confirm your password"
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            <span
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-[42px] cursor-pointer text-gray-600"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.confirmPass && <span className="text-red-600 text-sm">{errors.confirmPass}</span>}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-700">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-cyan-700 font-bold cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
