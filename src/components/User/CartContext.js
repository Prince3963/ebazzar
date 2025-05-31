import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("guest_cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("guest_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const exists = cartItems.find(item => item.productId === product.product_id);
    if (exists) {
      const updatedCart = cartItems.map(item =>
        item.productId === product.product_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCart);
    } else {
      const newItem = {
        productId: product.product_id,
        quantity: 1,
        product_name: product.product_name,
        product_price: product.product_price,
        product_imageURL: product.product_imageURL
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
