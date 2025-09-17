// src/utils/api.ts
import Cookies from "js-cookie";

export const fetchAPI = async (url: string, options: any = {}) => {
  const token = Cookies.get("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "API error");
  }
  return res.json();
};
