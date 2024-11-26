"use client";

import React, { useEffect, useState } from "react";
import { fetchUserTransaction, fetchTicketDetails } from "../api/tickets";
import { FaTicketAlt, FaEye, FaCheck, FaTimes } from "react-icons/fa";

interface Transaction {
    id: number;
    userName: string;
    eventName: string;
    totalAmount: number;
    discount: number;
    referralCode: string | null;
    promotionId: string | null;
    paymentStatus: string;
    createdAt: string;
}

interface TicketDetail {
    id: number;
    eventId: number;
    transactionId: number;
    createdAt: string;
}

interface EventDetail {
    id: number;
    image: string;
    name: string;
    description: string;
    type: string;
    price: number;
    startDate: string;
    available_seat: number;
    organizer: string;
    location: string;
    category: string;
}

const ListTransaction = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [ticketDetails, setTicketDetails] = useState<{
        ticket: TicketDetail[];
        event: EventDetail | null;
    } | null>(null);

    // Fetch transactions on component load
    useEffect(() => {
        const getTransactions = async () => {
            try {
                const data = await fetchUserTransaction();
                setTransactions(data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getTransactions();
    }, []);

    // Open modal for transaction details
    const openModal = (transaction: Transaction) => {
        console.log("Opening transaction modal:", transaction); // Debugging
        setSelectedTransaction(transaction);
    };

    // Close modal
    const closeModal = () => {
        setSelectedTransaction(null);
    };

    // Open modal for ticket details
    const openTicketModal = async (transactionId: number) => {
        try {
            console.log("Fetching ticket details for transaction:", transactionId); // Debugging
            const data = await fetchTicketDetails(transactionId);
            setTicketDetails(data);
        } catch (error) {
            console.error("Failed to fetch ticket details:", error);
        }
    };

    // Close ticket modal
    const closeTicketModal = () => {
        setTicketDetails(null);
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen text-lg font-medium text-gray-700">Loading transactions...</div>;
    }

    if (transactions.length === 0) {
        return <div className="flex items-center justify-center h-screen text-gray-500 font-medium">No transactions found.</div>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen my-20 text-black">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Your Transactions</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {transactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between"
                    >
                        <h2 className="text-xl font-semibold text-gray-800">{transaction.eventName}</h2>

                        <p className="text-sm text-gray-600 mt-2">
                            <span className="font-medium">User Name:</span> {transaction.userName}
                        </p>

                        <p className="text-sm text-gray-600 mt-2">
                            <span className="font-medium">Total Amount:</span> {transaction.totalAmount.toLocaleString()} IDR
                        </p>

                        <div className="mt-2">
                            <span
                                className={`inline-block px-3 py-1 rounded-full font-semibold ${transaction.paymentStatus === "PENDING"
                                    ? "bg-yellow-200 text-yellow-800"
                                    : "bg-green-200 text-green-800"
                                    }`}
                            >
                                {transaction.paymentStatus === "PENDING" ? "Pending" : "Complete"}
                            </span>
                        </div>

                        <div className="mt-4 flex space-x-4">
                            <button
                                onClick={() => openModal(transaction)}
                                className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
                            >
                                <FaEye className="mr-2" /> View Details
                            </button>
                            <button
                                onClick={() => openTicketModal(transaction.id)}
                                className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
                            >
                                <FaTicketAlt className="mr-2" /> Ticket
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Transaction Details */}
            {selectedTransaction && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                            onClick={closeModal}
                        >
                            <FaTimes />
                        </button>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Transaction Details</h2>

                        <p><span className="font-semibold">Event Name:</span> {selectedTransaction.eventName}</p>
                        <p><span className="font-semibold">User Name:</span> {selectedTransaction.userName}</p>
                        <p><span className="font-semibold">Total Amount:</span> {selectedTransaction.totalAmount.toLocaleString()} IDR</p>
                        <p><span className="font-semibold">Discount:</span> {selectedTransaction.discount.toLocaleString()} IDR</p>
                        <p><span className="font-semibold">Payment Status:</span> {selectedTransaction.paymentStatus}</p>
                        <p><span className="font-semibold">Created At:</span> {new Date(selectedTransaction.createdAt).toLocaleString()}</p>

                        <button
                            onClick={closeModal}
                            className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

           
            {/* Modal for Ticket and Event Details */}
            {/* Modal for Ticket and Event Details */}
{ticketDetails && (
    <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={closeTicketModal}
    >
        <div
            className="bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 rounded-lg shadow-lg w-full max-w-lg relative mx-4 max-h-screen overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
        >
            <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                onClick={closeTicketModal}
            >
                <FaTimes />
            </button>

            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">🎫 Your Event Ticket</h2>

                {ticketDetails.event && (
                    <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-4">
                        {/* Event Image */}
                        <div className="relative w-full h-40 rounded-lg overflow-hidden">
                            <img
                                src={ticketDetails.event.image}
                                alt={ticketDetails.event.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-2 px-4">
                                <h3 className="text-lg font-bold">{ticketDetails.event.name}</h3>
                                <p className="text-sm">{ticketDetails.event.location}</p>
                            </div>
                        </div>

                        {/* Event Details */}
                        <div className="mt-4">
                            <p>
                                <span className="font-semibold">Organizer:</span> {ticketDetails.event.organizer}
                            </p>
                            <p>
                                <span className="font-semibold">Start Date:</span>{" "}
                                {new Date(ticketDetails.event.startDate).toLocaleString()}
                            </p>
                            <p>
                                <span className="font-semibold">Category:</span> {ticketDetails.event.category}
                            </p>
                            <p>
                                <span className="font-semibold">Price:</span>{" "}
                                {ticketDetails.event.price.toLocaleString()} IDR
                            </p>
                        </div>
                    </div>
                )}

                {/* Ticket Details */}
                {ticketDetails.ticket.map((ticket) => (
                    <div
                        key={ticket.id}
                        className="bg-gray-100 mt-6 rounded-lg shadow-lg border border-gray-200 p-4 flex flex-col sm:flex-row items-center justify-between"
                    >
                        <div className="flex-1">
                            <p className="font-bold text-lg text-gray-800">Ticket No</p>
                            <p className="text-gray-600">{ticket.id}</p>
                        </div>
                        <div className="flex-1 text-center">
                            <p className="font-bold text-lg text-gray-800">Transaction</p>
                            <p className="text-gray-600">{ticket.transactionId}</p>
                        </div>
                        <div className="flex-1 text-right">
                            <p className="font-bold text-lg text-gray-800">Issued </p>
                            <p className="text-gray-600">
                                {new Date(ticket.createdAt).toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}

                {/* QR Code for Verification */}
                <div className="mt-6 flex items-center justify-center">
                    <div className="bg-white border border-gray-300 rounded-lg p-4 flex flex-col items-center">
                        <p className="text-gray-700 text-sm mb-2">Scan this QR Code</p>
                        <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticketDetails.ticket[0]?.id}`}
                            alt="QR Code"
                            className="w-32 h-32"
                        />
                    </div>
                </div>

                <div className="my-6 border-t border-gray-300"></div>
                <button
                    onClick={closeTicketModal}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
)}

        </div>
    );
};

export default ListTransaction;
