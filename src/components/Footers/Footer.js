import React from "react";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for routing

const Footer = () => {
  // Footer sections data
  const legalLinks = [
    { name: "Terms of Service", link: "/terms" },
    { name: "Privacy Policy", link: "/privacy" },
    { name: "Disclaimer", link: "/disclaimer" },
  ];

  const connectLinks = [
    { name: "Facebook", link: "https://facebook.com" },
    { name: "LinkedIn", link: "https://linkedin.com" },
    { name: "Instagram", link: "https://instagram.com" },
  ];

  const companyLinks = [
    { name: "About Us", link: "/about" },
    { name: "Careers", link: "/careers" },
  ];

  const contactLinks = [
    { name: "Physical Address", link: "/contact" },
    { name: "Email Address", link: "/contact" },
    { name: "Contact Number", link: "/contact" },
  ];

  const appDownloadLinks = [
    { name: "Google Play", link: "/app", icon: <FaGooglePlay size={36} /> },
    { name: "App Store", link: "/app", icon: <FaApple size={36} /> },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#131A22] to-[#1f2937] text-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between flex-wrap mb-8">

          {/* Legal Section */}
          <div className="footer-section w-full sm:w-1/5 mb-6 sm:mb-0">
            <h3 className="text-xl font-semibold text-teal-400 mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              {legalLinks.map((item, i) => (
                <li key={i}>
                  <Link to={item.link} className="hover:text-teal-500 transition-all">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect with Us Section */}
          <div className="footer-section w-full sm:w-1/5 mb-6 sm:mb-0">
            <h3 className="text-xl font-semibold text-teal-400 mb-4">Connect with Us</h3>
            <div className="flex space-x-6">
              {connectLinks.map((item, i) => (
                <a key={i} href={item.link} className="text-blue-600 hover:text-blue-700 transition-all">
                  {item.name === "Facebook" && <FaFacebook size={28} />}
                  {item.name === "LinkedIn" && <FaLinkedin size={28} />}
                  {item.name === "Instagram" && <FaInstagram size={28} />}
                </a>
              ))}
            </div>
          </div>

          {/* Download Our App Section */}
          <div className="footer-section w-full sm:w-1/5 mb-6 sm:mb-0">
            <h3 className="text-xl font-semibold text-teal-400 mb-4">Download Our App</h3>
            <div className="flex space-x-6">
              {appDownloadLinks.map((item, i) => (
                <a key={i} href={item.link} className="text-green-600 hover:text-green-700 transition-all">
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company Info Section */}
          <div className="footer-section w-full sm:w-1/5 mb-6 sm:mb-0">
            <h3 className="text-xl font-semibold text-teal-400 mb-4">Company Info</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              {companyLinks.map((item, i) => (
                <li key={i}>
                  <Link to={item.link} className="hover:text-teal-500 transition-all">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="footer-section w-full sm:w-1/5">
            <h3 className="text-xl font-semibold text-teal-400 mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              {contactLinks.map((item, i) => (
                <li key={i}>
                  <a href={item.link} className="hover:text-teal-500 transition-all">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center items-center gap-4 border-t border-gray-700 pt-6">
        <p className="text-sm text-gray-400">© 2025 eBazzar. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
