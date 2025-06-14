import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import { ToastContainer, toast } from "react-toastify"; 
import { Paginator } from "primereact/paginator";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "react-toastify/dist/ReactToastify.css";

const getCookie = (cookieName) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${cookieName}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const UserDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(16);
  const { addToCart, setCartItems } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsAndMergeCart = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://localhost:7219/api/Product/viewProduct");
        const activeProducts = res.data.filter(product => product.product_isActive === "true");
        setProducts(activeProducts);

        const token = getCookie("token");
        const guestCartRaw = localStorage.getItem("guest_cart");
        const guestCart = guestCartRaw ? JSON.parse(guestCartRaw) : [];

        if (token && guestCart.length > 0) {
          const payload = guestCart.map(item => ({
            productId: item.product_id || item.productId,
            quantity: item.quantity,
          }));

          const updatedCartRes = await axios.get("https://localhost:7219/api/Cart/view", {
            headers: { Authorization: `Bearer ${token}` },
          });

          setCartItems(updatedCartRes.data);
          localStorage.removeItem("guest_cart");
        }
      } catch (err) {
        // console.error("Error fetching products or merging cart:", err);
        // setError("Failed to load products or merge cart.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndMergeCart();
  }, [setCartItems]);

  // 👇 Replace entire handleAddToCart with this:
const handleAddToCart = (product) => {
  addToCart(product); // 🟢 Context ke method se localStorage bhi update hoga, badge bhi
  toast.success("Product added to cart!");
};



  // Pagination slice
  const start = currentPage * rowsPerPage;
  const end = start + rowsPerPage;
  const currentPost = products.slice(start, end);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-indigo-200 px-4 py-10">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mt-6 mb-12 tracking-tight">
          Explore Our Product Store
        </h1>

        {loading && <div className="text-center text-lg">Loading...</div>}
        {/* {error && <div className="text-red-600 text-center">{error}</div>} */}

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {currentPost.map(product => (
            <div
              key={product.product_id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:scale-[1.02] transition duration-300 ease-in-out border border-gray-200 flex flex-col"
            >
              <img
                src={product.product_imageURL}
                alt={product.product_name}
                loading="lazy"
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2
                  className="text-lg font-semibold text-gray-900 mb-1 truncate hover:text-blue-700 cursor-pointer transition duration-200"
                  onClick={() => navigate(`/product/${product.product_id}`)}
                  title="View product details"
                >
                  {product.product_name}
                </h2>
                <p
                  className="text-sm text-gray-600 mb-3 line-clamp-3 cursor-pointer hover:text-blue-700"
                  onClick={() => navigate(`/product/${product.product_id}`)}
                  title="View product details"
                >
                  {product.product_description || "No description available."}
                </p>
                <div className="mt-auto flex flex-col gap-3">
                  <span className="text-xl font-bold text-blue-600">
                    ₹{product.product_price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white text-base font-bold rounded-lg shadow-md transition duration-200"
                  >
                    Add to Cart
                  </button>
                  <div className="text-xs flex justify-center bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded-full shadow-sm border border-blue-300 mt-1">
                    {product.category_name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Paginator
            first={currentPage * rowsPerPage}
            rows={rowsPerPage}
            totalRecords={products.length}
            rowsPerPageOptions={[16, 24, 30]}
            onPageChange={(e) => {
              setCurrentPage(e.page);
              setRowsPerPage(e.rows);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="w-full gap-2 bg-white shadow-md rounded-lg p-3"
          />
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={500} />
    </div>
  );
};

export default UserDashboard;
