import React from 'react';

function Disclaimer() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-blue-300 to-indigo-600 px-6 py-12">
      <div className="max-w-4xl bg-white bg-opacity-90 rounded-3xl shadow-2xl p-10 sm:p-14 text-gray-800">
        <h1 className="text-5xl font-extrabold text-center text-teal-600 mb-12 tracking-wide drop-shadow-md">
          Disclaimer
        </h1>

        {[
          {
            title: '1. General Information',
            content: `The information provided on the eBazzar website is for general informational purposes only. While we strive to provide accurate and up-to-date information, we make no warranties or representations about the accuracy, completeness, or reliability of any content on this website.`,
          },
          {
            title: '2. Product Information',
            content: `The images and descriptions of the products provided on eBazzar are for illustrative purposes only. While we make every effort to ensure the accuracy of product details, there may be discrepancies between the actual product and its depiction on the site, including pricing, availability, and specifications.`,
          },
          {
            title: '3. Third-Party Links',
            content: `Our website may contain links to third-party websites or services. These links are provided for convenience and informational purposes only. eBazzar does not endorse or control the content, products, or services provided by third-party websites and is not responsible for any issues arising from their use.`,
          },
          {
            title: '4. Limitation of Liability',
            content: `To the fullest extent permitted by applicable law, eBazzar shall not be liable for any damages, losses, or expenses arising out of or in connection with the use of our website, services, or products, including, but not limited to, direct, indirect, incidental, or consequential damages.`,
          },
          {
            title: '5. No Guarantee of Availability',
            content: `While we make every effort to ensure the availability of our website and services, eBazzar does not guarantee uninterrupted access to the site or its features. We may suspend or terminate our services at any time for maintenance or other reasons without prior notice.`,
          },
          {
            title: '6. Changes to the Disclaimer',
            content: `We reserve the right to update or modify this Disclaimer at any time without prior notice. Any changes will be posted on this page with the updated date. We encourage you to review this Disclaimer periodically for any updates.`,
          },
        ].map(({ title, content }, idx) => (
          <section key={idx} className="mb-10 last:mb-0">
            <h2 className="text-3xl font-semibold text-gray-700 mb-6 border-l-4 border-teal-500 pl-4 drop-shadow-sm">
              {title}
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">{content}</p>
          </section>
        ))}

        <p className="text-lg leading-relaxed text-gray-700 mt-8">
          If you have any questions or concerns regarding this Disclaimer, please contact us at{' '}
          <a href="mailto:support@ebazzar.com" className="text-blue-500 hover:underline font-semibold">
            support@ebazzar.com
          </a>.
        </p>
      </div>
    </div>
  );
}

export default Disclaimer;
