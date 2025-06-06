import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLogin, logoutUser } from '../Authentications/Auth';
import { CartContext } from '../User/CartContext';
import { Badge } from 'primereact/badge';
import { Dropdown } from 'primereact/dropdown';

const Navbar = () => {
  const navigate = useNavigate();
  const loggedIn = isLogin();
  const { cartItems } = useContext(CartContext);

  const [selectedCategory, setSelectedCategory] = useState(null);

  // Guest cart count state
  const [guestCartCount, setGuestCartCount] = useState(() => {
    const items = JSON.parse(localStorage.getItem("guest_cart") || "[]");
    return items.length;
  });

  // Sync guest cart count with localStorage changes
  useEffect(() => {
  if (!loggedIn) {
    const interval = setInterval(() => {
      const items = JSON.parse(localStorage.getItem("guest_cart") || "[]");
      setGuestCartCount(items.length);
    }, 500);
    return () => clearInterval(interval);
  }
}, [loggedIn]);


  // Calculate the correct cart item count
  const cartItemCount = loggedIn ? cartItems.length : guestCartCount;

  const categories = [
    { label: 'All', value :'/'},
    { label: 'Electronic', value: '/electronic' },
    { label: 'Cloth', value: '/cloth' },
    { label: 'Home Appliance', value: '/homeAppliance' },
    { label: 'Books', value: '/books' }
  ];

  // Track cart changes (both logged in and guest)
  useEffect(() => {
    console.log("Cart items updated:", cartItems);
    console.log("Guest Cart Count:", guestCartCount);
  }, [cartItems, guestCartCount]); 

  return (
    <div>
      <ul className='flex gap-x-4 bg-gray-800 text-white p-2 items-center'>
        <li><Link to="/" className="hover:text-yellow-400 transition">Home</Link></li>
        <li><Link to="/about" className="hover:text-yellow-400 transition">About</Link></li>
        <li><Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link></li>

        <li className="relative">
          <div className="w-40">
            <Dropdown
              value={selectedCategory}
              options={categories}
              onChange={(e) => {
                setSelectedCategory(e.value);
                navigate(e.value);
              }}
              placeholder="Categories"
              className="w-full p-2 text-white border border-gray-600"
              panelClassName=" text-white border border-gray-600 shadow-lg"
              itemTemplate={(option) => (
                <div className="p-2">
                  {option.label}
                </div>
              )}
            />
          </div>
        </li>

        <div className='ml-auto flex gap-x-4 items-center'>
          {loggedIn && <li><Link to="/order">Order</Link></li>}
          {loggedIn && <li><Link to="/profile">Profile</Link></li>}

          <li className="relative">
            <Link to="/cart" className="flex items-center">
              Cart
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
