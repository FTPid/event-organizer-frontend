"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createOrUpdateEvent, deleteEvent, getAllEvents } from "../api/eventapi";
import Navbar from "../components/Navbar";

export interface Event {
    id: number;
    name: string;
    startDate: string;
    type: "PAID" | "FREE";
    price: number;
    description: string;
    locationId: number;
    organizerId: number;
    available_seat: number;
    image: string;
}

const Page = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        type: "FREE",
        price: 0,
        startDate: "",
        available_seat: 0,
        locationId: 1,
        categoryId: 1,
        organizerId: 1,
        image: "",
    });

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await getAllEvents();
                if (response && Array.isArray(response.data)) {
                    setEvents(response.data);
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "Unexpected response format. Expected an array of events.",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Failed to fetch events.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type === "image/png" || file.type === "image/jpeg") {
                const reader = new FileReader();
                reader.onload = () => {
                    setFormData({ ...formData, image: reader.result as string });
                };
                reader.readAsDataURL(file);
            } else {
                Swal.fire({
                    title: "Invalid File",
                    text: "Please upload a PNG or JPG image.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        }
    };

    const handleCreate = async () => {
        try {
            // Ensure startDate is in valid format and append time part "T00:00:00.000Z"
            const date = new Date(formData.startDate); // Assuming formData.startDate is in YYYY-MM-DD format

            // Check if the date is valid
            if (isNaN(date.getTime())) {
                throw new Error("Invalid date format. Please use a valid date.");
            }

            // Convert to ISO string with time at midnight (00:00:00.000Z)
            const isoStartDate = new Date(date.setHours(0, 0, 0, 0)).toISOString();

            console.log("Formatted startDate: ", isoStartDate);  // Log the formatted date

            // Prepare the data to be sent
            const eventData = {
                name: formData.name,
                description: formData.description,
                type: formData.type,
                price: formData.price,
                startDate: isoStartDate, // Use the correctly formatted startDate
                available_seat: formData.available_seat,
                locationId: formData.locationId,
                organizerId: formData.organizerId,
                categoryId: formData.categoryId,
                image: formData.image,  // This could be a file or URL
            };

            // Sending the data to the server
            const response = await createOrUpdateEvent(eventData);

            if (response) {
                Swal.fire({
                    title: "Success",
                    text: "Event created successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                });

                setShowModal(false);
                // Refresh event list after success
                const responseEvents = await getAllEvents();
                setEvents(responseEvents.data);
            }
        } catch (error: any) {
            console.error("Error creating event:", error); // Log the error message
            Swal.fire({
                title: "Error",
                text: error.message || "Failed to create event.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };



    const handleDelete = async (eventId: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action will delete the event permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteEvent(eventId);
                    setEvents((prevEvents) =>
                        prevEvents.filter((event) => event.id !== eventId)
                    );
                    Swal.fire({
                        title: "Deleted!",
                        text: "The event has been deleted.",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Error",
                        text: "Failed to delete event.",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
            }
        });
    };

    return (
        <div className="container mx-auto p-6 mt-20">
            <Navbar />
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-700">Event List</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                >
                    Create Event
                </button>
            </div>
            {loading ? (
                <p className="text-center text-xl text-gray-500">Loading events...</p>
            ) : events.length === 0 ? (
                <p className="text-center text-xl text-gray-500">No events available.</p>
            ) : (
                <div className="space-y-4">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row items-center p-4 space-y-4 md:space-y-0 md:space-x-4"
                        >
                            {/* <img
                                src={event.image}
                                alt={event.name}
                                className="w-full md:w-40 h-40 object-cover rounded-lg"
                            /> */}
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-800 truncate">
                                    {event.name}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                                <div className="mt-2 text-gray-600 space-y-1">
                                    <p>
                                        Price: <span className="font-bold">IDR {event.price}</span>
                                    </p>
                                    <p>Seats Available: {event.available_seat}</p>
                                    <p>Type: {event.type}</p>
                                    <p>
                                        Date: {new Date(event.startDate).toLocaleDateString()}{" "}
                                        {new Date(event.startDate).toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                                    onClick={() => handleDelete(event.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-lg">
                        <h2 className="text-xl font-bold mb-4">Create Event</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Event Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="FREE">FREE</option>
                                <option value="PAID">PAID</option>
                            </select>
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="number"
                                name="available_seat"
                                placeholder="Available Seats"
                                value={formData.available_seat}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            />
                            <select
                                name="locationId"
                                value={formData.locationId}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value={1}>Bogor</option>
                            </select>
                            <select
                                name="organizerId"
                                value={formData.organizerId}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value={1}>Organizer Black Box</option>
                            </select>
                            <select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value={1}>Music</option>
                            </select>
                            {/* <input
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={handleFileChange}
                                className="w-full p-2 border rounded"
                            /> */}
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreate}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Page;
