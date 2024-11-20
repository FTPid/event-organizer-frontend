"use client";
import React, { useEffect, useState } from 'react';
import { fetchEvents, Event } from '../api/events';

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');


  const loadEvents = async (page: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      const { data, pagination } = await fetchEvents(page, searchQuery, categoryFilter);

      setEvents(data);
      setPagination(pagination);
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


  const handleSearch = () => {
    loadEvents(1);
  };


  const handlePageChange = (page: number) => {
    loadEvents(page);
  };


  const formatCurrency = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <section className="py-20 text-center text-black bg-gray-100">
      <h2 className="text-4xl font-bold mb-8">Upcoming Events</h2>

      <div className="flex justify-center items-center mb-8 gap-4">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-1/3"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-1/3"
        >
          <option value="">All Categories</option>
          <option value="Music">Music</option>
          <option value="Technology">Technology</option>
          <option value="Sports">Sports</option>
          <option value="Education">Education</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>


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
                  <p className="text-gray-700">Type: {event.type}</p>
                  <p className="text-gray-700">Date: {new Date(event.startDate).toLocaleDateString()}</p>
                  <p className="text-gray-700">Seats Available: {event.available_seat}</p>
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
