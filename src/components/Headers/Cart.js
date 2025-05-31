import React, { useContext } from 'react';
import { CartContext } from '../User/CartContext';

function Cart() {
  const { cartItems, setCartItems } = useContext(CartContext);

  // Function to update the quantity of a specific product
  const updateQuantity = (productId, operation) => {
    const updatedItems = cartItems.map(item => {
      if (item.productId === productId) {
        let updatedQuantity = item.quantity;

        if (operation === 'increment') {
          updatedQuantity += 1;
        } else if (operation === 'decrement' && updatedQuantity > 1) {
          updatedQuantity -= 1;
        }

        // If quantity becomes 0, remove the product from the cart
        if (updatedQuantity === 0) {
          return null; // Mark the item for removal
        }

        return { ...item, quantity: updatedQuantity };
      }
      return item;
    }).filter(item => item !== null); // Remove null items from the cart

    // Update cartItems state and localStorage after removal
    setCartItems(updatedItems);

    // Remove the product from localStorage if it's removed from the cart
    if (updatedItems.length === 0) {
      localStorage.removeItem('cartItems');
    } else {
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    }
  };

  // Calculate total amount for a single item
  const calculateItemTotal = (price, quantity) => {
    return price * quantity;
  };

  // Calculate the overall total amount for the cart
  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => total + calculateItemTotal(item.product_price, item.quantity), 0);
  };

  // Function to remove item from cart completely (on button click)
  const removeItem = (productId) => {
    const updatedItems = cartItems.filter(item => item.productId !== productId);

    // Update cartItems state and localStorage after removal
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-blue-950 text-xl">Your cart is empty.</p>
      ) : (
        <ul className="space-y-6">
          {cartItems.map((item) => (
            <li
              key={item.productId}
              className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-6"
            >
              {/* Left side: Product Image */}
              <div className="flex items-center space-x-6">
                <img
                  src={item.product_imageURL}
                  alt={item.product_name}
                  className="w-16 h-16 object-cover rounded"
                />
              </div>

              {/* Middle: Name and Price on the same row */}
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">{item.product_name}</h3>
                  <p className="text-lg text-gray-600">₹{item.product_price}</p>
                </div>
              </div>

              {/* Right side: Grouped div for quantity, total, and remove */}
              <div className="flex items-center space-x-4">
                {/* Quantity (with increment/decrement buttons) */}
                <div className="flex items-center space-x-4">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                    onClick={() => updateQuantity(item.productId, 'decrement')}
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold text-gray-700">{item.quantity}</span>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                    onClick={() => updateQuantity(item.productId, 'increment')}
                  >
                    +
                  </button>
                </div>

                {/* Total Price for this product */}
                <div className="text-lg font-semibold text-gray-900">
                  ₹{calculateItemTotal(item.product_price, item.quantity).toFixed(2)}
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeItem(item.productId)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}

          {/* Total amount for the cart */}
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
    </div>
  );
}

export default Cart;
