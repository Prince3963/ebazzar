import React from 'react';

function PrivacyPolicy() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-200 to-indigo-400 px-4">

            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-teal-600 mb-8">Privacy Policy</h1>

                <p className="text-lg text-gray-700 mb-6">
                    At eBazzar, your privacy is of paramount importance to us. This Privacy Policy document outlines the types of personal information that is collected and recorded by eBazzar and how we use it.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">1. Information We Collect</h2>
                <p className="text-lg text-gray-700 mb-6">
                    We collect various types of information to provide and improve our services. This includes:
                </p>
                <ul className="list-disc pl-6 mb-6">
                    <li>Personal Information (e.g., name, email, phone number)</li>
                    <li>Account Information (e.g., user name, password)</li>
                    <li>Transaction Data (e.g., billing information, purchase history)</li>
                    <li>Device and Log Data (e.g., IP address, browser type, access times)</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">2. How We Use Your Information</h2>
                <p className="text-lg text-gray-700 mb-6">
                    We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc pl-6 mb-6">
                    <li>To provide and improve our services</li>
                    <li>To process transactions and manage user accounts</li>
                    <li>To communicate with you regarding updates, promotions, and customer support</li>
                    <li>To comply with legal obligations and protect our rights</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">3. Data Security</h2>
                <p className="text-lg text-gray-700 mb-6">
                    We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">4. Your Rights</h2>
                <p className="text-lg text-gray-700 mb-6">
                    You have the right to access, update, or delete your personal information at any time. You may also opt-out of receiving marketing communications by following the unsubscribe instructions in our emails.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">5. Changes to This Privacy Policy</h2>
                <p className="text-lg text-gray-700 mb-6">
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the "Last Updated" date at the top of the page will be revised. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
                </p>

                <p className="text-lg text-gray-700 mt-8">
                    If you have any questions or concerns regarding this Privacy Policy, please contact us at <a href="mailto:support@ebazzar.com" className="text-blue-600 hover:underline">support@ebazzar.com</a>.
                </p>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
