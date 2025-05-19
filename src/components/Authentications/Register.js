import axios from "axios";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');

  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPass: "",
  });

  const [errors, setErrors] = useState({});

  // Eye toggle states
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
          setApiError("**Email already exist")
        } else {
          navigate("/login")
          // console.log("barabar 6e ");
          
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
    <div className="max-w-md mx-auto mt-9 mb-5 flex gap-4 p-6 border border-gray-500 rounded-md flex-col shadow-lg">
      <h2 className="text-center text-3xl font-bold mb-4 text-gray-800">Registration</h2>


      <form onSubmit={formSubmit} className="flex flex-col space-y-5">
        {/* Username */}
        <div>
          <label className="block font-semibold text-gray-700">Username:</label>
          <input
            type="text"
            name="username"
            value={inputValue.username}
            onChange={inputChangeHandle}
            placeholder="Enter your username"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          {errors.username && <span className="text-red-600">{errors.username}</span>}
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold text-gray-700">Email:</label>
          <input
            type="text"
            name="email"
            value={inputValue.email}
            onChange={inputChangeHandle}
            placeholder="Enter your email"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <span className="text-red-600">{errors.email}</span>}
                {apiError && (
                  <div className=" text-red-600 rounded">
                    {apiError}
                  </div>
                )}
          
        </div>

        {/* Mobile */}
        <div>
          <label className="block font-semibold text-gray-700">Mobile no:</label>
          <input
            type="number"
            name="mobile"
            value={inputValue.mobile}
            onChange={inputChangeHandle}
            placeholder="Enter your mobile number"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.mobile && <span className="text-red-600">{errors.mobile}</span>}
        </div>

        {/* Password with toggle */}
        <div className="relative">
          <label className="block font-semibold text-gray-700">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={inputValue.password}
            onChange={inputChangeHandle}
            placeholder="Enter your password"
            className="w-full p-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password && <span className="text-red-600">{errors.password}</span>}
        </div>

        {/* Confirm Password with toggle */}
        <div className="relative">
          <label className="block font-semibold text-gray-700">Confirm Password:</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPass"
            value={inputValue.confirmPass}
            onChange={inputChangeHandle}
            placeholder="Confirm your password"
            className="w-full p-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span
            onClick={toggleConfirmPasswordVisibility}
            className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.confirmPass && <span className="text-red-600">{errors.confirmPass}</span>}
        </div>

        <button
          id="registerbtn"
          className="bg-yellow-500 text-black font-semibold rounded-md p-2 hover:bg-yellow-500 hover:scale-105 hover:shadow-lg">
          Register
        </button>
      </form>

      <h5>
        Already have an account?{" "}
        <a
          onClick={() => navigate("/login")}
          className="text-black cursor-pointer font-bold hover:text-green-900"
        >
        &nbsp;Sign in
        </a>
      </h5>

      
    </div>
  );
};

export default Register;
