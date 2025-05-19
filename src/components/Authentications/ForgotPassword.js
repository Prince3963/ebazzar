import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [inputValue, setInputValue] = useState({ email: '' });
  const [errors, setErrors] = useState({});

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const navigate = useNavigate()
  const validateFields = () => {
    const emailExpr = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let newErrors = {};

    if (!inputValue.email) {
      newErrors.email = "Email is required";
    } else if (!emailExpr.test(inputValue.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    // Placeholder for backend call
    alert(`Reset link sent to: ${inputValue.email}`);
    // Optionally store email in localStorage to pre-fill on login
    localStorage.setItem('savedEmail', inputValue.email);

    // Clear form
    setInputValue({ email: '' });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 m-2 border border-gray-500 rounded-md shadow-lg ">
      <h2 className="text-center text-3xl font-bold mb-4 text-gray-800 ">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
        <div>
          <label className="font-semibold">Email:</label>
          <input
            type="text"
            name="email"
            value={inputValue.email}
            onChange={inputChangeHandler}
            placeholder="Enter your email"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <span className="text-red-600">{errors.email}</span>}
        </div>
        <button
          type="submit"
          className="bg-yellow-500 text-black font-semibold rounded-md p-2 hover:bg-yellow-500 hover:scale-105 hover:shadow-lg"
        >
          Reset Password
        </button>
      </form>
      <h5 className='m-1'>
        Do you want to sign in? &nbsp;
        <span
          onClick={() => navigate("/login")}
          className="text-black font-bold cursor-pointer hover:text-green-900"
        >
          Sign In
        </span>
        
      </h5>
    </div>
  );
};

export default ForgotPassword;
