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
    const response = await axios.get("https://localhost:7219/api/Product/viewProduct"); // 👈 actual API laga dena
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
    //   fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="flex ">
      <Sidebar />
      <div className="p-8 w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Product Management</h1>
          <button className="hover:bg-yellow-600 bg-blue-600 text-white px-4 py-2 rounded" onClick={handleAddClick}>
            + Add Product
          </button>
        </div>

        <ProductTable products={[...products].reverse()} onEdit={handleEdit} /*onDelete={handleDelete}*/ />

        {showForm && (
          <ProductForm
            product={editingProduct}
            onClose={() => setShowForm(false)}
            onRefresh={fetchProducts}
          />
        )}
      </div>
    </div>
  );
};

export default Product;
