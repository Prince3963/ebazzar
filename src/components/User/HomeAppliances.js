import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from './CartContext';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Paginator } from "primereact/paginator";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function HomeAppliance() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://localhost:7219/api/Product/getProductCategory/3')
      .then((res) => {
        setProducts(res.data);
        setError(null);
      })
      .catch(() => {
        setError('Kuch galat ho gaya.');
        setProducts([]);
      });
  }, []);

  const handleAddToCart = async (product) => {
    const token = getCookie('token');

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
      const guestCartRaw = localStorage.getItem('guest_cart');
      let guestCart = guestCartRaw ? JSON.parse(guestCartRaw) : [];

      const existingIndex = guestCart.findIndex(
        (item) => item.productId === product.product_id
      );

      if (existingIndex !== -1) {
        guestCart[existingIndex].quantity += 1;
      } else {
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
    navigate(`/product/${productId}`);
  };

  const getCookie = (cookieName) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cookieName}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  // Pagination slice
  const start = currentPage * rowsPerPage;
  const end = start + rowsPerPage;
  const currentProducts = products.slice(start, end);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-200 to-indigo-400 px-4">
      <div className="max-w-screen-xl mx-auto w-full">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 text-center mt-6 mb-10">
          Explore Our Home Appliance Products
        </h1>

        {error && <div className="text-red-500 text-center">{error}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
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
                    onClick={() => handleViewDetails(product.product_id)}
                  >
                    {product.product_name}
                  </h2>
                  <p
                    className="text-sm text-gray-600 mb-3 line-clamp-3 cursor-pointer hover:text-blue-700"
                    title="Click to view details"
                    onClick={() => handleViewDetails(product.product_id)}
                  >
                    {product.product_description || 'No description available.'}
                  </p>
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-bold text-blue-700">
                        ₹{product.product_price}
                        <div className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-2 mt-2 rounded-full border border-green-300 shadow-sm">
                          {product.category_name}
                        </div>
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

        <div className="flex justify-center mt-12 w-full">
          <Paginator
            first={currentPage * rowsPerPage}
            rows={rowsPerPage}
            totalRecords={products.length}
            rowsPerPageOptions={[8, 12, 20]}
            onPageChange={(e) => {
              setCurrentPage(e.page);
              setRowsPerPage(e.rows);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="w-full gap-2 bg-white shadow-md rounded-lg p-3"
          />
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default HomeAppliance;
