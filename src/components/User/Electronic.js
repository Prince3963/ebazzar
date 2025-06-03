import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from './CartContext'; // Assuming CartContext is imported from the same place as in LandingPage
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

function Electronic() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext); // To use the context for adding products to the cart
  const navigate = useNavigate(); // Initialize useNavigate for redirecting to product detail page

  useEffect(() => {
    axios
      .get('https://localhost:7219/api/Product/getProductCategory/1') // category 1 = Electronic
      .then((res) => {
        setProducts(res.data);
        setError(null);
      })
      .catch((err) => {
        setError('Kuch galat ho gaya.');
        setProducts([]);
      });
  }, []);

  const handleAddToCart = async (product) => {
    const token = getCookie('token'); // Get the token (like in your LandingPage)

    if (token) {
      try {
        await axios.post(
          'https://localhost:7219/api/Cart/add',
          { productId: product.product_id, quantity: 1 },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success('Product added to cart!');
      } catch (error) {
        console.error('Error adding to cart:', error);
        toast.error('Failed to add product to cart.');
      }
    } else {
      // Guest cart functionality
      const guestCartRaw = localStorage.getItem('guest_cart');
      let guestCart = guestCartRaw ? JSON.parse(guestCartRaw) : [];

      const existingIndex = guestCart.findIndex(
        (item) => item.productId === product.product_id
      );

      if (existingIndex !== -1) {
        // Product exists, increment quantity
        guestCart[existingIndex].quantity += 1;
      } else {
        // New product
        guestCart.push({
          productId: product.product_id,
          quantity: 1,
          product_name: product.product_name,
          product_price: product.product_price,
          product_imageURL: product.product_imageURL,
        });
      }

      localStorage.setItem('guest_cart', JSON.stringify(guestCart));
      toast.success('Product added to cart!');
    }
  };

  const handleViewDetails = (productId) => {
    // Redirect to the product details page using product_id
    navigate(`/product/${productId}`);
  };

  const getCookie = (cookieName) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cookieName}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-200 to-indigo-400 px-4">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 text-center mt-6 mb-10">
          Explore Our Electronic Products
        </h1>

        {error && <div className="text-red-500 text-center">{error}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
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
                    title="Click to view details"
                    onClick={() => handleViewDetails(product.product_id)} // Redirect to details page
                  >
                    {product.product_name}
                  </h2>
                  <p
                    className="text-sm text-gray-600 mb-3 line-clamp-3 cursor-pointer hover:text-blue-700"
                    title="Click to view details"
                    onClick={() => handleViewDetails(product.product_id)} // Redirect to details page
                  >
                    {product.product_description || 'No description available.'}
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
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Loading or no products found.</p>
          )}
        </div>
      </div>

      {/* Add the ToastContainer */}
      <ToastContainer />
    </div>
  );
}

export default Electronic;
