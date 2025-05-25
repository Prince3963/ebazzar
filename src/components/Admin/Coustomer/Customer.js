import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import CustomerTable from './CustomerTable';

const Customer = () => {
  const [customers, setCustomers] = useState([]);

  // Fetch customers from API
  const fetchCustomers = async () => {
    try {
      const response = await axios.get("https://localhost:7219/api/User"); 
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-8 w-full">
        <h1 className="text-2xl font-bold mb-4">Customer Management</h1>

        <CustomerTable customers={customers} />
      </div>
    </div>
  );
};

export default Customer;
