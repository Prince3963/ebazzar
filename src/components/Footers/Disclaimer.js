import React from 'react';

function Disclaimer() {
  return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-200 to-indigo-400 px-4">

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-teal-600 mb-8">Disclaimer</h1>

        <p className="text-lg text-gray-700 mb-6">
          This Disclaimer outlines the limitations of liability and responsibilities associated with the use of eBazzar services and products. By accessing and using our website, you agree to be bound by the terms and conditions set forth in this disclaimer.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. General Information</h2>
        <p className="text-lg text-gray-700 mb-6">
          The information provided on the eBazzar website is for general informational purposes only. While we strive to provide accurate and up-to-date information, we make no warranties or representations about the accuracy, completeness, or reliability of any content on this website.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. Product Information</h2>
        <p className="text-lg text-gray-700 mb-6">
          The images and descriptions of the products provided on eBazzar are for illustrative purposes only. While we make every effort to ensure the accuracy of product details, there may be discrepancies between the actual product and its depiction on the site, including pricing, availability, and specifications.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. Third-Party Links</h2>
        <p className="text-lg text-gray-700 mb-6">
          Our website may contain links to third-party websites or services. These links are provided for convenience and informational purposes only. eBazzar does not endorse or control the content, products, or services provided by third-party websites and is not responsible for any issues arising from their use.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. Limitation of Liability</h2>
        <p className="text-lg text-gray-700 mb-6">
          To the fullest extent permitted by applicable law, eBazzar shall not be liable for any damages, losses, or expenses arising out of or in connection with the use of our website, services, or products, including, but not limited to, direct, indirect, incidental, or consequential damages.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. No Guarantee of Availability</h2>
        <p className="text-lg text-gray-700 mb-6">
          While we make every effort to ensure the availability of our website and services, eBazzar does not guarantee uninterrupted access to the site or its features. We may suspend or terminate our services at any time for maintenance or other reasons without prior notice.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">6. Changes to the Disclaimer</h2>
        <p className="text-lg text-gray-700 mb-6">
          We reserve the right to update or modify this Disclaimer at any time without prior notice. Any changes will be posted on this page with the updated date. We encourage you to review this Disclaimer periodically for any updates.
        </p>

        <p className="text-lg text-gray-700 mt-8">
          If you have any questions or concerns regarding this Disclaimer, please contact us at <a href="mailto:support@ebazzar.com" className="text-blue-600 hover:underline">support@ebazzar.com</a>.
        </p>
      </div>
    </div>
  );
}

export default Disclaimer;
