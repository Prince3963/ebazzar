import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(8);

  useEffect(() => {
    axios
      .get("https://localhost:7219/api/Product/viewProduct")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("API Error:", err));
  }, []);

  const lastPostIndex = currentPage * postPerPage;
  const FirstPostIndex = lastPostIndex - postPerPage;
  const currentPost = products.slice(FirstPostIndex, lastPostIndex);

  return (
    <div className="bg-gradient-to-r from-cyan-800 to-blue-900 min-h-screen shadow-sm text-white px-8 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Store</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {currentPost.map((product, index) => (
          <div
            key={index}
            className="bg-yellow-100 rounded-2xl overflow-hidden shadow-lg text-gray-800"
          >
            <img
              src={
                product.product_imageURL ||
                "https://via.placeholder.com/300x200?text=No+Image"
              }
              alt={product.product_name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1">
                {product.product_name}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                {product.product_description || "No description provided"}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-black ">
                  ₹{product.product_price}
                </span>
                <button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white text-sm px-4 py-2 rounded-md transition duration-200">
                  View Details
                </button>
              </div>

              {product.product_isActive?.toLowerCase() === "true" ? (
                <p className="text-xs text-green-500 mt-2">In Stock</p>
              ) : (
                <p className="text-xs text-red-500 mt-2">Not Available</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <Pagination
        totalPagePost={products.length}
        PostPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default UserDashboard;
