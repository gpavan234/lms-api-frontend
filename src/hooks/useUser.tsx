// src/hooks/useUser.ts
"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  name: string;
  role: string;
}

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = () => {
    const token = Cookies.get("token");

    if (token) {
      try {
        const decoded = jwtDecode<{ id: string; name: string; role: string }>(token);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token", err);
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();

    // Listen for login/logout events
    const handleTokenChange = () => loadUser();
    window.addEventListener("auth-change", handleTokenChange);

    return () => {
      window.removeEventListener("auth-change", handleTokenChange);
    };
  }, []);

  return { user, loading };
}
