export interface LoginResponse {
    [x: string]: any;
    exp: number;
    role(role: any): unknown;
    access_token: string;
    message: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch('http://127.0.0.1:8000/auth-management/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
    }

    return response.json();
};
