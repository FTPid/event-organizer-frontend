const Hero = () => {
  return (
    <section
      className="h-screen bg-cover bg-center bg-no-repeat text-white flex flex-col justify-center items-center text-center"
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">Welcome to Lumiere Organizer!</h1>
      <p className="text-2xl max-w-lg drop-shadow-md">
        Manage and discover events with ease. Plan your next big moment with us!
      </p>
      <button className="mt-6 bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-200">
        Get Started
      </button>
    </section>
  );
};

export default Hero;
