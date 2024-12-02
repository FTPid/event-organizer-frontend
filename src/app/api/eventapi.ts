import Swal from "sweetalert2";

const API_URL = "http://127.0.0.1:8000";

// Function to get the access token from cookies
const getAccessToken = (): string | undefined => {
    const cookies = document.cookie;
    const accessToken = cookies
        .split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1];

    return accessToken;
};

// Function to handle authorization header with Bearer token
const getAuthHeaders = () => {
    const accessToken = getAccessToken();

    if (!accessToken) {
        // Show Swal message if the token is not found
        Swal.fire({
            title: "Unauthorized",
            text: "Access token not found. Please log in to continue.",
            icon: "error",
            confirmButtonText: "OK",
        });
        throw new Error("Unauthorized: Access token not found in cookies.");
    }

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
    };
};

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





export const createOrUpdateEvent = async (eventData: any) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/events/create', {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(eventData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error creating event');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in createOrUpdateEvent:', error);
        throw error;
    }
};


export const getAllEvents = async () => {
    const response = await fetch(`${API_URL}/events/list`, {
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch events.");
    }
    return await response.json();
};


export const deleteEvent = async (eventId: number) => {
    const response = await fetch(`${API_URL}/events/${eventId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete event.");
    }

    return await response.json();
};
