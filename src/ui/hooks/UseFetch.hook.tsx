import { useEffect, useState } from 'react';
import { useAuth } from '../../features/auth/Auth.context';
import { API_CONFIG } from '../../api/api.config';

const { API_URL } = API_CONFIG;

type FetchResponse<T> = {
  data: T[];
  metadata: {
    total: number;
    totalPages: number;
    currentPage: number;
    nextPage: number | null;
  };
};

type Props = {
  url: string;
  queryParams?: Record<string, string>;
  limit: number;
  page: number;
};

export function useFetch<T>(props: Props) {
  const { url, page, limit, queryParams } = props;

  const { token } = useAuth();
  
  const [data, setData] = useState<T[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetch(`${API_URL}${url}?page=${page}&limit=${limit}&${new URLSearchParams(queryParams).toString()}`, {
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
    .then((res: FetchResponse<T>) => {
      setData(res.data);
      setTotalPages(res.metadata.totalPages);
      setCurrentPage(res.metadata.currentPage);
    })
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
  }, [url, page, limit, queryParams, token]);

  return { data, metadata: { totalPages, currentPage, limit }, loading, error };
};
