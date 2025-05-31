// CustomerTable.js

import React from 'react';

const CustomerTable = ({ customers, onUpdateStatus }) => {
  return (
    <table className="min-w-full border mt-4">
      <thead>
        <tr className="bg-gray-200 text-left">
          <th className="p-2">Username</th>
          <th className="p-2">Email</th>
          <th className="p-2">Mobile</th>
          <th className="p-2">Joined At</th>
          <th className="p-2">Status</th>
          <th className="p-2">Action</th> {/* Button to toggle status */}
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.user_id} className="border-t">
            <td className="p-2">{customer.username}</td>
            <td className="p-2">{customer.email}</td>
            <td className="p-2">{customer.mobile}</td>
            <td className="p-2">{customer.createdAt ? new Date(customer.createdAt).toLocaleString() : "Invalid Date"}</td>
            <td className="p-2">
              {customer.user_isActive === "Active" ? "Active" : "Inactive"}
            </td>
            <td className="p-2">
              <button
                onClick={() => onUpdateStatus(customer.user_id, customer.user_isActive)} // Handle toggle status
                className={`py-1 px-4 rounded ${
                  customer.user_isActive === "Active" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                }`}
              >
                {customer.user_isActive === "Active" ? "Active" : "Deactivate"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerTable;
