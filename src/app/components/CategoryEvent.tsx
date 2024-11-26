"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const CategoryEvent = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="py-20 text-center bg-gray-50">
      <h2 className="text-4xl font-bold text-gray-800 mb-10" data-aos="fade-up">
        Event Categories
      </h2>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-4 md:px-16">

        <div
          className="relative p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transform hover:scale-105 transition duration-500 ease-in-out group"
          data-aos="fade-up"
        >
          <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-500 rounded-full mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9 3v12.75A4.5 4.5 0 0012 21a4.5 4.5 0 003-8.25V6h4V3H9z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Music</h3>
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex justify-center items-center text-center p-4 rounded-lg">
            <p className="text-xl">Experience live music events, concerts, and festivals.</p>
          </div>
        </div>


        <div
          className="relative p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transform hover:scale-105 transition duration-500 ease-in-out group"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 text-yellow-500 rounded-full mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 3a9 9 0 100 18 9 9 0 000-18zm-4 9h2a2 2 0 010 4H8a2 2 0 010-4zm8 0h-2a2 2 0 000 4h2a2 2 0 100-4z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Technology</h3>
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex justify-center items-center text-center p-4 rounded-lg">
            <p className="text-xl">Stay ahead in the tech world with cutting-edge conferences and talks.</p>
          </div>
        </div>

        <div
          className="relative p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transform hover:scale-105 transition duration-500 ease-in-out group"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="flex items-center justify-center w-16 h-16 bg-green-100 text-green-500 rounded-full mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M15 10a3 3 0 100-6 3 3 0 000 6zm-6 10a3 3 0 100-6 3 3 0 000 6zm6-4.5a3 3 0 100-6 3 3 0 000 6zm-6-3a3 3 0 100-6 3 3 0 000 6z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Sports</h3>
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex justify-center items-center text-center p-4 rounded-lg">
            <p className="text-xl">Join exciting sports events, matches, and tournaments!</p>
          </div>
        </div>

        <div
          className="relative p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transform hover:scale-105 transition duration-500 ease-in-out group"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 text-red-500 rounded-full mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L1.5 7l10.5 5 10.5-5L12 2zm0 8L2.5 13v5l9.5 4.5L21.5 18v-5L12 10z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Education</h3>
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-lg text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex justify-center items-center text-center p-4 rounded-lg">
            <p className="text-xl">Explore educational workshops, seminars, and learning experiences.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryEvent;
