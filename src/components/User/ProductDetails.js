import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate hook for navigation
import { CartContext } from "./CartContext"; // Import CartContext
import { ToastContainer, toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const getCookie = (cookieName) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${cookieName}=`);

  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext); // Access CartContext
  const [quantity, setQuantity] = useState(1); // Quantity state for product

  useEffect(() => {
    axios
      .get(`https://localhost:7219/api/Product/getProductById/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load product.");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = async () => {
    const token = getCookie("token");

    toast.success("Product added to cart!");  // Show success toast first

    if (token) {
      try {
        // For logged-in users
        await axios.post(
          "https://localhost:7219/api/Cart/add",
          { productId: product.product_id, quantity: quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add product to cart.");  // Show error toast if there's a failure
      }
    } else {
      // For guest users
      const guestCartRaw = localStorage.getItem("guest_cart");
      let guestCart = guestCartRaw ? JSON.parse(guestCartRaw) : [];

      const existingIndex = guestCart.findIndex(
        (item) => item.productId === product.product_id
      );

      if (existingIndex !== -1) {
        // Product exists, increment quantity
        guestCart[existingIndex].quantity += quantity;
      } else {
        // New product
        guestCart.push({
          productId: product.product_id,
          quantity: quantity,
          product_name: product.product_name,
          product_price: product.product_price,
          product_imageURL: product.product_imageURL,
        });
      }

      localStorage.setItem("guest_cart", JSON.stringify(guestCart));
    }
  };

  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!product) return <div className="p-4 text-gray-500">No product found.</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-300 px-6 py-10 relative">
      {/* Back Button Positioned at Top Left */}
      <button
        onClick={() => navigate(-1)} // Navigate back to the previous page
        className="absolute top-4 left-4 py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
      >
        &larr;
      </button>

      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Section */}
          <div className="w-full md:w-1/3">
            <div className="relative group overflow-hidden rounded-lg">
              <img
                src={product.product_imageURL}
                alt={product.product_name}
                className="w-full h-96 object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110"
              />
            </div>
          </div>

          {/* Product Details Section */}
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.product_name}</h1>
            <p className="text-lg text-gray-600 mb-6">{product.product_description}</p>
            <p className="text-2xl text-green-600 font-semibold mb-6">₹{product.product_price}</p>
            {/* <p className="text-2xl text-green-600 font-semibold mb-6">{product.category_name}</p> */}
            <div className="text-xs flex justify-center mb-4 bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded-full shadow-sm border border-blue-300 mt-1">
              {product.category_name}
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Add to Cart
            </button>


          </div>
        </div>
      </div>

      {/* Add ToastContainer for showing toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default ProductDetails;
