import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gradient-to-b from-cyan-800 to-blue-900 text-white p-6 space-y-6 shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6 border-b border-cyan-500 pb-2">Admin Panel</h1>

      <nav className="flex flex-col gap-2">
        <Link
          to="/admin"
          className="px-4 py-2 rounded-lg hover:bg-yellow-500 hover:text-black transition duration-200"
        >
          Dashboard
        </Link>
        <Link
          to="/admin/product"
          className="px-4 py-2 rounded-lg hover:bg-yellow-500 hover:text-black transition duration-200"
        >
          Products
        </Link>
        <Link
          to="/admin/order"
          className="px-4 py-2 rounded-lg hover:bg-yellow-500 hover:text-black transition duration-200"
        >
          Orders
        </Link>
        <Link
          to="/admin/coustomer"
          className="px-4 py-2 rounded-lg hover:bg-yellow-500 hover:text-black transition duration-200"
        >
          Customers
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
