import React from "react";
import { FaSearch } from "react-icons/fa"; // Import the search icon

const Header = () => {

  return (
    <header className="bg-black text-white flex items-center justify-between p-4">
      {/* Heading */}
      <h1 className="text-start text-lg font-bold">eBazzar - Online Shopping</h1>

      {/* Searchbar with Icon & Custom Tailwind Classes */}
      <div className="relative flex-1 mx-9">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="search"
          placeholder="Search your products..."
          className="w-full pl-10 p-2 rounded-sm text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </header>
  );
};

export default Header;
