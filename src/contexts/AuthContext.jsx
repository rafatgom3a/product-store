import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api, { getApiError } from '../services/api';

const AuthContext = createContext(null);

function readStoredUser() {
  try {
    const value = localStorage.getItem('storehub_user');
    return value ? JSON.parse(value) : null;
  } catch {
    localStorage.removeItem('storehub_user');
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [isLoading, setIsLoading] = useState(Boolean(localStorage.getItem('storehub_token')));

  const saveSession = useCallback(({ token, user: nextUser }) => {
    if (!token || !nextUser) throw new Error('The server returned an incomplete login response.');
    localStorage.setItem('storehub_token', token);
    localStorage.setItem('storehub_user', JSON.stringify(nextUser));
    setUser(nextUser);
    return nextUser;
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      const { data } = await api.post('/auth/login', credentials);
      return saveSession(data);
    } catch (error) {
      throw new Error(getApiError(error));
    }
  }, [saveSession]);

  const register = useCallback(async (details) => {
    try {
      const { data } = await api.post('/auth/register', details);
      return saveSession(data);
    } catch (error) {
      throw new Error(getApiError(error));
    }
  }, [saveSession]);

  const updateProfile = useCallback(async (profile) => {
    try {
      const { data } = await api.patch('/auth/me', profile);
      localStorage.setItem('storehub_user', JSON.stringify(data.user));
      setUser(data.user);
      return data.user;
    } catch (error) { throw new Error(getApiError(error)); }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('storehub_token');
    localStorage.removeItem('storehub_user');
    setUser(null);
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => setUser(null);
    window.addEventListener('storehub:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('storehub:unauthorized', handleUnauthorized);
  }, []);

  // Validate a persisted token on every fresh app load.
  useEffect(() => {
    let active = true;
    const token = localStorage.getItem('storehub_token');
    if (!token) {
      setIsLoading(false);
      return () => { active = false; };
    }
    api.get('/auth/me')
      .then(({ data }) => {
        if (!active) return;
        const currentUser = data.user;
        localStorage.setItem('storehub_user', JSON.stringify(currentUser));
        setUser(currentUser);
      })
      .catch(() => {
        if (!active) return;
        localStorage.removeItem('storehub_token');
        localStorage.removeItem('storehub_user');
        setUser(null);
      })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, []);

  const value = useMemo(() => ({
    user, isLoading, isAuthenticated: Boolean(user), isAdmin: user?.role === 'admin',
    login, register, updateProfile, logout,
  }), [user, isLoading, login, register, updateProfile, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
