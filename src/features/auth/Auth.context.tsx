import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../user/User.model';
import StorageService from '../../services/storage.service';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  loading: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(JSON.parse(StorageService.get('user') || '{}'));
  const [token, setToken] = useState<string | null>(StorageService.get('token'));
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const storedUser = StorageService.get('user');
    const storedToken = StorageService.get('token');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedToken) {
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  const login = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    StorageService.set('user', JSON.stringify(user));
    StorageService.set('token', token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    StorageService.remove('user');
    StorageService.remove('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
