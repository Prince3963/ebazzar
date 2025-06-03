import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart from localStorage initially
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("guest_cart");
    return stored ? JSON.parse(stored) : [];
  });

  // Sync to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("guest_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add product to cart
  const addToCart = (product) => {
    const exists = cartItems.find(item => item.productId === product.product_id);

    if (exists) {
      // Increment quantity if item already in cart
      const updatedCart = cartItems.map(item =>
        item.productId === product.product_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCart);
    } else {
      // Add new item
      const newItem = {
        productId: product.product_id,
        quantity: 1,
        product_name: product.product_name,
        product_price: product.product_price,
        product_imageURL: product.product_imageURL
      };
      setCartItems(prev => [...prev, newItem]);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
