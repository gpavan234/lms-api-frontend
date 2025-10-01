"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

interface User {
  id: string;
  name: string;
  role: string;
}

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      try {
        const decoded = jwtDecode<{ id: string; name: string; role: string }>(token);
        setUser({
          id: decoded.id,
          name: decoded.name,
          role: decoded.role,
        });
      } catch (err) {
        console.error("Invalid token", err);
        setUser(null);
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
  };
  return { user, loading, logout };
}
