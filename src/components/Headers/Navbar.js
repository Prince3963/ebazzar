import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLogin, logoutUser } from '../Authentications/Auth';
import { CartContext } from '../User/CartContext';  // Import the CartContext
import { Badge } from 'primereact/badge';
import { Dropdown } from 'primereact/dropdown'; // Import the Dropdown component

const Navbar = () => {
  const navigate = useNavigate();
  const loggedIn = isLogin();
  const { cartItems } = useContext(CartContext); // Consume the CartContext

  // Get the total number of items in the cart
  const cartItemCount = cartItems.reduce((acc) => acc + 1, 0);

  // Categories for dropdown
  const categories = [
    { label: 'Electronic', value: '/electronic' },
    { label: 'Cloth', value: '/cloth' }
  ];

  return (
    <div>
      <ul className='flex gap-x-4 bg-gray-700 text-white p-2 items-center'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <div className='bg-gray-700 text-white p-2 items-center'>
          <li className="relative">
            <Dropdown
              options={categories}
              onChange={(e) => navigate(e.value)}
              placeholder="Categories"
              className="w-32 p-1"
            />
          </li>
        </div>
        <div className='ml-auto flex gap-x-4 items-center'>
          {loggedIn && <li><Link to="/order">Order</Link></li>}

          {loggedIn && <li><Link to="/profile">Profile</Link></li>}

          <li className="relative">
            <Link to="/cart" className="flex items-center">
              Cart
              {/* Badge to show number of items */}
              {cartItemCount > 0 && (
                <Badge value={cartItemCount} severity="danger" className="ml-2" />
              )}
            </Link>
          </li>

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
