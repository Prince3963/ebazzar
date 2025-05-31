// Customer.js

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

  // Function to handle status update
  const handleUpdateStatus = async (userId, currentStatus) => {
    try {
      // Prepare the data to send in the body
      const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

      const userStatus = {
        user_isActive: newStatus,
      };

      // Call the API to update user status
      const response = await axios.patch(
        `https://localhost:7219/api/User/updateUserStatus/${userId}`,
        userStatus
      );

      // Update customer status in the state
      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer.user_id === userId
            ? { ...customer, user_isActive: newStatus }
            : customer
        )
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-8 w-full">
        <h1 className="text-2xl font-bold mb-4">Customer Management</h1>

        <CustomerTable customers={customers} onUpdateStatus={handleUpdateStatus} />
      </div>
    </div>
  );
};

export default Customer;
