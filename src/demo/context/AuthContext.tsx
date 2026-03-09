import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; role: { slug: string } } | null;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; role: { slug: string } } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('demoToken');
    if (token) {
      setIsAuthenticated(true);
      setUser({ name: 'Demo User', role: { slug: 'ROOT' } });
    }
  }, []);

  const login = (username: string) => {
    localStorage.setItem('demoToken', 'fake-jwt-token-for-demo');
    sessionStorage.setItem('demoMode', 'true');
    setIsAuthenticated(true);
    setUser({ name: username, role: { slug: 'ROOT' } });
  };

  const logout = () => {
    localStorage.removeItem('demoToken');
    sessionStorage.removeItem('demoMode');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
