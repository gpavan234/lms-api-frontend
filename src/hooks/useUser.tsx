// src/hooks/useUser.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api";

export type User = {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
};

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/auth/profile");
      setUser(res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // If token exists, try to fetch profile
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) fetchProfile();
    else setLoading(false);
  }, [fetchProfile]);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    const data = res.data;
    if (data?.token) {
      localStorage.setItem("token", data.token);
      // also set cookie for Next middleware
      document.cookie = `token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}; sameSite=strict`;
      await fetchProfile();
    }
    return data;
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await api.post("/auth/register", { name, email, password });
    const data = res.data;
    if (data?.token) {
      localStorage.setItem("token", data.token);
      document.cookie = `token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}; sameSite=strict`;
      await fetchProfile();
    }
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    // remove cookie
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setUser(null);
  };

  return { user, loading, fetchProfile, login, register, logout };
}
