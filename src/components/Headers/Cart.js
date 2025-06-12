import React, { useContext } from 'react';
import { CartContext } from '../User/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";


function Cart() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  // Get cart data from localStorage (adi)
  const adi = JSON.parse(localStorage.getItem("guest_cart") || "[]");

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const checkOutHandler = () => {
    const token = getCookie("token");
    if (token) {
      navigate('/address');
      console.log("Ho gaya  ");
    } else {
      toast("Please login and access it ");
      navigate('/login');
    }
  };

  // Update quantity logic
  const updateQuantity = (productId, operation) => {
    const updatedItems = adi.map(item => {
      if (item.productId === productId) {
        let updatedQuantity = item.quantity;

        if (operation === 'increment') {
          updatedQuantity += 1;
        } else if (operation === 'decrement' && updatedQuantity > 1) {
          updatedQuantity -= 1;
        }

        if (updatedQuantity === 0) {
          return null; // Remove quantity if zero
        }

        return { ...item, quantity: updatedQuantity };
      }
      return item;
    }).filter(item => item !== null); // Filter out null items

    setCartItems(updatedItems); // Update the cart context with new data
    localStorage.setItem('guest_cart', JSON.stringify(updatedItems)); // Sync localStorage with updated data
  };

  const calculateCartTotal = () =>
    adi.reduce((total, item) => total + calculateItemTotal(item.product_price, item.quantity), 0);


  const calculateItemTotal = (price, quantity) => price * quantity;
  const subTotal = calculateCartTotal();
  const deliveryFees = 100;
  const discount = 0;
  const totalAmount = subTotal + deliveryFees - discount / 100;


  // Remove item logic
  const removeItem = (productId) => {
    const updatedItems = adi.filter(item => item.productId !== productId);

    setCartItems(updatedItems);
    localStorage.setItem('guest_cart', JSON.stringify(updatedItems));
  };

  // Whenever cart updates — save updated total amount to localStorage
useEffect(() => {
  localStorage.setItem("cart_total_amount", totalAmount.toFixed(2));
}, [cartItems, totalAmount]);


  return (
    <div className="p-8 bg-gray-50 min-h-screen relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
      >
        &larr;
      </button>

      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Your Cart</h2>

      {adi.length === 0 ? (
        <p className="text-center text-blue-950 text-xl">Your cart is empty.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white table-fixed shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Product</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Remove</th>
              </tr>
            </thead>
            <tbody>
              {adi.map((item) => (
                <tr key={item.productId} className="border-b">
                  <td className="py-3 px-4">
                    <img
                      src={item.product_imageURL}
                      alt={item.product_name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4">{item.product_name}</td>
                  <td className="py-3 px-4">₹{item.product_price.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.productId, 'decrement')}
                        className="w-8 h-8 bg-blue-500 text-white rounded-s hover:bg-blue-600"
                      >
                        -
                      </button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, 'increment')}
                        className="w-8 h-8 bg-blue-500 text-white rounded-e hover:bg-blue-600"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    ₹{calculateItemTotal(item.product_price, item.quantity).toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="w-8 h-8 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

          <div className="rounded-lg shadow-lg overflow-hidden space-x-6 mt-6">
            <ul>
              <li className="bg-white p-6 flex items-center justify-between border-b">
                <div className="text-xl font-semibold text-gray-900">Sub Total</div>
                <div className="text-xl font-semibold text-gray-900">
                  ₹{calculateCartTotal().toFixed(2)}
                </div>
              </li>
              <li className="bg-white p-6 flex items-center justify-between border-b">
                <div className="text-xl font-semibold text-gray-900">Delivery fees</div>
                <div className="text-xl font-semibold text-gray-900">₹100</div>
              </li>
              <li className="bg-white p-6 flex items-center justify-between border-b">
                <div className="text-xl font-semibold text-gray-900">Discount</div>
                <div className="text-xl font-semibold text-gray-900">{discount}%</div>
              </li>
              <li className="bg-white p-6 flex items-center justify-between">
                <div className="text-xl font-semibold text-gray-900">Total amount</div>
                <div className="text-xl font-semibold text-gray-900">₹{totalAmount.toFixed(2)}</div>
              </li>
            </ul>
          </div>


          <div className="flex justify-end mt-6">
            <button
              onClick={checkOutHandler}
              className="p-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Check out
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );

}

export default Cart;