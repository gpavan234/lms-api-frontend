// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import useUser from "@/hooks/useUser";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const { user, loading } = useUser();

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  if (loading) return null;

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 shadow">
      <h1 className="text-xl font-bold">LMS</h1>
      <div className="space-x-4">
        {user ? (
          <>
            <span className="font-medium">{user.name}</span>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/profile">Profile</Link>
            <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
