// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useUser } from "@/hooks/useUser";

export default function Navbar() {
  const { user, loading, logout } = useUser();

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold">
          LMS
        </Link>

        <nav className="flex items-center gap-4">
          {!loading && !user && (
            <>
              <Link href="/login" className="px-3 py-1 rounded hover:bg-gray-100">Login</Link>
              <Link href="/register" className="px-3 py-1 bg-blue-600 text-white rounded">Register</Link>
            </>
          )}

          {!loading && user && (
            <div className="flex items-center gap-3">
              <span className="text-sm">{user.name}</span>
              <button
                onClick={() => logout()}
                className="px-3 py-1 rounded border hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
