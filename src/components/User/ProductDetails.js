import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Use useParams to get the product id from the URL

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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


  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!product) return <div className="p-4 text-gray-500">No product found.</div>;

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src={product.product_imageURL }
            alt={product.product_name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details Section */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.product_name}</h1>
          <p className="text-lg text-gray-600 mb-4">{product.product_description}</p>
          <p className="text-xl text-green-600 font-semibold mb-4">₹{product.product_price}</p>
          <p className="text-sm text-gray-500">Category: {product.Category?.category_name || "N/A"}</p>
          <p className="text-sm text-gray-500">Status: {product.product_isActive === "true" ? "In Stock" : "Out of Stock"}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
