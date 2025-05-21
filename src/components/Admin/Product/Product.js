import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://localhost:7219/api/Product/viewProduct");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddClick = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://your-api-url/products/${id}`);
      // fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br text-cyan800">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Product Management</h1>
          <button
            onClick={handleAddClick}
            className="bg-cyan-600 hover:bg-yellow-600 text-black font-semibold px-5 py-2 rounded-lg transition duration-200"
          >
            + Add Product
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-black">
          <ProductTable
            products={[...products].reverse()}
            onEdit={handleEdit}
            // onDelete={handleDelete}
          />
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl">
              <ProductForm
                product={editingProduct}
                onClose={() => setShowForm(false)}
                onRefresh={fetchProducts}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
