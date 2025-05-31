// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLogin, logoutUser } from '../Authentications/Auth';

const Navbar = () => {
  const navigate = useNavigate();
  const loggedIn = isLogin();

  return (
    <div>
      <ul className='flex gap-x-4 bg-gray-700 text-white p-2 items-center'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/electronic">Electronic</Link></li>


        <div className='ml-auto flex gap-x-4 items-center'>
          <li><Link to="/order">Order</Link></li>

          {loggedIn && <li><Link to="/profile">Profile</Link></li>}
          
          <li><Link to="/cart">Cart</Link></li>
          {loggedIn ? (
            <button
              className="hover:bg-yellow-500 hover:text-black hover:rounded-sm px-4 py-1"
              onClick={() => {
                logoutUser(navigate);
                window.location.reload();
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className="hover:bg-yellow-500 hover:text-black hover:rounded-sm px-4 py-1"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
