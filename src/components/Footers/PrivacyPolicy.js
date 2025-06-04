import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-300 to-indigo-500 px-6 py-12">
      <div className="max-w-4xl bg-white bg-opacity-90 rounded-3xl shadow-2xl p-10 sm:p-14 text-gray-800">
        <h1 className="text-5xl font-extrabold text-center text-teal-600 mb-12 tracking-wide drop-shadow-md">
          Privacy Policy
        </h1>

        <p className="text-lg sm:text-xl leading-relaxed mb-10">
          At <span className="font-semibold text-teal-700">eBazzar</span>, your privacy is of paramount importance to us. This Privacy Policy document outlines the types of personal information that is collected and recorded by eBazzar and how we use it.
        </p>

        {[
          {
            title: '1. Information We Collect',
            content: (
              <>
                <p className="mb-4 text-lg leading-relaxed text-gray-700">
                  We collect various types of information to provide and improve our services. This includes:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
                  <li>Personal Information (e.g., name, email, phone number)</li>
                  <li>Account Information (e.g., user name, password)</li>
                  <li>Transaction Data (e.g., billing information, purchase history)</li>
                  <li>Device and Log Data (e.g., IP address, browser type, access times)</li>
                </ul>
              </>
            ),
          },
          {
            title: '2. How We Use Your Information',
            content: (
              <>
                <p className="mb-4 text-lg leading-relaxed text-gray-700">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
                  <li>To provide and improve our services</li>
                  <li>To process transactions and manage user accounts</li>
                  <li>To communicate with you regarding updates, promotions, and customer support</li>
                  <li>To comply with legal obligations and protect our rights</li>
                </ul>
              </>
            ),
          },
          {
            title: '3. Data Security',
            content: (
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            ),
          },
          {
            title: '4. Your Rights',
            content: (
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                You have the right to access, update, or delete your personal information at any time. You may also opt-out of receiving marketing communications by following the unsubscribe instructions in our emails.
              </p>
            ),
          },
          {
            title: '5. Changes to This Privacy Policy',
            content: (
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the &quot;Last Updated&quot; date at the top of the page will be revised. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
              </p>
            ),
          },
          {
            title: 'Contact Us',
            content: (
              <p className="text-lg leading-relaxed text-gray-700 mt-8">
                If you have any questions or concerns regarding this Privacy Policy, please contact us at{' '}
                <a href="mailto:support@ebazzar.com" className="text-blue-500 hover:underline font-semibold">
                  support@ebazzar.com
                </a>
                .
              </p>
            ),
          },
        ].map(({ title, content }, idx) => (
          <section key={idx} className="mb-10 last:mb-0">
            {title !== 'Contact Us' && (
              <h2 className="text-3xl font-semibold text-gray-700 mb-6 border-l-4 border-teal-500 pl-4 drop-shadow-sm">
                {title}
              </h2>
            )}
            {content}
          </section>
        ))}
      </div>
    </div>
  );
}

export default PrivacyPolicy;
