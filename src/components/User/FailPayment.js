import React from 'react';
import { useNavigate } from 'react-router-dom';

function FailPayment() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Modal box */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        {/* Fail Icon */}
        <div className="text-red-500 text-5xl mb-4">❌</div>

        {/* Message */}
        <h2 className="text-2xl font-bold mb-2 text-red-600">Payment Failed!</h2>
        <p className="text-gray-600 mb-6">Something went wrong. Please try again.</p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/payment')}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Retry Payment
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default FailPayment;
