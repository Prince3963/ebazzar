import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(8);

  useEffect(() => {
    axios
      .get("https://localhost:7219/api/Product/viewProduct")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("API Error:", err));
  }, []);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = products.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-200 to-indigo-400 px-4">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 text-center mb-10">
          Explore Our Product Store
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentPost.map((product) => (
            <div
              key={product.product_id}
              className="bg-yellow-50 backdrop-blur-md rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-400 flex flex-col"
            >
              <img
                src={product.product_imageURL || "https://via.placeholder.com/400x250?text=No+Image"}
                alt={product.product_name}
                loading="lazy"
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                  {product.product_name}
                </h2>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                  {product.product_description || "No description available."}
                </p>
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-blue-700">
                      ₹{product.product_price}
                    </span>
                    <button
                      onClick={() => navigate(`/product/${product.product_id}`)} // Navigate to ProductDetails page
                      className="py-2 px-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg transition duration-200"
                    >
                      View Details
                    </button>
                  </div>

                  {product.product_isActive?.toLowerCase() === "true" ? (
                    <span className="inline-block text-green-700 bg-green-100 text-xs font-medium px-2 py-1 rounded-full">
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-block text-red-700 bg-red-100 text-xs font-medium px-2 py-1 rounded-full">
                      Not Available
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Pagination
            totalPagePost={products.length}
            PostPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
