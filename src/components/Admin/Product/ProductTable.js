import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
// import { Tag } from 'primereact/tag';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import axios from 'axios';


const ProductTable = ({ products, onEdit, onDelete, fetchProductsForUser }) => {
  const handleStatusToggle = async (productId, currentStatus) => {
    const newStatus = currentStatus === 'true' ? 'false' : 'true';
    try {
      const response = await axios.patch(
        `https://localhost:7219/api/Product/updateProductStatus/${productId}`,
        { product_isActive: newStatus }
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


  const imageBody = (rowData) => (
    <img
      src={rowData.product_imageURL}
      alt="Product"
      className="w-12 h-12 object-cover rounded shadow-md"
    />
  );

  
  const actionBody = (rowData) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-pencil"
        className="p-button-sm p-button-info"
        onClick={() => onEdit(rowData)}
        tooltip="Edit"
        tooltipOptions={{ position: 'top' }}
      />
    </div>
  );

  
  const statusBody = (rowData) => (
    <div
        onClick={() => handleStatusToggle(rowData.product_id, rowData.product_isActive)}
        className={`relative w-14 h-7 rounded-full cursor-pointer transition duration-300
          ${rowData.product_isActive === 'true' ? 'bg-green-500' : 'bg-red-400'}`}
    >
        <div
            className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition
              ${rowData.product_isActive === 'true' ? 'translate-x-7' : ''}`}
        />
    </div>
);

  return (
    <div className='bg-slate-200 rounded-lg p-2'>
      <h2 className="text-lg font-semibold mb-4  text-gray-800">Product List</h2>

      <DataTable
        value={products}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        responsiveLayout="scroll"
        stripedRows
        className="p-datatable-sm"
      >
        <Column header="Image" body={imageBody} style={{ width: '100px' }} />
        <Column field="product_name" header="Name" style={{ minWidth: '150px' }} />
        <Column field="product_description" header="Description" style={{ minWidth: '200px' }} />
        <Column field="product_price" header="Price" style={{ width: '100px' }} />
        <Column field="category_name" header="Category" style={{ width: '150px' }} />
        <Column header="Status" body={statusBody} style={{ width: '120px' }} />
        <Column header="Actions" body={actionBody} style={{ width: '120px' }} />
      </DataTable>
    </div>
  );
};

export default ProductTable;
