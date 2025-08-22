import { useEffect, useState } from 'react';
import { useAuth } from '../../features/auth/Auth.context';
import { API_CONFIG } from '../../api/api.config';

const { API_URL } = API_CONFIG;

export function useFetchSingle<T>({ url }: { url: string }) {
  const { token } = useAuth();
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetch(`${API_URL}${url}`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(async res => {
      if (!res.ok) throw new Error('Server error');
      return res.json();
    })
    .then((res: T) => {
      setData(res as T);
    })
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
  }, [url, token]);

  return { data, loading, error };
};