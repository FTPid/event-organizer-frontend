"use client";

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Testimonials = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <section className="py-16 bg-gray-50" id="testimonials">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12" data-aos="fade-up">
                What Our Users Say
            </h2>
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-12">


                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105" data-aos="fade-up">
                    <div className="flex items-center mb-4">
                        <img
                            src="https://randomuser.me/api/portraits/men/1.jpg"
                            alt="User 1"
                            className="w-16 h-16 rounded-full border-2 border-gray-200 mr-4"
                        />
                        <div>
                            <p className="font-semibold text-gray-700">John Doe</p>
                            <p className="text-sm text-gray-500">Event Attendee</p>
                        </div>
                    </div>
                    <p className="text-lg text-gray-600 italic mb-4">
                        "Lumiere Organizer made it so easy to discover amazing events! I found the perfect concerts and festivals to attend. Highly recommend!"
                    </p>
                    <div className="flex justify-start space-x-1">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M10 15l3.09 1.634-.587-3.683L15 9.27l-3.736-.54L10 5l-1.264 3.73L5 9.27l2.5 3.681L6.91 16.634 10 15z" />
                        </svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M10 15l3.09 1.634-.587-3.683L15 9.27l-3.736-.54L10 5l-1.264 3.73L5 9.27l2.5 3.681L6.91 16.634 10 15z" />
                        </svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M10 15l3.09 1.634-.587-3.683L15 9.27l-3.736-.54L10 5l-1.264 3.73L5 9.27l2.5 3.681L6.91 16.634 10 15z" />
                        </svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M10 15l3.09 1.634-.587-3.683L15 9.27l-3.736-.54L10 5l-1.264 3.73L5 9.27l2.5 3.681L6.91 16.634 10 15z" />
                        </svg>
                        <svg className="w-5 h-5 text-gray-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M10 15l3.09 1.634-.587-3.683L15 9.27l-3.736-.54L10 5l-1.264 3.73L5 9.27l2.5 3.681L6.91 16.634 10 15z" />
                        </svg>
                    </div>
                </div>


                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105" data-aos="fade-up">
                    <div className="flex items-center mb-4">
                        <img
                            src="https://randomuser.me/api/portraits/women/2.jpg"
                            alt="User 2"
                            className="w-16 h-16 rounded-full border-2 border-gray-200 mr-4"
                        />
                        <div>
                            <p className="font-semibold text-gray-700">Sarah Smith</p>
                            <p className="text-sm text-gray-500">Event Organizer</p>
                        </div>
                    </div>
                    <p className="text-lg text-gray-600 italic mb-4">
                        "As an event organizer, Lumiere Organizer has been a lifesaver! The platform is intuitive, and the tools make organizing events a breeze."
                    </p>
                    <div className="flex justify-start space-x-1">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M10 15l3.09 1.634-.587-3.683L15 9.27l-3.736-.54L10 5l-1.264 3.73L5 9.27l2.5 3.681L6.91 16.634 10 15z" />
                        </svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M10 15l3.09 1.634-.587-3.683L15 9.27l-3.736-.54L10 5l-1.264 3.73L5 9.27l2.5 3.681L6.91 16.634 10 15z" />
                        </svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M10 15l3.09 1.634-.587-3.683L15 9.27l-3.736-.54L10 5l-1.264 3.73L5 9.27l2.5 3.681L6.91 16.634 10 15z" />
                        </svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M10 15l3.09 1.634-.587-3.683L15 9.27l-3.736-.54L10 5l-1.264 3.73L5 9.27l2.5 3.681L6.91 16.634 10 15z" />
                        </svg>
                        <svg className="w-5 h-5 text-gray-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M10 15l3.09 1.634-.587-3.683L15 9.27l-3.736-.54L10 5l-1.264 3.73L5 9.27l2.5 3.681L6.91 16.634 10 15z" />
                        </svg>
                    </div>
                </div>


                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105" data-aos="fade-up">
                    <div className="flex items-center mb-4">
                        <img
                            src="https://randomuser.me/api/portraits/men/3.jpg"
                            alt="User 3"
                            className="w-16 h-16 rounded-full border-2 border-gray-200 mr-4"
                        />
                        <div>
                            <p className="font-semibold text-gray-700">Michael Lee</p>
                            <p className="text-sm text-gray-500">Event Attendee</p>
                        </div>
                    </div>
                    <p className="text-lg text-gray-600 italic mb-4">
                        "The events I’ve attended through Lumiere have been top-notch! Everything from the organization to the communication was seamless."
                    </p>
                    <div className="flex justify-start space-x-1">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M10 15l3.09 1.634-.587-3.683L15 9.27l-3.736-.54L10 5l-1.264 3.73L5 9.27l2.5 3.681L6.91 16.634 10 15z" />
                        </svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M10 15l3.09 1.634-.587-3.683L15 9.27l-3.736-.54L10 5l-1.264 3.73L5 9.27l2.5 3.681L6.91 16.634 10 15z" />
                        </svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M10 15l3.09 1.634-.587-3.683L15 9.27l-3.736-.54L10 5l-1.264 3.73L5 9.27l2.5 3.681L6.91 16.634 10 15z" />
                        </svg>
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M10 15l3.09 1.634-.587-3.683L15 9.27l-3.736-.54L10 5l-1.264 3.73L5 9.27l2.5 3.681L6.91 16.634 10 15z" />
                        </svg>
                        <svg className="w-5 h-5 text-gray-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M10 15l3.09 1.634-.587-3.683L15 9.27l-3.736-.54L10 5l-1.264 3.73L5 9.27l2.5 3.681L6.91 16.634 10 15z" />
                        </svg>
                    </div>
                </div>



            </div>
        </section>
    );
};

export default Testimonials;
