import React from 'react';

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <table className="w-full border mt-4">
      <thead>
        <tr className="bg-gray-200 text-left" >
          {/* <th className="p-2">Id</th> */}
          <th className="p-2">Name</th>
          <th className="p-2">Description</th>
          <th className="p-2">Price</th>
          <th className="p-2">Image</th>
          <th className="p-2">Category ID</th>
          <th className="p-2">Active</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.product_id} className="border-t">
            {/* <td className="p-2">{product.product_id}</td> */}
            <td className="p-2">{product.product_name}</td>
            <td className="p-2">{product.product_description}</td>
            <td className="p-2">${product.product_price}</td>
            <td className="p-2">
              <img src={product.product_imageURL} alt="Product" className="h-12 w-12 object-cover" />
            </td>
            <td className="p-2">{product.category_id}</td>
            <td className="p-2">{product.product_isActive ? 'Yes' : 'No'}</td>
            <td className="p-2">
              <button className="text-blue-600 mr-2" onClick={() => onEdit(product)}>Edit</button>
              <button className="text-red-600" onClick={() => onDelete(product.product_id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
