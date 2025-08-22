import { API_CONFIG } from '../api/api.config';

const { API_URL } = API_CONFIG;

export const fetchService = async (url: string, method: string = 'GET', body: unknown = null, token: string | null = null) => {
  let data = null;
  let error: string | null = null;

  const headers = body instanceof FormData
    ? { 
      'Authorization': `Bearer ${token}`
    }
    : { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

  try {
    const response = await fetch(`${API_URL}${url}`, {
      method,
      body: ['PUT', 'PATCH', 'POST'].includes(method) ? body instanceof FormData ? body : JSON.stringify(body) : undefined,
      headers: headers as HeadersInit,
      credentials: 'include'
    });

    data = await response.json().catch(() => null);
    
    if (!response.ok) {
      error = data?.message;
    }

    return { data, error };
  } catch (err: unknown) {
    console.error('Error fetching data:', err);
    throw err;
  }
};
