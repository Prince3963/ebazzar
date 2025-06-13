import React, { useEffect, useState } from 'react';
import axios from 'axios';

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};
function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');



  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = getCookie("token");
        const response = await axios.get('https://localhost:7219/api/test', {
          headers: {
            Authorization: `Bearer ${token}` // if using JWT
          }
        });

        if (response.data.status) {
          setOrders(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Failed to fetch orders');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.order_id} style={{ marginBottom: '20px' }}>
              <img src={order.product_image} alt={order.product_name} width="100" />
              <div><strong>{order.product_name}</strong></div>
              <div>Price: ₹{order.final_price}</div>
              <div>Quantity: {order.quantity}</div>
              {/* Order ID removed */}
            </li>
          ))}
        </ul>

      )}
    </div>
  );
}

export default Order;
