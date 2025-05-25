import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gradient-to-b from-blue-400 via-white to-indigo-400  p-6 space-y-6 shadow-lg">
{/* <div className='min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-200 px-4'> */}
  <h1 className="text-2xl font-bold text-center mb-6 pb-2 border-b-2 border-cyan-500 inline-block mx-auto">
    Admin Panel
  </h1>

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
