const getCookie = (name: string): string | undefined => {
    if (typeof document !== 'undefined') {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            const cookieValue = parts.pop();
            if (cookieValue) {
                return cookieValue.split(';').shift();
            }
        }
    }
    return undefined;
};


export interface Event {
    image: string | undefined;
    id: number;
    name: string;
    description: string;
    startDate: string;
    location: string;
    organizer: string;
    available_seat: number;
    type: string;
    price?: number;
}

export const fetchEvents = async (page: number = 1, search?: string, category?: string): Promise<{ data: Event[]; pagination: { currentPage: number; totalPages: number } }> => {
    const queryParams: any = { page };
    if (search) queryParams.search = search;
    if (category) queryParams.category = category;

    const queryString = new URLSearchParams(queryParams).toString();

    const response = await fetch(`http://127.0.0.1:8000/events/list?${queryString}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
};



export interface EventDetail {
    image: string | undefined;
    id: number;
    name: string;
    description: string;
    startDate: string;
    location: string;
    organizer: string;
    available_seat: number;
    type: string;
    price?: number;
}


export const fetchEventById = async (id: number): Promise<EventDetail> => {
    const response = await fetch(`http://127.0.0.1:8000/events/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.event;
};

