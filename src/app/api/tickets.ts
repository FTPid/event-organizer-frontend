import Swal from "sweetalert2";

export const createTicketPurchase = async (
    userId: number,
    eventId: number,
    promoCode: string,
    seatCount: number,
    accessToken: string
) => {
    const requestData = {
        userId,
        eventId,
        promoCode,
        seatCount
    };

    try {
        const response = await fetch("http://127.0.0.1:8000/tickets/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "An unknown error occurred.");
        }

        return await response.json(); // Transaction data

    } catch (error) {
        throw error;
    }
};

export async function fetchUserTicketsFromClient(): Promise<any> {
    const cookies = document.cookie;
    const accessToken = cookies
        .split('; ')
        .find((row) => row.startsWith('access_token='))
        ?.split('=')[1];

    if (!accessToken) {
        throw new Error('Unauthorized: Access token not found in cookies.');
    }

    const response = await fetch('http://127.0.0.1:8000/tickets/list', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
}



export async function fetchUserTransaction(): Promise<any> {
    const cookies = document.cookie;
    const accessToken = cookies
        .split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1];

    if (!accessToken) {
        Swal.fire({
            title: "Unauthorized",
            text: "Access token not found. Please log in to continue.",
            icon: "error",
            confirmButtonText: "OK",
        });
        throw new Error("Unauthorized: Access token not found in cookies.");
    }

    const response = await fetch("http://127.0.0.1:8000/tickets/transaction", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
    });

    if (!response.ok) {
        Swal.fire({
            title: "Error",
            text: `Error: ${response.status} - ${response.statusText}`,
            icon: "error",
            confirmButtonText: "OK",
        });
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
}



export const fetchTicketDetails  = async (id: number) => {
    const cookies = document.cookie;
    const accessToken = cookies
        .split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1];

    if (!accessToken) {
        Swal.fire({
            title: "Unauthorized",
            text: "Access token not found. Please log in to continue.",
            icon: "error",
            confirmButtonText: "OK",
        });
        throw new Error("Unauthorized: Access token not found in cookies.");
    }

    const response = await fetch(`http://127.0.0.1:8000/tickets/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch: ${errorMessage}`);
    }

    return await response.json();
};