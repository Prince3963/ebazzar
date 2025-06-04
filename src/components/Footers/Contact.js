import React from 'react';
import { MdLocationOn, MdEmail, MdPhone } from 'react-icons/md';

function Contact() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-300 to-indigo-600 px-6 py-16">
      <div className="max-w-3xl bg-white bg-opacity-90 rounded-3xl shadow-2xl p-10 text-center text-gray-800">
        <h1 className="text-5xl font-extrabold text-teal-600 mb-8 drop-shadow-md">Contact Us</h1>
        <p className="text-lg mb-12 leading-relaxed">
          We’d love to hear from you! Feel free to reach out to us using the details below.
        </p>
        
        <div className="space-y-10 text-gray-700 text-xl font-semibold">
          {/* Physical Address */}
          <div className="flex items-center justify-center space-x-4">
            <MdLocationOn className="text-teal-600 w-8 h-8" />
            <span className="text-teal-900 font-bold">
              B-10, Evergreen Society, Surat, Gujarat, India 394517
            </span>
          </div>

          {/* Email Address */}
          <div className="flex items-center justify-center space-x-4">
            <MdEmail className="text-teal-600 w-8 h-8" />
            <a href="mailto:support@ebazzar.com" className="text-teal-900 font-bold hover:underline">
              support@ebazzar.com
            </a>
          </div>

          {/* Contact Number */}
          <div className="flex items-center justify-center space-x-4">
            <MdPhone className="text-teal-600 w-8 h-8" />
            <a href="tel:+1234567890" className="text-teal-900 font-bold hover:underline">
              +123 456 7890
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
