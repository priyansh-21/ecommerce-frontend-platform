import { createContext, useContext, useState, useCallback } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    const raw = localStorage.getItem('stockroom_session');
    return raw ? JSON.parse(raw) : null;
  });

  const persist = (data) => {
    if (data) {
      localStorage.setItem('stockroom_session', JSON.stringify(data));
    } else {
      localStorage.removeItem('stockroom_session');
    }
    setSession(data);
  };

  const login = useCallback(async (username, password) => {
    const data = await api.login({ username, password });
    persist(data);
    return data;
  }, []);

  const register = useCallback(async (username, email, password) => {
    const data = await api.register({ username, email, password });
    persist(data);
    return data;
  }, []);

  const logout = useCallback(() => persist(null), []);

  return (
    <AuthContext.Provider value={{ session, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
