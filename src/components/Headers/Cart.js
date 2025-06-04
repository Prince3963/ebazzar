import React, { useContext, useEffect } from 'react';
import { CartContext } from '../User/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAslInterpreting, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const adi = JSON.parse(localStorage.getItem("guest_cart") || "[]");
  
  const { cartItems, updateQuantity, removeItem } = useContext(CartContext);
  console.log("Cart component rendering with items:", cartItems);

  const navigate = useNavigate();

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };
  useEffect(() => {
    console.log("Cart items updated:", cartItems);
  }, [cartItems]);

  const checkOutHandler = () => {
    const token = getCookie("token");
    if (token) {
      alert('Success! You are ready to checkout!');
      // You can add checkout logic here
    } else {
      toast("Please login to access checkout.");
      navigate('/login');
    }
  };

  const calculateItemTotal = (price, quantity) => price * quantity;

  const calculateCartTotal = () =>
    cartItems.reduce((sum, item) => sum + calculateItemTotal(item.product_price, item.quantity), 0);


  return (
    <div className="p-8 bg-gray-50 min-h-screen relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
      >
        &larr;
      </button>

      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Your Cart</h2>

      {adi.length === 0 ? (
        <p className="text-center text-blue-900 text-xl">Your cart is empty.</p>
      ) : (
        <ul className="space-y-6">
          {adi.map(({ productId, product_imageURL, product_name, product_price, quantity }) => (
            <li key={productId} className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
              <img
                src={product_imageURL}
                alt={product_name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex flex-col flex-1 justify-center">
                <h3 className="text-lg font-semibold text-gray-900">{product_name}</h3>
                <p className="text-sm text-gray-600 mt-1">₹{product_price.toFixed(2)}</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(productId, 'decrement')}
                  className="w-8 h-8 bg-blue-500 text-white rounded-l hover:bg-blue-600 flex justify-center items-center"
                >
                  -
                </button>
                <span className="w-6 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => updateQuantity(productId, 'increment')}
                  className="w-8 h-8 bg-blue-500 text-white rounded-r hover:bg-blue-600 flex justify-center items-center"
                >
                  +
                </button>
              </div>

              <div className="w-24 text-right font-semibold text-gray-900">
                ₹{calculateItemTotal(product_price, quantity).toFixed(2)}
              </div>

              <button
                onClick={() => removeItem(productId)}
                className="w-8 h-8 flex justify-center items-center text-white bg-red-500 rounded hover:bg-red-600"
                aria-label={`Remove ${product_name} from cart`}
              >
                <FontAwesomeIcon icon={faTrash} size="sm" />
              </button>
            </li>
          ))}

          <li className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between mt-6">
            <h3 className="text-xl font-semibold text-gray-900">Total Amount</h3>
            <div className="text-xl font-semibold text-gray-900">
              ₹{calculateCartTotal().toFixed(2)}
            </div>
          </li>
        </ul>
      )}

      {adi.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={checkOutHandler}
            className="p-4 mt-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            Check out
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Cart;
