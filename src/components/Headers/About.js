import React from 'react';
import Img from '../Image/TriBase.png'; // CEO Image (TriBase)
import LeadDeveloper from '../Image/asus.jpg'; // Lead Developer Image (Aaditya)

const About = () => {
  return (
    // <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-indigo-200 px-4 py-10">
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-white to-indigo-400 px-6 py-16">
      <div className="max-w-5xl bg-white bg-opacity-90 rounded-3xl shadow-2xl p-12 sm:p-16 text-gray-800">
        <h1 className="text-5xl font-extrabold text-center text-teal-600 mb-12 tracking-wide drop-shadow-md">
          About eBazzar
        </h1>

        <p className="text-lg mb-6 leading-relaxed">
          Welcome to <span className="font-semibold text-teal-600">eBazzar</span>, your one-stop destination for all things shopping! At eBazzar, we aim to provide you with a seamless and enjoyable online shopping experience. Whether you're looking for the latest fashion trends, electronic gadgets, home essentials, or unique gifts, we have it all.
        </p>
        <p className="text-lg mb-6 leading-relaxed">
          Our platform is designed with you in mind. We strive to make shopping easy, fun, and convenient, all from the comfort of your home. With a wide range of products, great deals, and quick delivery options, eBazzar is here to make your shopping experience smooth and hassle-free.
        </p>

        <h2 className="text-3xl font-semibold text-gray-700 mt-12 mb-4 border-l-4 border-teal-500 pl-4 drop-shadow-sm">
          Our Mission
        </h2>
        <p className="text-lg mb-6 leading-relaxed">
          Our mission is simple: to provide an exceptional shopping experience with an extensive selection of products, secure payment options, and customer support that’s always ready to help. We aim to make online shopping accessible and affordable for everyone.
        </p>

        <h2 className="text-3xl font-semibold text-gray-700 mt-12 mb-4 border-l-4 border-teal-500 pl-4 drop-shadow-sm">
          Our Vision
        </h2>
        <p className="text-lg mb-6 leading-relaxed">
          Our vision is to become the leading online shopping platform that customers trust for quality products, competitive prices, and exceptional service. We believe in constantly evolving and staying ahead of the trends, so we can bring the best shopping experience to our users.
        </p>

        <h2 className="text-3xl font-semibold text-gray-700 mt-12 mb-8 border-l-4 border-teal-500 pl-4 drop-shadow-sm">
          Meet The Team
        </h2>
        <div className="flex flex-wrap justify-center gap-12">
          {/* Team Member 1 */}
          <div className="w-40 text-center">
            <img
              src={Img}
              alt="TriBase Solution"
              className="w-40 h-40 object-cover rounded-full mx-auto mb-4 border-4 border-teal-500 shadow-lg"
            />
            <h3 className="text-xl font-semibold text-gray-700">TriBase Solution</h3>
            <p className="text-gray-600 italic">CEO & Founder</p>
          </div>
          {/* Team Member 2 */}
          <div className="w-40 text-center">
            <img
              src={LeadDeveloper}
              alt="Aaditya"
              className="w-40 h-40 object-cover rounded-full mx-auto mb-4 border-4 border-teal-500 shadow-lg"
            />
            <h3 className="text-xl font-semibold text-gray-700">Aaditya</h3>
            <p className="text-gray-600 italic">Lead Developer</p>
          </div>
          {/* Add more team members as needed */}
        </div>
      </div>
    </div>
  );
};

export default About;
