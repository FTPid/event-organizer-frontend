"use client";

import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Testimonials = () => {
    const [ratings, setRatings] = useState<any[]>([]);

    useEffect(() => {
        // Initialize AOS for animations
        AOS.init({ duration: 1000, once: true });

        // Fetch the ratings data from the API
        const fetchRatings = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/ratings/list');
                const data = await response.json();
                setRatings(data.data); // Set the fetched data
            } catch (error) {
                console.error('Error fetching ratings:', error);
            }
        };

        fetchRatings();
    }, []);

    return (
        <section className="py-16 bg-gray-50" id="testimonials">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12" data-aos="fade-up">
                What Our Users Say
            </h2>
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-12">
                {ratings.map((rating) => (
                    <div
                        key={rating.id}
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
                        data-aos="fade-up"
                    >
                        <div className="flex items-center mb-4">
                            <img
                                src={`https://randomuser.me/api/portraits/men/${rating.user.id}.jpg`}
                                alt={rating.user.name}
                                className="w-16 h-16 rounded-full border-2 border-gray-200 mr-4"
                            />
                            <div>
                                <p className="font-semibold text-gray-700">{rating.user.name}</p>
                                <p className="text-sm text-gray-500">Event Attendee</p>
                            </div>
                        </div>
                        <p className="text-lg text-gray-600 italic mb-4">
                            "{rating.comment}"
                        </p>
                        <div className="flex justify-start space-x-1">
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    className={`w-5 h-5 ${index < rating.rating ? 'text-yellow-400' : 'text-gray-300'
                                        }`}
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 15l3.09 1.634-.587-3.683L15 9.27l-3.736-.54L10 5l-1.264 3.73L5 9.27l2.5 3.681L6.91 16.634 10 15z" />
                                </svg>
                            ))}
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-gray-500">
                                {rating.event.name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
