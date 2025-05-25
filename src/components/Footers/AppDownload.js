import React from 'react';
import { FaGooglePlay, FaApple } from 'react-icons/fa';

function AppDownload() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-200 to-indigo-400 p-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-teal-600 mb-6">Download Our App</h1>
        
        <p className="text-lg text-white mb-6">
          Get the eBazzar app now and shop the latest products with ease, access exclusive deals, and manage your orders directly from your phone.
        </p>
        
        <div className="flex justify-center space-x-8">
          {/* Google Play Link */}
          <a 
            href="https://play.google.com/store/apps/details?id=com.ebazzar.app" 
            className="flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md shadow-lg transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGooglePlay size={36} className="mr-3" />
            <span>Download on Google Play</span>
          </a>

          {/* App Store Link */}
          <a 
            href="https://apps.apple.com/us/app/ebazzar/id1234567890" 
            className="flex items-center bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-md shadow-lg transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaApple size={36} className="mr-3" />
            <span>Download on the App Store</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default AppDownload;
