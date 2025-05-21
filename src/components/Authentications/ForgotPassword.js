import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [inputValue, setInputValue] = useState({ email: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState({ type: '', text: '' });

  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setResponseMessage({ type: '', text: '' });
  };

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

    setResponseMessage({ type: '', text: '' });

    axios.post(`https://localhost:7219/api/User/ForgotPassword`, inputValue, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then((response) => {
      if (response.data.status === false) {
        setResponseMessage({ type: 'error', text: 'Email does not exist!' });
      } else {
        setResponseMessage({ type: 'success', text: 'Reset link sent to your registered email.' });
        setInputValue({ email: '' });
      }
    })
    .catch((err) => {
      setResponseMessage({ type: 'error', text: 'Something went wrong. Please try again later.' });
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-800 to-blue-900 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Forgot Password</h2>

        {/* Response Message */}
        {responseMessage.text && (
          <div className={`mb-4 text-sm font-semibold ${responseMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {responseMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={inputValue.email}
              onChange={inputChangeHandler}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            {errors.email && <span className="text-red-600 text-sm">{errors.email}</span>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg transition duration-200"
          >
            Reset Password
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-700">
          Remember your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-cyan-700 font-bold cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
