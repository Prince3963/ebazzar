import React from 'react';
import Img from '../Image/TriBase.png'; // CEO Image (TriBase)
import LeadDeveloper from '../Image/asus.jpg'; // Lead Developer Image (Aaditya)

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-200 to-indigo-400 px-4">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-teal-600 mb-8">About eBazzar</h1>
        <p className="text-lg text-gray-700 mb-6">
          Welcome to <span className="font-semibold">eBazzar</span>, your one-stop destination for all things shopping! At eBazzar, we aim to provide you with a seamless and enjoyable online shopping experience. Whether you're looking for the latest fashion trends, electronic gadgets, home essentials, or unique gifts, we have it all.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Our platform is designed with you in mind. We strive to make shopping easy, fun, and convenient, all from the comfort of your home. With a wide range of products, great deals, and quick delivery options, eBazzar is here to make your shopping experience smooth and hassle-free.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mt-12">Our Mission</h2>
        <p className="text-lg text-gray-700 mb-6">
          Our mission is simple: to provide an exceptional shopping experience with an extensive selection of products, secure payment options, and customer support that’s always ready to help. We aim to make online shopping accessible and affordable for everyone.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mt-12">Our Vision</h2>
        <p className="text-lg text-gray-700 mb-6">
          Our vision is to become the leading online shopping platform that customers trust for quality products, competitive prices, and exceptional service. We believe in constantly evolving and staying ahead of the trends, so we can bring the best shopping experience to our users.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mt-12">Meet The Team</h2>
        <div className="flex justify-around mt-8">
          {/* Team Member 1 */}
          <div className="text-center">
            <img
              src={Img}
              alt="TriBase Solution"
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-700">TriBase Solution</h3>
            <p className="text-gray-700">CEO & Founder</p>
          </div>
          {/* Team Member 2 */}
          <div className="text-center">
            <img
              src={LeadDeveloper}
              alt="Aaditya"
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-700">Aaditya</h3>
            <p className="text-gray-700">Lead Developer</p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </div>
    </div>
  );
};

export default About;
