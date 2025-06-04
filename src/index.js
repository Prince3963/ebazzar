import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from './components/User/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

function Root() {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("guest_cart");
    return stored ? JSON.parse(stored) : [];
  });

  return (
    <CartProvider value={{ cartItems, setCartItems }}>
      <App />
    </CartProvider>
  );
}

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

reportWebVitals();
