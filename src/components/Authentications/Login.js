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
        if (res.data.data !== "0") {
          
          navigate('/user/userDashboard');
          loginUser(res.data.data);
          console.log(res.data);
          
          setInputValue({ email: '', password: '' });
        } else {
          alert("Login failed. Please try again.");
        }
      })
      .catch(() => {
        
        setInputValue({ email: '', password: '' });
      });
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-200 to-indigo-400 px-4'>
      <div className='w-full max-w-md bg-yellow-50 backdrop-blur-md rounded-xl shadow-lg p-8'>
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-6'>Login</h2>

        <form onSubmit={formSubmit} className='space-y-5'>

          <div>
            <label className='block text-gray-700 font-semibold mb-1'>Email</label>
            <input
              type='text'
              name='email'
              value={inputValue.email}
              onChange={inputChangeHandler}
              placeholder='Enter your email'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600'
            />
            {errors.email && <p className='text-sm text-red-600 mt-1'>{errors.email}</p>}
          </div>

          <div>
            <label className='block text-gray-700 font-semibold mb-1'>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              value={inputValue.password}
              onChange={inputChangeHandler}
              placeholder='Enter your password'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600'
            />
            {errors.password && <p className='text-sm text-red-600 mt-1'>{errors.password}</p>}
          </div>

          <div className='flex items-center'>
            <input
              type='checkbox'
              id='showPassword'
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className='w-4 h-4 text-cyan-600 focus:ring-cyan-600'
            />
            <label htmlFor='showPassword' className='ml-2 text-sm text-gray-700'>Show Password</label>
          </div>

          <button
            type='submit'
            className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-800 hover:to-blue-700 text-white font-semibold rounded-lg transition duration-200"
          >
            Login
          </button>

          <div className='text-sm text-center text-gray-700 mt-2'>
            Forgot your Password?{" "}
            <span
              onClick={() => navigate("/forgotPassword")}
              className="text-cyan-700 font-bold cursor-pointer hover:underline"
            >
              Forgot Password
            </span>
          </div>

          <div className='text-sm text-center text-gray-700'>
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-cyan-700 font-bold cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
