// src/pages/Login.js
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Authentications/Auth';

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateFields = () => {
    let newErrors = {};
    const emailExpr = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordExpr = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%&*]{6,}$/;

    if (!inputValue.email) newErrors.email = "Email is required";
    else if (!emailExpr.test(inputValue.email)) newErrors.email = "Invalid email format";

    if (!inputValue.password) newErrors.password = "Password is required";
    else if (!passwordExpr.test(inputValue.password))
      newErrors.password = "Password must include uppercase, lowercase and number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    const formData = new FormData();
    formData.append('email', inputValue.email);
    formData.append('password', inputValue.password);

    axios.post('https://localhost:7219/login', formData)
      .then((res) => {
        if (res.data?.data) {
          loginUser(res.data.data); // 
          setInputValue({ email: '', password: '' });
          navigate('/user/userDashboard');
          window.location.reload(); // 
        } else {
          alert("Login failed. Please try again.");
        }
      })
      .catch(() => {
        alert("An error occurred. Please check your credentials.");
        setInputValue({ email: '', password: '' });
      });
  };

  return (
    <div className='http://localhost:3000/'>

      <div className='max-w-md mx-auto mt-9 mb-5 p-6 border border-gray-500 rounded-md shadow-lg'>
        <h2 className='text-center text-3xl font-bold mb-4 text-gray-800'>Login</h2>
        <form onSubmit={formSubmit} className='flex flex-col space-y-5'>
          <div>
            <label className='font-semibold'>Email:</label>
            <input
              type='text'
              name='email'
              value={inputValue.email}
              onChange={inputChangeHandler}
              placeholder='Enter your email'
              className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
            />
            {errors.email && <span className='text-red-600'>{errors.email}</span>}
          </div>
          <div>
            <label className='font-semibold'>Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              value={inputValue.password}
              onChange={inputChangeHandler}
              placeholder='Enter your password'
              className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
            />
            {errors.password && <span className='text-red-600'>{errors.password}</span>}
          </div>
          {/* <div className='flex items-center space-x-2'>
            <input
              type=''
              id='showPassword'
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className='w-4 h-4'
            />
            {/* <label htmlFor='showPassword' className='text-black font-medium'>Show Password</label> */}
          {/* </div>  */}
          <button className="bg-yellow-500 text-black font-semibold rounded-md p-2 hover:bg-yellow-500 hover:scale-105 hover:shadow-lg">
            Login
          </button>
          <h5 className='m-1'>
            Forgot your Password ? &nbsp;
            <span
              onClick={() => navigate("/forgotPassword")}
              className="text-black font-bold cursor-pointer hover:text-green-900"
            >
              Forgot password
            </span>
          </h5>
          <h5 className='m-1'>
            Don't have an account ? &nbsp;
            <span
              onClick={() => navigate("/register")}
              className="text-black font-bold cursor-pointer hover:text-green-900"
            >
              Sign Up
            </span>
          </h5>


        </form>
      </div>
    </div>
  );
};

export default Login;
