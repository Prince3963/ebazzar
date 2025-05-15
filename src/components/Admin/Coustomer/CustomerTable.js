import React from 'react';

const CustomerTable = ({ customers }) => {
  return (
    <table className="w-full border mt-4">
      <thead>
        <tr className="bg-gray-200 text-left">
          <th className="p-2">Customer ID</th>
          <th className="p-2">Username</th>
          <th className="p-2">Email</th>
          <th className="p-2">Mobile</th>
          <th className="p-2">Password</th>
          <th className="p-2">Role</th>
          <th className="p-2">Joined At</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.user_id} className="border-t">
            <td className="p-2">{customer.user_id}</td>
            <td className="p-2">{customer.username}</td>
            <td className="p-2">{customer.email}</td>
            <td className="p-2">{customer.mobile}</td>
            <td className="p-2">{customer.password}</td>
            <td className="p-2">{customer.role_id}</td>
            <td className="p-2">{new Date(customer.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerTable;
