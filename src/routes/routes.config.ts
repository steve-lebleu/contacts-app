export const ROUTES_CONFIG = {
  HOME: '/',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  ERROR: {
    FORBIDDEN: '/error/forbidden',
    SERVER_ERROR: '/error/server-error',
  },
  CONTACTS: {
    LIST: '/contacts',
    CREATE: '/contacts/add',
    EDIT: (id: string) => `/contacts/edit/${id}`
  },
  USERS: {
    LIST: '/users',
  }
} as const;