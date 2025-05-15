import React from 'react';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

    <Sidebar/>
      {/* Main Content */}
      <div className="flex-1 p-6">
        
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Hello, Admin</span>
            <img
              // src="https://i.pravatar.cc/40"
              alt="Admin"
              className="rounded-full w-10 h-10"
            />
          </div>
        </header>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-gray-700">Total Products</h3>
            <p className="text-3xl font-bold text-blue-800 mt-2">128</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
            <p className="text-3xl font-bold text-blue-800 mt-2">342</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
            <p className="text-3xl font-bold text-blue-800 mt-2">96</p>
          </div>
        </div>

        
      </div>
    </div>
  );
};
  

export default Dashboard;
