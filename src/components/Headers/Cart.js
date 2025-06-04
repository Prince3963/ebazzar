import React, { useContext } from 'react';
import { CartContext } from '../User/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import the styles

function Cart() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate(); // Initialize navigate for routing

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const checkOutHandler = () => {
    
    const token = getCookie("token"); 

    if (token) {
      alert('Success! You are ready to checkout!');
      console.log("Ho gaya  ");
    } else {
      toast("Please login and access it ");
      navigate('/login'); 
    }
  };

  // Update quantity
  const updateQuantity = (productId, operation) => {
    const updatedItems = cartItems.map(item => {
      if (item.productId === productId) {
        let updatedQuantity = item.quantity;

        if (operation === 'increment') {
          updatedQuantity += 1;
        } else if (operation === 'decrement' && updatedQuantity > 1) {
          updatedQuantity -= 1;
        }

        if (updatedQuantity === 0) {
          return null; // Remove quantity
        }

        return { ...item, quantity: updatedQuantity };
      }
      return item;
    }).filter(item => item !== null);

    setCartItems(updatedItems);

    if (updatedItems.length === 0) {
      localStorage.removeItem('cartItems');
    } else {
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    }
  };

  const calculateItemTotal = (price, quantity) => {
    return price * quantity;
  };

  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => total + calculateItemTotal(item.product_price, item.quantity), 0);
  };

  const removeItem = (productId) => {
    const updatedItems = cartItems.filter(item => item.productId !== productId);

    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen relative">
      
      <button
        onClick={() => navigate(-1)} 
        className="absolute top-4 left-4 py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
      >
        &larr;
      </button>

      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-blue-950 text-xl">Your cart is empty.</p>
      ) : (
        <ul className="space-y-6">
          {cartItems.map((item) => (
            <li
              key={item.productId}
              className="bg-white rounded-lg shadow p-4 flex items-center gap-4"
            >
              {/* Image */}
              <img
                src={item.product_imageURL}
                alt={item.product_name}
                className="w-20 h-20 object-cover rounded"
              />

              {/* Product name and price */}
              <div className="flex flex-col flex-1 justify-center">
                <h3 className="text-lg font-semibold text-gray-900">{item.product_name}</h3>
                <p className="text-sm text-gray-600 mt-1">₹{item.product_price.toFixed(2)}</p>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.productId, 'decrement')}
                  className="w-8 h-8 bg-blue-500 text-white rounded-s-lg hover:bg-blue-600 flex justify-center items-center"
                >
                  -
                </button>
                <span className="w-6 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.productId, 'increment')}
                  className="w-8 h-8 bg-blue-500 text-white rounded-e-lg hover:bg-blue-600 flex justify-center items-center"
                >
                  +
                </button>
              </div>

              {/* Item total price */}
              <div className="w-24 text-right font-semibold text-gray-900">
                ₹{calculateItemTotal(item.product_price, item.quantity).toFixed(2)}
              </div>

              {/* Remove button with icon */}
              <button
                onClick={() => removeItem(item.productId)}
                className="w-8 h-8 flex justify-center items-center text-white bg-red-500 rounded hover:bg-red-600"
              >
                <FontAwesomeIcon icon={faTrash} size="sm" />
              </button>
            </li>
          ))}

          <li className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between space-x-6 mt-6">
            <div className="flex items-center space-x-6 flex-1">
              <h3 className="text-xl font-semibold text-gray-900">Total Amount</h3>
            </div>
            <div className="text-xl font-semibold text-gray-900">
              ₹{calculateCartTotal().toFixed(2)}
            </div>
          </li>
        </ul>
      )}

        {cartItems.length > 0 && (
      <div className="flex justify-end">
        <button
          onClick={checkOutHandler} // Handle checkout click
          className="p-4 mt-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Check out
        </button>
      </div>
      )}
      <ToastContainer/>
    </div>
  );
}

export default Cart;
