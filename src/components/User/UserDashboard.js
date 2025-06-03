import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import { ToastContainer, toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const getCookie = (cookieName) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${cookieName}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const UserDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(8);
  const { addToCart, setCartItems } = useContext(CartContext);
  const [loading, setLoading] = useState(true); // Loading state for fetching products
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchProductsAndMergeCart = async () => {
      try {
        setLoading(true);
        // Fetching products from the API
        const res = await axios.get("https://localhost:7219/api/Product/viewProduct");

        // Filtering only active products
        const activeProducts = res.data.filter(product => product.product_isActive === 'true');
        setProducts(activeProducts);

        // Merge guest cart with user cart
        const token = getCookie("token");
        const guestCartRaw = localStorage.getItem("guest_cart");
        const guestCart = guestCartRaw ? JSON.parse(guestCartRaw) : [];

        if (token && guestCart.length > 0) {
          const payload = guestCart.map(item => ({
            productId: item.product_id || item.productId,
            quantity: item.quantity,
          }));

          await axios.post("https://localhost:7219/api/Cart/merge", payload, {
            headers: { Authorization: `Bearer ${token}` },
          });

          // Fetch updated cart
          const updatedCartRes = await axios.get("https://localhost:7219/api/Cart/view", {
            headers: { Authorization: `Bearer ${token}` },
          });

          setCartItems(updatedCartRes.data);  // Update context with new cart items
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

  const handleAddToCart = (product) => {
    // Retrieve the existing guest cart from localStorage, or initialize an empty array
    const guestCartRaw = localStorage.getItem("guest_cart");
    const guestCart = guestCartRaw ? JSON.parse(guestCartRaw) : [];

    // Check if the product is already in the guest cart
    const existingProductIndex = guestCart.findIndex(item => item.productId === product.product_id);

    if (existingProductIndex >= 0) {
      // If the product is already in the cart, update its quantity
      guestCart[existingProductIndex].quantity += 1;
    } else {
      // If the product is not in the cart, add a new item with quantity 1
      guestCart.push({
        productId: product.product_id,
        quantity: 1, // Initial quantity is 1
        product_name: product.product_name,
        product_price: product.product_price,
        product_imageURL: product.product_imageURL,
      });
    }

    localStorage.setItem("guest_cart", JSON.stringify(guestCart));
    toast.success("Product added to cart!"); // Show success toast for adding to cart
    console.log("Updated Guest Cart:", guestCart);
  };

  // Pagination logic
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
        {/* {error && <div className="text-red-500">{error}</div>}  Show error */}

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
                {/* Product Name with Click Handler */}
                <h2
                  className="text-lg font-semibold text-gray-800 mb-1 truncate cursor-pointer hover:text-blue-700"
                  onClick={() => navigate(`/product/${product.product_id}`)}  // View Details
                  title="Click to view details"
                >
                  {product.product_name}
                </h2>

                {/* Product Description with Click Handler */}
                <p
                  className="text-sm text-gray-600 mb-3 line-clamp-3 cursor-pointer hover:text-blue-700"
                  onClick={() => navigate(`/product/${product.product_id}`)}  // View Details
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

                  {/* Product Availability */}
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

        {/* Pagination Component */}
        <div className="mt-12 flex justify-center">
          <Pagination
            totalPagePost={Math.ceil(products.length / postPerPage)}
            PostPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      {/* Add the ToastContainer here */}
      <ToastContainer />
    </div>
  );
};

export default UserDashboard;
