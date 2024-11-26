"use client";

import React, { useEffect, useState } from "react";
import { fetchUserTransaction } from "../api/tickets";
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

const ListTransaction = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [paymentProof, setPaymentProof] = useState<File | null>(null);

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

    const openModal = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
    };

    const closeModal = () => {
        setSelectedTransaction(null);
        setPaymentProof(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPaymentProof(e.target.files[0]);
        }
    };

    const handleFileUpload = () => {
        if (!paymentProof) {
            alert("Please select a file before uploading.");
            return;
        }

        alert(`File ${paymentProof.name} uploaded successfully!`);
        closeModal();
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
                                className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
                            >
                                <FaTicketAlt className="mr-2" /> Ticket
                            </button>
                        </div>
                    </div>
                ))}
            </div>


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
                        <p className="mb-2">
                            <span className="font-semibold">User Name:</span> {selectedTransaction.userName}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Event Name:</span> {selectedTransaction.eventName}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Total Amount:</span>{" "}
                            {selectedTransaction.totalAmount.toLocaleString()} IDR
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Discount:</span>{" "}
                            {selectedTransaction.discount.toLocaleString()} IDR
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Payment Status:</span> {selectedTransaction.paymentStatus}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Created At:</span>{" "}
                            {new Date(selectedTransaction.createdAt).toLocaleString()}
                        </p>


                        {selectedTransaction.paymentStatus === "PENDING" && (
                            <div className="mt-4">
                                <label className="block text-gray-700 font-medium mb-2">Upload Payment Proof:</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="block w-full text-gray-700 border rounded-lg p-2 mb-4"
                                />
                                <button
                                    onClick={handleFileUpload}
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
                                >
                                    Upload Payment Proof
                                </button>
                            </div>
                        )}

                        <button
                            onClick={closeModal}
                            className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListTransaction;
