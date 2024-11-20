const AboutUs = () => {
  return (
    <section className="relative w-full h-screen bg-black text-white">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold mb-6">
          About Us
        </h2>
        <p className="text-lg max-w-2xl mb-12">
          We are passionate about connecting people through events and making event management seamless.
          Join us to explore, create, and experience amazing moments!
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
          {/* Card 1 */}
          <div className="bg-white text-black p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM3 18a7 7 0 0114 0H3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Our Vision</h3>
            <p className="text-center text-gray-600">
              To be the go-to platform for discovering and managing events
              worldwide.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white text-black p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-7V5a1 1 0 112 0v6a1 1 0 01-.293.707l-2 2a1 1 0 01-1.414-1.414L9 11z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Our Mission</h3>
            <p className="text-center text-gray-600">
              Simplify event planning and discovery for everyone, everywhere.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white text-black p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5 8a3 3 0 116 0 3 3 0 01-6 0zM2 16a6 6 0 1112 0H2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Join Us</h3>
            <p className="text-center text-gray-600">
              Become part of our growing community and shape the future of events.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
