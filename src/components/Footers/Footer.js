import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-[#131A22] m-auto text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid justify-items-center grid-cols-1 md:grid-cols-4 gap-8">
        {/* Get to Know Us */}
        <div>
          <h3 className="font-bold mb-2">About eBazzar</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>gitHub -BackEnd</li>
            <li>gitHub -FrontEnd</li>
            {/* <li>Press Releases</li>
            <li>Amazon Science</li> */}
          </ul>
        </div>

        {/* Connect with Us */}
        <div>
          <h3 className="font-bold mb-2">Connect with Us</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>Facebook</li>
            <li>LinkdIn</li>
            <li>Instagram</li>
          </ul>
        </div>

        {/* Make Money with Us */}
        <div>
          <h3 className="font-bold mb-2">Make Money with Us</h3>
          <ul className="space-y-1 text-sm text-gray-300">
           <li>Review</li>
          </ul>
        </div>

        {/* Let Us Help You */}
        <div>
          <h3 className="font-bold mb-2">Let Us Help You</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>HelpLine Number</li>
            <li>Ask your Query Centre</li>
            
            <li>eBazzar App</li>
            <li>Help</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 flex justify-center items-center gap-4">
        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-6" /> */}
      </div>
    </footer>
  );
};

export default Footer;
