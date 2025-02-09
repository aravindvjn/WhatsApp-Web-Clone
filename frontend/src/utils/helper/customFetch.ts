import { backendUrl, token } from "./constants";

type ApiCallParams = {
    endpoint: string, method?: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: any
}

export const apiCall = async ({ body, endpoint, method = 'GET' }: ApiCallParams) => {
    try {
        const response: any = await fetch(`${backendUrl}${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: method === 'POST' || method === 'PUT' ? JSON.stringify(body) : null,
        });
        if (!response.ok) {
            throw new Error(response.message);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Error in apiCall: ${error}`);
    }
}