"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { parseCookies } from 'nookies';
import { jwtDecode } from 'jwt-decode';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface DecodedToken {
  id: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    const access_token = cookies.access_token;

    if (access_token) {
      try {
        const decoded: DecodedToken = jwtDecode<DecodedToken>(access_token);
        setIsLoggedIn(true);
        setRole(decoded.role);
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsLoggedIn(false);
        setRole(null);
      }
    } else {
      setIsLoggedIn(false);
      setRole(null);
    }
    setLoading(false);

    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleLogout = () => {
    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    setIsLoggedIn(false);
    setRole(null);
    router.push('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-50 z-50" data-aos="fade-down">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold text-white" data-aos="fade-right">
          Lumiere Organizer
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="block md:hidden text-white focus:outline-none"
          data-aos="fade-left"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        <div
          className={`${menuOpen ? 'block' : 'hidden'
            } md:flex space-x-4 absolute md:relative top-full md:top-auto left-0 md:left-auto w-full md:w-auto bg-black md:bg-transparent text-center md:text-left`}
          data-aos="fade-up"
        >
          <Link href="/" className="block py-2 md:inline-block md:py-0 text-white hover:text-yellow-300" data-aos="zoom-in">
            Home
          </Link>
          <Link href="/about-us" className="block py-2 md:inline-block md:py-0 text-white hover:text-yellow-300" data-aos="zoom-in" data-aos-delay="200">
            About Us
          </Link>
          <Link href="/events" className="block py-2 md:inline-block md:py-0 text-white hover:text-yellow-300" data-aos="zoom-in" data-aos-delay="400">
            Events
          </Link>
          <Link href="/tickets" className="block py-2 md:inline-block md:py-0 text-white hover:text-yellow-300" data-aos="zoom-in" data-aos-delay="600">
            Tickets
          </Link>

          {role === 'ORGANIZER' && (
            <Link href="/settings" className="block py-2 md:inline-block md:py-0 text-white hover:text-yellow-300" data-aos="zoom-in" data-aos-delay="800">
              Settings
            </Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="block py-2 md:inline-block md:py-0 text-white hover:text-yellow-300"
              data-aos="zoom-in"
              data-aos-delay="1000"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="block py-2 md:inline-block md:py-0 text-white hover:text-yellow-300" data-aos="zoom-in" data-aos-delay="1000">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
