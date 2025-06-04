import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const CustomerTable = ({ customers, onUpdateStatus, onEdit }) => {
  const statusBody = (rowData) => (
    <div
      onClick={() => onUpdateStatus(rowData.user_id, rowData.user_isActive)}
      style={{
        width: '50px',
        height: '24px',
        borderRadius: '12px',
        backgroundColor: rowData.user_isActive === 'Active' ? '#4ade80' : '#f87171', // green or red
        cursor: 'pointer',
        position: 'relative',
        transition: 'background-color 0.3s',
        boxShadow: '0 0 5px rgba(0,0,0,0.1)',
      }}
      title={`Click to ${rowData.user_isActive === 'Active' ? 'Deactivate' : 'Activate'}`}
    >
      <div
        style={{
          position: 'absolute',
          top: '2px',
          left: rowData.user_isActive === 'Active' ? '26px' : '2px',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          transition: 'left 0.3s',
        }}
      />
    </div>
  );

  const actionBody = (rowData) => (
    <Button
      icon="pi pi-pencil"
      className="p-button-rounded p-button-info"
      onClick={() => onEdit(rowData)}
      tooltip="Edit User"
      tooltipOptions={{ position: 'top' }}
    />
  );

  return (
    <div className="card p-6 shadow-lg bg-white rounded-lg overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Customer List</h2>

      <DataTable
        value={customers}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        responsiveLayout="scroll"
        stripedRows
        className="p-datatable-sm"
        rowHover
      >
        <Column
          field="username"
          header="Username"
          style={{ minWidth: '160px', fontWeight: '600', color: '#374151' }}
        />
        <Column
          field="email"
          header="Email"
          style={{ minWidth: '220px', color: '#4b5563' }}
        />
        <Column
          field="mobile"
          header="Mobile"
          style={{ width: '160px', color: '#4b5563' }}
        />
        <Column
          header="Joined At"
          body={(rowData) =>
            rowData.createdAt
              ? new Date(rowData.createdAt).toLocaleString()
              : 'Invalid Date'
          }
          style={{ minWidth: '220px', color: '#4b5563' }}
        />
        <Column header="Status" body={statusBody} style={{ width: '90px' }} />
        <Column header="Actions" body={actionBody} style={{ width: '90px' }} />
      </DataTable>
    </div>
  );
};

export default CustomerTable;
