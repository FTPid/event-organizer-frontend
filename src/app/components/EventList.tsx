"use client";
import React, { useEffect, useState } from "react";
import { fetchEvents, Event } from "../api/events";
import Swal from "sweetalert2";
import { createTicketPurchase } from "../api/tickets";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import AOS from "aos";
import "aos/dist/aos.css";

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [seatCount, setSeatCount] = useState<number>(1);
  const [promoCode, setPromoCode] = useState<string>("");
  const [transaction, setTransaction] = useState<any | null>(null);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);

  const loadEvents = async (page: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      const { data, pagination } = await fetchEvents(page, debouncedSearchQuery, categoryFilter);
      setEvents(data);
      setPagination(pagination); // Update pagination state
    } catch (error) {
      setError("Failed to load events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      try {
        const decoded: { id: number; exp: number } = jwtDecode(accessToken);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp > currentTime) {
          setIsLoggedIn(true);
          setUserId(decoded.id);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    }
    loadEvents(pagination.currentPage); // Load events for the current page
  }, [debouncedSearchQuery, categoryFilter, pagination.currentPage]);

  const formatCurrency = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleBuyTicket = (event: Event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleSubmitPurchase = async () => {
    if (!isLoggedIn || !selectedEvent) {
      Swal.fire({
        title: "Login Required",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const accessToken = Cookies.get("access_token");

    if (accessToken && userId && selectedEvent) {
      try {
        const responseData = await createTicketPurchase(
          userId,
          selectedEvent.id,
          promoCode,
          seatCount,
          accessToken
        );

        setTransaction(responseData.transaction);
        setPurchaseError(null);

        Swal.fire({
          title: "Transaction Successful!",
          text: `Transaction ID: ${responseData.transaction.id}\nTotal Amount: ${responseData.transaction.totalAmount} IDR\nDiscount: ${responseData.transaction.discount} IDR\nPayment Status: ${responseData.transaction.paymentStatus}`,
          icon: "success",
          confirmButtonText: "OK",
        });

        setShowModal(false);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred while purchasing tickets.";
        setPurchaseError(errorMessage);
        setTransaction(null);
        Swal.fire({
          title: "Can't buy ticket!",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  const handlePreviousPage = () => {
    if (pagination.currentPage > 1) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
    }
  };

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
    }
  };

  return (
    <section className="py-20 text-center text-black bg-gray-100">
      <h2 className="text-4xl font-bold mb-8">Upcoming Events</h2>

      <div className="flex justify-center items-center mb-8 gap-4 px-4 sm:px-8 lg:px-16 xl:px-24">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
        >
          <option value="">All Categories</option>
          <option value="Music">Music</option>
          <option value="Technology">Technology</option>
          <option value="Sports">Sports</option>
          <option value="Education">Education</option>
        </select>
      </div>

      {loading ? (
        <p className="text-lg">Loading events...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2 sm:px-6 lg:px-8 xl:px-16">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-all transform hover:scale-105 hover:shadow-2xl duration-300"
                data-aos="fade-up"
              >
                <a href={`/events/${event.id}`} className="block">
                  <div className="relative">
                    <img
                      className="w-full h-56 object-cover transition-all duration-300 transform hover:scale-110"
                      src={event.image}
                      alt={event.name}
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-lg">
                      {event.type}
                    </div>
                  </div>
                </a>
                <div className="p-6">
                  <a href={`/events/${event.id}`} className="block">
                    <h5 className="text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-3">
                      {event.name}
                    </h5>
                  </a>
                  <div className="text-gray-600 mb-4">
                    <p className="text-sm mb-2">
                      Date: {new Date(event.startDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm">Seats Available: {event.available_seat}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-gray-900">
                      {event.price ? `${formatCurrency(event.price)} IDR` : "Free"}
                    </span>
                    <button
                      onClick={() => handleBuyTicket(event)}
                      className="bg-blue-600 text-white hover:bg-blue-700 font-medium rounded-lg px-5 py-2 transition-all duration-300 transform hover:scale-105 focus:outline-none"
                    >
                      Buy Ticket
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-8 gap-4">
            <button
              onClick={handlePreviousPage}
              disabled={pagination.currentPage === 1}
              className={`px-4 py-2 rounded-lg text-white ${pagination.currentPage === 1 ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              Back
            </button>
            <span className="text-lg font-medium">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={pagination.currentPage === pagination.totalPages}
              className={`px-4 py-2 rounded-lg text-white ${pagination.currentPage === pagination.totalPages
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Modal for ticket purchase */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">
              Purchase Tickets for {selectedEvent.name}
            </h2>
            <div>
              <label htmlFor="seatCount" className="block text-gray-700">
                Seat Count:
              </label>
              <input
                type="number"
                id="seatCount"
                value={seatCount}
                onChange={(e) => setSeatCount(Number(e.target.value))}
                className="border border-gray-300 rounded-lg p-2 w-full mb-4"
              />
            </div>
            <div>
              <label htmlFor="promoCode" className="block text-gray-700">
                Promo Code (Optional):
              </label>
              <input
                type="text"
                id="promoCode"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full mb-4"
              />
            </div>
            {purchaseError && <div className="text-red-500 mb-4">{purchaseError}</div>}
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white hover:bg-gray-600 rounded-lg px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitPurchase}
                className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-4 py-2"
              >
                Submit Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventList;
