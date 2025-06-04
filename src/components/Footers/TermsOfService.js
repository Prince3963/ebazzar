import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-300 to-indigo-500 px-6 py-12">
      <div className="max-w-4xl bg-white bg-opacity-90 rounded-3xl shadow-2xl p-10 sm:p-14 text-gray-800">
        <h1 className="text-5xl font-extrabold text-center text-teal-600 mb-12 tracking-wide drop-shadow-md">
          Terms of Service
        </h1>

        <p className="text-lg sm:text-xl leading-relaxed mb-10">
          Welcome to <span className="font-semibold text-teal-700">eBazzar</span>. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing or using eBazzar, you agree to comply with these terms. If you do not agree with these terms, please do not use our services.
        </p>

        {[
          {
            title: '1. Acceptance of Terms',
            content:
              'By using eBazzar’s services, you agree to the terms and conditions outlined here. We reserve the right to modify or update these terms at any time, and you are responsible for reviewing them periodically.',
          },
          {
            title: '2. User Responsibilities',
            content:
              'You agree to use eBazzar for lawful purposes only and shall not engage in any conduct that could damage, disable, or impair the website’s functionality. This includes but is not limited to, the use of harmful software, spam, or fraudulent activities.',
          },
          {
            title: '3. Account Registration',
            content:
              'In order to access certain features, you may need to register an account with eBazzar. You agree to provide accurate and complete information during the registration process. You are responsible for maintaining the confidentiality of your account credentials and agree to notify us immediately of any unauthorized access.',
          },
          {
            title: '4. Payments and Transactions',
            content:
              'All purchases made on eBazzar are subject to applicable taxes and fees. Payments for products and services must be made using the payment methods provided on the website. By making a purchase, you agree to pay the full amount for the products or services you select.',
          },
          {
            title: '5. Privacy Policy',
            content: (
              <>
                Your privacy is important to us. Please refer to our{' '}
                <a href="/privacy-policy" className="text-blue-500 underline hover:text-blue-700">
                  Privacy Policy
                </a>{' '}
                for details about how we collect, use, and protect your personal information.
              </>
            ),
          },
          {
            title: '6. Termination of Use',
            content:
              'We reserve the right to suspend or terminate your access to eBazzar at our sole discretion, without notice, if we believe you have violated these Terms of Service.',
          },
          {
            title: '7. Limitation of Liability',
            content:
              'eBazzar is not liable for any direct, indirect, incidental, or consequential damages arising from the use of the website or services. We do not guarantee that the website will be error-free or uninterrupted.',
          },
          {
            title: '8. Governing Law',
            content:
              'These terms are governed by and construed in accordance with the laws of [Your Country/State]. Any legal disputes will be handled in the appropriate courts of [Your Location].',
          },
          {
            title: '9. Contact Us',
            content: (
              <>
                If you have any questions about these Terms of Service, please contact us at{' '}
                <span className="font-semibold text-teal-700">support@ebazzar.com</span>.
              </>
            ),
          },
        ].map(({ title, content }, index) => (
          <section key={index} className="mb-10 last:mb-0">
            <h2 className="text-3xl font-semibold text-gray-700 mb-4 border-l-4 border-teal-500 pl-4 drop-shadow-sm">
              {title}
            </h2>
            <p className="text-lg leading-relaxed">{content}</p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default TermsOfService;
