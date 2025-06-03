import React, { useState } from 'react';
import Pagination from '../../User/Pagination';
import axios from 'axios';

const ProductTable = ({ products, onEdit, onDelete, fetchProductsForUser }) => {
  const postPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = products.slice(firstPostIndex, lastPostIndex);

  const handleStatusToggle = async (productId, currentStatus) => {
    const newStatus = currentStatus === 'true' ? 'false' : 'true'; // Toggle between active/inactive
    try {
      // Call the backend API to update the product's status
      const response = await axios.patch(
        `https://localhost:7219/api/Product/updateProductStatus/${productId}`,
        { product_isActive: newStatus } // Send the new status
      );

      if (response.status === 200) {
        
        fetchProductsForUser(); 
      } else {
        console.error("Failed to update product status.");
      }
    } catch (error) {
      console.error("Error updating product status:", error);
    }
  };

  return (
    <>
      <table className="w-full border mt-4">
        
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Image</th>
            <th className="p-2">Name</th>
            <th className="p-2">Description</th>
            <th className="p-2">Price</th>
            <th className="p-2">Category</th>
            <th className="p-2">Actions</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentPost.map((product) => (
            <tr key={product.product_id} className="border-t">
              <td className="p-2">
                <img
                  src={product.product_imageURL}
                  alt="Product"
                  className="h-12 w-12 object-cover"
                />
              </td>
              <td className="p-2">{product.product_name}</td>
              <td className="p-2">{product.product_description}</td>
              <td className="p-2">{product.product_price}</td>
              <td className="p-2">{product.category_name}</td>
              <td className="p-2">
                {/* Actions */}
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 mr-2"
                  onClick={() => onEdit(product)}
                >
                  Edit
                </button>
                {/* <button
                  className="text-red-600"
                  onClick={() => onDelete(product.product_id)}
                >
                  Delete
                </button> */}
              </td>
              <td className="p-2">
                {/* Toggle button for active/inactive */}
                <button
                  className={`px-4 py-2 rounded ${product.product_isActive === 'true' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
                  onClick={() => handleStatusToggle(product.product_id, product.product_isActive)}
                >
                  {product.product_isActive === 'true' ? 'Active' : 'Inactive'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        totalPagePost={products.length}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default ProductTable;
