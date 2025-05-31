import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";

const getCookie = (cookieName) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${cookieName}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(8);
  const { addToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true); // Loading state for fetching products
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchProductsAndMergeCart = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://localhost:7219/api/Product/viewProduct");
        setProducts(res.data);

        const guestCartRaw = localStorage.getItem("guest_cart");
        const guestCart = guestCartRaw ? JSON.parse(guestCartRaw) : [];

        const token = getCookie("token");

        if (token && guestCart.length > 0) {
          const payload = guestCart.map((item) => ({
            productId: item.product_id || item.productId,
            quantity: item.quantity,
          }));

          await axios.post("https://localhost:7219/api/Cart/merge", payload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          localStorage.removeItem("guest_cart");
        }
      } catch (err) {
        console.error("Error fetching products or merging cart:", err);
        setError("Failed to load products or merge cart.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndMergeCart();
  }, []);

  const handleAddToCart = async (product) => {
    const token = getCookie("token");

    if (token) {
      try {
        await axios.post(
          "https://localhost:7219/api/Cart/add",
          { productId: product.product_id, quantity: 1 },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // alert("Product added to cart!");
        navigate("/cart");
      } catch (error) {
        console.error("Error adding to cart:", error);
        alert("Failed to add product to cart.");
      }
    } else {
      
      // Handle guest cart update
      const guestCartRaw = localStorage.getItem("guest_cart");
      const guestCart = guestCartRaw ? JSON.parse(guestCartRaw) : [];
      
      const updatedGuestCart = [...guestCart, {
        productId: product.product_id,
        quantity: 1, // By default, quantity will be 1
        product_name: product.product_name,
        product_price: product.product_price,
        product_imageURL: product.product_imageURL,
      }];

      localStorage.setItem("guest_cart", JSON.stringify(updatedGuestCart));
      // alert("Product added to guest cart!");
    }
  };

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = products.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-200 to-indigo-400 px-4">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 text-center mt-6 mb-10">
          Explore Our Product Store
        </h1>

        {loading && <div>Loading...</div>}  {/* Show loading */}
        {error && <div className="text-red-500">{error}</div>}  {/* Show error */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentPost.map((product) => (
            <div
              key={product.product_id}
              className="bg-yellow-50 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-400 flex flex-col"
            >
              <img
                src={product.product_imageURL}
                alt={product.product_name}
                loading="lazy"
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2
                  className="text-lg font-semibold text-gray-800 mb-1 truncate cursor-pointer hover:text-blue-700"
                  onClick={() => navigate(`/product/${product.product_id}`)}
                  title="Click to view details"
                >
                  {product.product_name}
                </h2>
                <p
                  className="text-sm text-gray-600 mb-3 line-clamp-3 cursor-pointer hover:text-blue-700"
                  onClick={() => navigate(`/product/${product.product_id}`)}
                  title="Click to view details"
                >
                  {product.product_description || "No description available."}
                </p>
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-blue-700">
                      ₹{product.product_price}
                    </span>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="mt-2 py-2 px-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                  {/* <span className="inline-block text-purple-700 bg-purple-100 text-xs font-medium px-2 py-1 rounded-full mt-2">
                    {product.product_category || "Uncategorized"}
                  </span> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Pagination
            totalPagePost={Math.ceil(products.length / postPerPage)}
            PostPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
