"use client"; // Add this line to mark the file as a client component

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { parseCookies } from 'nookies';
import { jwtDecode } from 'jwt-decode';

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
    <nav className="fixed top-0 left-0 w-full bg-transparent z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold text-white">
          Event Organizer
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-white hover:text-yellow-300">Home</Link>
          <Link href="/about-us" className="text-white hover:text-yellow-300">About Us</Link>
          <Link href="/events" className="text-white hover:text-yellow-300">Events</Link>
          <Link href="/tickets" className="text-white hover:text-yellow-300">Tickets</Link>

          {role === 'ORGANIZER' && (
            <Link href="/settings" className="text-white hover:text-yellow-300">Settings</Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-white hover:text-yellow-300"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className="text-white hover:text-yellow-300">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;