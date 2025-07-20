import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';

interface User {
  name: string;
  email: string;
  role: string;
  id: string;
  bloodGroup?: string;
}

interface AuthContextType {
  user: User | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('jwtToken');
      const storedProfile = localStorage.getItem('userProfile');
      if (storedToken && storedProfile) {
        try {
          const parsedUser = JSON.parse(storedProfile);
          setUser(parsedUser);
          setToken(storedToken);
        } catch {
          setUser(null);
          setToken(null);
        }
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, token }}>
      {children}
    </AuthContext.Provider>
  );
};