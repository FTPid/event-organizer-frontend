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
