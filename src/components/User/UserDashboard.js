import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7219/api/Product/viewProduct")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("API Error:", err));
  }, []);

  return (
    <div className="bg-green-700 min-h-screen text-black px-8 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Store</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-yellow-100 rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src={
                product.product_image ||
                "https://via.placeholder.com/300x200?text=No+Image"
              }
              alt={product.product_name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1">
                {product.product_name}
              </h2>
              <p className="text-sm text-gray-400 mb-2">
                {product.product_description || "No description provided"}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-green-400">
                  ₹{product.product_price}
                </span>
                <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md">
                  View Details
                </button>
              </div>

              {product.product_isActive?.toLowerCase() === "true" ? (
                <p className="text-xs text-green-500 mt-2"> In Stock</p>
              ) : (
                <p className="text-xs text-red-500 mt-2"> Not Available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
