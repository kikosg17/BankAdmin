// frontend/lib/auth.js
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from './api';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [workspaces, setWorkspaces] = useState([]);
  const [currentWorkspace, setCurrentWorkspace] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem('session');
    if (raw) {
      const s = JSON.parse(raw);
      setToken(s.token); setUser(s.user); setWorkspaces(s.workspaces || []);
      setCurrentWorkspace(s.currentWorkspace || (s.workspaces?.[0] || null));
    }
  }, []);

  useEffect(() => {
    const session = { token, user, workspaces, currentWorkspace };
    localStorage.setItem('session', JSON.stringify(session));
  }, [token, user, workspaces, currentWorkspace]);

  const value = useMemo(() => ({
    token, setToken, user, setUser, workspaces, setWorkspaces, currentWorkspace, setCurrentWorkspace,
    async login(email, password) {
      const res = await api().post('/auth/login', { email, password });
      setToken(res.token); setUser(res.user); setWorkspaces(res.workspaces);
      setCurrentWorkspace(res.workspaces?.[0] || null);
    },
    logout() {
      setToken(null); setUser(null); setWorkspaces([]); setCurrentWorkspace(null);
      localStorage.removeItem('session');
    }
  }), [token, user, workspaces, currentWorkspace]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
