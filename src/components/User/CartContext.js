import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [internalCartItems, internalSetCartItems] = useState(() => {
    const stored = localStorage.getItem("guest_cart");
    return stored ? JSON.parse(stored) : [];
  });

  const cartItems = internalCartItems;
  const setCartItems = internalSetCartItems;

  // Sync cartItems with localStorage
  useEffect(() => {
    if (cartItems.length === 0) {
      localStorage.removeItem("guest_cart");
    } else {
      localStorage.setItem("guest_cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (product) => {
    const exists = cartItems.find(item => item.productId === product.product_id);

    if (exists) {
      setCartItems(cartItems.map(item =>
        item.productId === product.product_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
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

  const updateQuantity = (productId, operation) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.productId === productId) {
          let newQty = item.quantity;
          if (operation === 'increment') newQty += 1;
          else if (operation === 'decrement' && newQty > 1) newQty -= 1;
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
