import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-blue-400 via-white to-indigo-400 p-6 space-y-6 shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6 pb-2 border-b-2 border-cyan-500 inline-block mx-auto">
        Admin Panel
      </h1>

      <nav className="flex flex-col gap-2">
        <Link
          to="/admin"
          className={`px-4 py-2 rounded-lg transition duration-200 ${
            isActive('/admin') ? 'bg-yellow-500 text-black' : 'hover:bg-yellow-500 hover:text-black'
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/admin/product"
          className={`px-4 py-2 rounded-lg transition duration-200 ${
            isActive('/admin/product') ? 'bg-yellow-500 text-black' : 'hover:bg-yellow-500 hover:text-black'
          }`}
        >
          Products
        </Link>

        <Link
          to="/admin/orders"
          className={`px-4 py-2 rounded-lg transition duration-200 ${
            isActive('/admin/order') ? 'bg-yellow-500 text-black' : 'hover:bg-yellow-500 hover:text-black'
          }`}
        >
          Orders
        </Link>
        
        <Link
          to="/admin/customer"
          className={`px-4 py-2 rounded-lg transition duration-200 ${
            isActive('/admin/coustomer') ? 'bg-yellow-500 text-black' : 'hover:bg-yellow-500 hover:text-black'
          }`}
        >
          Customers
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
