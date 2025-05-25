import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const navigate = useNavigate();

  const [forgotPasswordToken, setForgotPasswordToken] = useState(null)
  const [inputData, setInputData] = useState({
    forgotPassword: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };


  const [inpurError, setInputError] = useState({
    forgotPassword: '',
    confirmPassword: '',
  })

  const [apiResponse, setAPIResponse] = useState({
    error: '',
    message: '',
  })

  const handleInputChage = (e) => {
    const { name, value } = e.target;

    setInputData((preValue) => ({
      ...preValue,
      [name]: value
    }));

    setInputError((preValue) => ({
      ...preValue,
      [name]: ''
    }));

    setAPIResponse({ error: '', message: '' })
  }

  //when we need to perform some fucntionality at a specific time then we used useeffect Hook
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    if (token) {
      setForgotPasswordToken(token)
    } else {
      navigate('/login')
    }
  }, [navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = {}
    const formData = new FormData()
    //When we store the value in our databse then we use FormData
    // And make sure the value which we append it must be same spel with Database Column

    formData.append('forgotPasswordToken', forgotPasswordToken)
    formData.append('forgotPassword', inputData.forgotPassword)

    if (!inputData.forgotPassword) {
      error.forgotPassword = "Password is empty";
    }

    if (!inputData.confirmPassword) {
      error.confirmPassword = "confirmPassword is empty";
    }

    if (inputData.forgotPassword !== inputData.confirmPassword) {
      error.confirmPassword = "Password doesn't match";
    }

    axios.post(`https://localhost:7219/api/User/resetPassword`, formData).then((res) => {
      if (res.data.status === false) {
        setAPIResponse({
          message: "Your token has expired!\n Please try again.",
          type: "error"
        })
        setInputData({
          forgotPassword: '',
          confirmPassword: ''
        })
        navigate('/forgotPassword')
      } else {
        setAPIResponse({
          message: "Password reset successfully.",
          type: "success"
        })
        setInputData({
          forgotPassword: '',
          confirmPassword: '',
        })
        navigate('/login')
      }
    }).catch((error) => {
      setAPIResponse({
        message: "Please try again later.",
        type: "error"
      })
      setInputData({
        forgotPassword: '',
        confirmPassword: '',
      })
    })

  };

  return (
    // <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-cyan-800 to-blue-900 px-4">
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-200 to-indigo-400 px-4'>
      <div className="bg-yellow-50 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Reset Your Password
        </h1>

        <form onSubmit={handleSubmit}>
          {/* New Password Field */}
          <div className="mb-5 relative">
            <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="forgotPassword"
              name="forgotPassword"
              value={inputData.forgotPassword}
              onChange={handleInputChage}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 transition"
              placeholder="Enter new password"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6 relative">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={inputData.confirmPassword}
              onChange={handleInputChage}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 transition"
              placeholder="Confirm your password"
            />
          </div>

          {/* Show Password */}
          <div className="flex items-center  mb-6">
            <input
              type="checkbox"
              id="showPassword"
              className="mr-2"
              checked={showPassword}
              onChange={togglePasswordVisibility}
            />
            <label htmlFor="showPassword" className="text-sm text-gray-700">Show Password</label>
          </div>


          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-yellow-500 hover:to-yellow-300 text-white hover:text-black font-semibold transition duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
