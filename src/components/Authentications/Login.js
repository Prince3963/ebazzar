import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  // Initialized States for Input values
  const [inputValue, setInputValue] = useState({
    email: '',
    password: ''
  });

  // Initialized password state
  const [showPassword, setShowPassword] = useState(false);


  // Initialized States for errors
  const [errors, setErrors] = useState({});

  // InputChange Handler 
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue((prevValue) => ({
      ...prevValue,
      [name]: value
    }));

    // Remove error for the field as user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ""
    }));
  };

  // Function to Validate Fields
  const validateFields = () => {
    let newErrors = {};
    const emailExpr = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordExpr = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%&*]{6,}$/;

    // Email Validation
    if (!inputValue.email) {
      newErrors.email = "Email is required";
    } else if (!emailExpr.test(inputValue.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password Validation
    if (!inputValue.password) {
      newErrors.password = "Password is required";
    } else if (!passwordExpr.test(inputValue.password)) {
      newErrors.password = "Password must have at least 1 uppercase letter, 1 lowercase letter, and 1 number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, return true
  };

  //Toggle function for Show password
  const showPasswordToggel = () => {
    setShowPassword(preState => !preState)
  };

  // Form Submit Handler
  const formSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!validateFields()) {
      return; // Stop if validation fails
    }

    const formData = new FormData();
    formData.append('email', inputValue.email);
    formData.append('password', inputValue.password);

    axios.post('https://localhost:7219/login', formData)
      .then((responseNoObject) => {
        console.log("Response from backend:", responseNoObject);  // Log the full response to inspect it
        if (responseNoObject.data && responseNoObject.data.data) {
          sessionStorage.setItem('jwtToken', responseNoObject.data.data);  // Set JWT token in sessionStorage
          setInputValue({
            email: '',
            password: ''
          });
          navigate('/user/userDashboard');
        } else {
          console.error("JWT not found in the response.");
          alert("Login failed. Please try again.");
        }
      })
      .catch((errorNoObject) => {
        console.error("Error occurred:", errorNoObject);  // Log error
        alert("An error occurred. Please check your credentials and try again.");
        setInputValue({
          email: '',
          password: ''
        });
      });
  };


  return (
    <div className='max-w-md mx-auto mt-9 mb-5 flex gap-4 p-6 border border-gray-500 rounded-md flex-col shadow-lg'>
      <h2 className='text-center text-3xl font-bold mb-4 text-gray-800'>Login</h2>

      <form onSubmit={formSubmit} className='flex flex-col space-y-5'>

        {/* Email */}
        <div>
          <label className='block font-semibold text-gray-700 focus:outline-none'>Email :</label>
          <input
            type='text'
            id='email'
            name='email'
            value={inputValue.email}
            onChange={inputChangeHandler} // Handling input changes
            placeholder='Enter your email'
            className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {errors.email && <span className='text-red-600'>{errors.email}</span>} {/* Show error */}
        </div>

        {/* Password */}
        <div>
          <label className='block font-semibold text-gray-700'>Password :</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id='password'
            name='password'
            value={inputValue.password}
            onChange={inputChangeHandler} // Handling input changes
            placeholder='Enter your password'
            className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {errors.password && <span className='text-red-600'>{errors.password}</span>} {/* Show error */}
        </div>

        {/* Show Password Checkbox */}
        <div className='flex items-center space-x-2 '>
          <input
            type='checkbox'
            id='showPassword'
            checked={showPassword}
            onChange={showPasswordToggel}
            className='w-4 h-4 cursor-pointer'
          />
          <label htmlFor='show Password' className='text-black font-medium'>Show Password</label>
        </div>

        {/* Login Button */}
        <button className='bg-yellow-500 border rounded-md p-2 transition duration-300 hover:bg-yellow-400 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500'>
          Login
        </button>

        <h5>
        Register?{" "}
        <a
          onClick={() => navigate("/register")}
          className="text-black cursor-pointer font-bold hover:text-green-900"
        >
          Sign in
        </a>
      </h5>

      </form>
    </div>
  );
};

export default Login;
