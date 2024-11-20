"use client";

import React, { useEffect, useState } from 'react';
import { fetchEvents, Event } from '../api/events';

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEvents(page);
      setEvents(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handlePageChange = (page: number) => {
    loadEvents(page);
  };
  const formatCurrency = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
  return (
    <section className="py-20 text-center text-black bg-gray-100">
      <h2 className="text-4xl font-bold mb-8">Upcoming Events</h2>
      {loading ? (
        <p className="text-lg">Loading events...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-2">
          {events.map((event) => (
            <div key={event.id} className="bg-white border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105 overflow-hidden">
              <a href={`/events/${event.id}`}>
                <img className="p-4 rounded-t-lg transition-opacity duration-300 hover:opacity-80" src={event.image} alt={event.name} />
              </a>
              <div className="px-5 pb-5">
                <a href={`/events/${event.id}`}>
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 hover:text-blue-600 transition-colors">{event.name}</h5>
                </a>
                <div className="mt-2">
                  <p className="text-gray-700 flex items-center">
                    <svg className="w-5 h-5 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 10.001 16.001A8 8 0 0010 2zm0 14a6 6 0 100-12 6 6 0 000 12z" /></svg>
                    Type: {event.type}
                  </p>
                  <p className="text-gray-700 flex items-center">
                    <svg className="w-5 h-5 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 10.001 16.001A8 8 0 0010 2zm0 14a6 6 0 100-12 6 6 0 000 12z" /></svg>
                    Date: {new Date(event.startDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 flex items-center">
                    <svg className="w-5 h-5 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 10.001 16.001A8 8 0 0010 2zm0 14a6 6 0 100-12 6 6 0 000 12z" /></svg>
                    Seats Available: {event.available_seat}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {event.price ? `${formatCurrency(event.price)} IDR` : 'Free'}
                  </span>
                  <a href="#" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300">Buy Ticket</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          className="mr-2 p-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
        >
          Back
        </button>
        <span className="text-lg">
          Page {pagination.currentPage} of {pagination.totalPages}
        </span>
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
          className="ml-2 p-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default EventList;