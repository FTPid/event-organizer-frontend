"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);

  return (
    <section
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white flex flex-col justify-center items-center text-center"
      style={{ backgroundImage: "url('/images/background.png')" }}
      data-aos="fade-up"
    >
      <h1
        className="text-6xl font-bold mb-6 drop-shadow-lg"
        data-aos="fade-down"
      >
        Welcome to Lumiere Event!
      </h1>
      <div
        className="text-3xl max-w-lg drop-shadow-md"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <TypeAnimation
          sequence={[
            "Discover events you'll love.",
            2000,
            "Plan your next adventure with us.",
            2000,
            "Experience unforgettable moments.",
            2000,
            "Lumiere Event: Your event journey starts here.",
            3000,
          ]}
          wrapper="span"
          speed={50}
          style={{
            display: "inline-block",
            fontWeight: "500",
          }}
          repeat={Infinity}
        />
      </div>
    </section>
  );
};

export default Hero;
