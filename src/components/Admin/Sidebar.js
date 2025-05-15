import React from 'react'
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    
    <div className="w-64 h-screen bg-blue-900 text-white p-5 space-y-4">
      <h1 className="text-xl font-bold">AdminPanel</h1>
      <nav className="flex flex-col space-y-2">
        <Link to={"/admin"} className="hover:bg-yellow-600 p-2 rounded">Dashboard</Link>
        <Link to={"/admin/product"} className="hover:bg-yellow-600 p-2 rounded">Products</Link>
        <Link to={"/admin/order"} className="hover:bg-yellow-600 p-2 rounded">Orders</Link>
        <Link to={"/admin/coustomer"}  className="hover:bg-yellow-600 p-2 rounded">Customers</Link>
      </nav>
    </div>
  );
};

  


export default Sidebar