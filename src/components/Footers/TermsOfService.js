import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-200 to-indigo-400 px-4">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-teal-600 mb-8">Terms of Service</h1>

        <p className="text-lg text-gray-800 mb-6">
          Welcome to <span className="font-semibold">eBazzar</span>. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing or using eBazzar, you agree to comply with these terms. If you do not agree with these terms, please do not use our services.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mt-12">1. Acceptance of Terms</h2>
        <p className="text-lg text-gray-700 mb-6">
          By using eBazzar’s services, you agree to the terms and conditions outlined here. We reserve the right to modify or update these terms at any time, and you are responsible for reviewing them periodically.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mt-12">2. User Responsibilities</h2>
        <p className="text-lg text-gray-700 mb-6">
          You agree to use eBazzar for lawful purposes only and shall not engage in any conduct that could damage, disable, or impair the website’s functionality. This includes but is not limited to, the use of harmful software, spam, or fraudulent activities.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mt-12">3. Account Registration</h2>
        <p className="text-lg text-gray-700 mb-6">
          In order to access certain features, you may need to register an account with eBazzar. You agree to provide accurate and complete information during the registration process. You are responsible for maintaining the confidentiality of your account credentials and agree to notify us immediately of any unauthorized access.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mt-12">4. Payments and Transactions</h2>
        <p className="text-lg text-gray-700 mb-6">
          All purchases made on eBazzar are subject to applicable taxes and fees. Payments for products and services must be made using the payment methods provided on the website. By making a purchase, you agree to pay the full amount for the products or services you select.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mt-12">5. Privacy Policy</h2>
        <p className="text-lg text-gray-700 mb-6">
          Your privacy is important to us. Please refer to our <a href="/privacy-policy" className="text-blue-400">Privacy Policy</a> for details about how we collect, use, and protect your personal information.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mt-12">6. Termination of Use</h2>
        <p className="text-lg text-gray-700 mb-6">
          We reserve the right to suspend or terminate your access to eBazzar at our sole discretion, without notice, if we believe you have violated these Terms of Service.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mt-12">7. Limitation of Liability</h2>
        <p className="text-lg text-gray-700 mb-6">
          eBazzar is not liable for any direct, indirect, incidental, or consequential damages arising from the use of the website or services. We do not guarantee that the website will be error-free or uninterrupted.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mt-12">8. Governing Law</h2>
        <p className="text-lg text-gray-700 mb-6">
          These terms are governed by and construed in accordance with the laws of [Your Country/State]. Any legal disputes will be handled in the appropriate courts of [Your Location].
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mt-12">9. Contact Us</h2>
        <p className="text-lg text-gray-700 mb-6">
          If you have any questions about these Terms of Service, please contact us at <span className="font-semibold">support@ebazzar.com</span>.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
