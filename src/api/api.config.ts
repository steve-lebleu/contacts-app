export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_SERVER_URL || 'http://localhost:3000',
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  API_VERSION: import.meta.env.VITE_API_VERSION || 'v1',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
    },
    CONTACTS: {
      LIST: '/contacts',
      DETAIL: (id: string) => `/contacts/${id}`,
      CREATE: '/contacts',
      UPDATE: (id: string) => `/contacts/${id}`,
      DELETE: (id: string) => `/contacts/${id}`
    },
    USERS: {
      LIST: '/users',
    }
  },
  METHODS: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
  }
} as const;