import React from 'react';

function Contact() {
  return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-200 to-indigo-400 px-4">

      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-teal-600 mb-6">Contact Us</h1>
        <p className="text-lg text-gray-700 mb-12">
          We’d love to hear from you! Feel free to reach out to us using the details below.
        </p>
        
        <div className="space-y-6 text-gray-700 text-xl">
          {/* Physical Address */}
          <div className="flex justify-center items-center space-x-4">
            <span className="font-semibold">Physical Address:</span>
            <span className="text-teal-900 font-bold">B-10, Evergreen Socity, Surat, Gujarat, India 
                394517
            </span>
          </div>

          {/* Email Address */}
          <div className="flex justify-center items-center space-x-4">
            <span className="font-semibold">Email Address:</span>
            <span className="text-teal-900 font-bold">support@ebazzar.com</span>
          </div>

          {/* Contact Number */}
          <div className="flex justify-center items-center space-x-4">
            <span className="font-semibold">Contact Number:</span>
            <span className="text-teal-900 font-bold">+123 456 7890</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
