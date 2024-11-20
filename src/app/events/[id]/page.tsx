"use client";

import { EventDetail, fetchEventById } from '@/app/api/events';
import Navbar from '@/app/components/Navbar';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const EventDetailPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState<EventDetail | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (id) {
            const fetchEvent = async () => {
                try {
                    const data: EventDetail = await fetchEventById(Number(id));
                    setEvent(data);
                } catch (err) {
                    setError((err as Error).message);
                } finally {
                    setLoading(false);
                }
            };

            fetchEvent();
        }
    }, [id]);

    if (loading) return <p className="text-center text-gray-500 mt-10">Loading...</p>;
    if (error) return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

    return (
        <>
            <Navbar />
            <div className="text-black">
                {event ? (
                    <>
                        {/* Hero Image */}
                        <div className="relative h-[60vh] w-full bg-gray-200">
                            <img
                                src={`http://127.0.0.1:8000/${event.image}`}
                                alt={event.name}
                                className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center">
                                <h1 className="text-4xl font-bold">{event.name}</h1>
                                <p className="mt-2 text-lg">{event.type}</p>
                                {event.price ? (
                                    <span className="mt-2 bg-primary px-4 py-2 rounded-md text-lg">
                                        Rp {event.price.toLocaleString()}
                                    </span>
                                ) : (
                                    <span className="mt-2 bg-green-500 px-4 py-2 rounded-md text-lg">
                                        Free
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Event Details */}
                        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg -mt-20 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">Event Details</h2>
                                    <ul className="mt-4 space-y-2">
                                        <li className="text-gray-600">
                                            <strong>Date:</strong> {new Date(event.startDate).toLocaleDateString()}
                                        </li>
                                        <li className="text-gray-600">
                                            <strong>Location:</strong> {event.location || "To be announced"}
                                        </li>
                                        <li className="text-gray-600">
                                            <strong>Seats Available:</strong> {event.available_seat}
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">Organizer</h2>
                                    <div className="mt-4 p-4 bg-gray-100 rounded-md shadow-sm">
                                        <p className="text-gray-800">
                                            {event.organizer || "Organizer details not available"}
                                        </p>
                                        <a
                                            href="#"
                                            className="block mt-2 text-primary font-medium underline hover:text-primary-dark"
                                        >
                                            Contact Organizer
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h2 className="text-xl font-bold text-gray-800">Description</h2>
                                <p className="mt-2 text-gray-600">{event.description}</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="text-center text-gray-500">Event not found</p>
                )}
            </div></>
    );
};

export default EventDetailPage;
