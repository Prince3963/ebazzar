import React, { useState } from 'react';
import Pagination from '../../User/Pagination'; // Make sure path is correct

const ProductTable = ({ products, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 8;

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = products.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <table className="w-full border mt-4">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Image</th>
            <th className="p-2">Name</th>
            <th className="p-2">Description</th>
            <th className="p-2">Price</th>
            <th className="p-2">Category ID</th>
            <th className="p-2">Actions</th>
            {/* <th className='p-2' /> In stoke */}
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
                <button
                  className="text-blue-600 mr-2"
                  onClick={() => onEdit(product)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600"
                  onClick={() => onDelete(product.product_id)}
                >
                  Delete
                </button>
              </td>
              {/* <td className='p-2'/>{product.} */}
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
