import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your actual API endpoint
    axios.get('https://api.example.com/orders')
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Kuch galat ho gaya!');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>🧾 Aapke Orders</h2>
      {orders.length === 0 ? (
        <p>Koi order nahi mila.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {orders.map(order => (
            <li key={order.id} style={{
              marginBottom: '15px',
              padding: '15px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#f9f9f9'
            }}>
              <strong>Order ID:</strong> {order.id} <br />
              <strong>Product:</strong> {order.productName} <br />
              <strong>Quantity:</strong> {order.quantity} <br />
              <strong>Status:</strong> {order.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
