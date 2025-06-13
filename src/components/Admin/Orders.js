import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('https://localhost:7219/api/Order')
      .then(response => {
        setOrders(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6 text-lg font-medium">Loading orders...</div>;
  if (error) return <div className="p-6 text-red-500 font-semibold">{error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">&nbsp;Admin Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                <th className="px-6 py-3">User Name</th>
                <th className="px-6 py-3">Address ID</th>
                <th className="px-6 py-3">Razorpay Order ID</th>
                <th className="px-6 py-3">Total Price</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Created At</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 text-sm text-gray-700"
                >
                  <td className="px-6 py-3">{order.username ?? 'N/A'}</td>
                  <td className="px-6 py-3">{order.address_id ?? 'N/A'}</td>
                  <td className="px-6 py-3">{order.razorpay_order_id ?? 'N/A'}</td>
                  <td className="px-6 py-3">
                    ₹{order.total_price ? parseFloat(order.total_price).toFixed(2) : '0.00'}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-400 text-white'
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Orders;
