import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-r from-purple-200 to-blue-300 flex flex-col  items-center'>
      <section className=''>
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl mt-5">How does it work?</h2>
            <p class="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p>
          </div>

          <div class="relative mt-12 lg:mt-20">
            <div class="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
              
            </div>

            <div class="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
              <div>
                <div class="flex items-center justify-center w-16 h-16 mx-auto bg-purple-300 border-2 border-gray-200 rounded-full shadow">
                  <span class="text-xl font-semibold text-gray-700 "> 1 </span>
                </div>
                <h3 class="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Join the eBazzar </h3>
                <p class="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
              </div>

              <div>
                <div class="flex items-center justify-center w-16 h-16 mx-auto bg-purple-200 border-2 border-gray-200 rounded-full shadow">
                  <span class="text-xl font-semibold text-gray-700"> 2 </span>
                </div>
                <h3 class="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Browse & Buy Products</h3>
                <p class="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
              </div>

              <div>
                <div class="flex items-center justify-center w-16 h-16 mx-auto bg-pink-200 border-2 border-gray-200 rounded-full shadow">
                  <span class="text-xl font-semibold text-gray-700"> 3 </span>
                </div>
                <h3 class="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Order, Pay & and save</h3>
                <p class="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
};

export default LandingPage;
