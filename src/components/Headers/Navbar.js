import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLogin } from '../Authentications/Auth';

const Navbar = () => {
  const navigate = useNavigate();
  const loggedIn = isLogin();  // 👈 Function call correct kiya

  return (
    <div>
      <ul className='flex gap-x-2 bg-gray-700 text-white p-2'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>

        <div className='ml-auto mr-4'>
          {loggedIn && (
            <button
              className="flex gap-x-2 justify-end text-white cursor-pointer hover:bg-yellow-500 hover:text-black hover:rounded-sm px-4 "
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
