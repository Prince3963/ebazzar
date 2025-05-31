import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch active products only for the user
  const fetchProductsForUser = async () => {
    try {
      const response = await axios.get("https://localhost:7219/api/Product/getActiveProducts");
      setProducts(response.data); // Get only active products for user
    } catch (error) {
      console.error("Error fetching active products:", error);
    }
  };

  // Fetch all products for admin to manage
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get("https://localhost:7219/api/Product/viewProduct");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching all products:", error);
    }
  };

  useEffect(() => {
    // Call for admin (all products) or user (active products)
    fetchAllProducts(); // For now, showing all products to admin.
  }, []);

  // Handle adding a product
  const handleAddClick = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  // Handle editing a product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  // Handle deleting a product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7219/api/Product/deleteProduct/${id}`, {
        data: { product_id: id }, 
        headers: { 'Content-Type': 'application/json' }
      });
      fetchAllProducts(); // Refresh product list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Toggle status of the product for admin/user
  const handleStatusToggle = async (productId, currentStatus) => {
    const newStatus = currentStatus === 'true' ? 'false' : 'true'; // Toggle between active/inactive
    try {
      await axios.patch(`https://localhost:7219/api/Product/updateProductStatus/${productId}`, {
        product_isActive: newStatus,
      });
      fetchAllProducts(); // Refresh the list to reflect changes
    } catch (error) {
      console.error("Error updating product status:", error);
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
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg transition duration-200"
          >
            + Add Product
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-black">
          <ProductTable
            products={[...products].reverse()}
            onEdit={handleEdit}
            onDelete={handleDelete}
            fetchProductsForUser={fetchAllProducts} // Pass fetch function
            onStatusToggle={handleStatusToggle} // Passing status toggle function
          />
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl">
              <ProductForm
                product={editingProduct}
                onClose={() => setShowForm(false)}
                onRefresh={fetchAllProducts} // Refresh after product edit/add
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
