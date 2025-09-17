// src/app/dashboard/layout.tsx
"use client";

import { ReactNode } from "react";
import Link from "next/link";
import useUser from "@/hooks/useUser";

import Loader from "@/components/Loader";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useUser();

  if (loading) return <Loader />;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">{user?.role?.toUpperCase() || "USER"} Dashboard</h2>

        <nav className="flex flex-col gap-2">
          <Link href="/dashboard" className="hover:bg-gray-700 px-3 py-2 rounded">Overview</Link>

          {user?.role === "admin" ? (
            <>
             <Link href="/dashboard/add-instructor" className="hover:bg-gray-700 px-3 py-2 rounded">Add Instructor</Link>
              <Link href="/dashboard/users" className="hover:bg-gray-700 px-3 py-2 rounded">Manage Users</Link>
              <Link href="/dashboard/courses" className="hover:bg-gray-700 px-3 py-2 rounded">Manage Courses</Link>
            </>
          ) : (
            <>
              <Link href="/dashboard/my-courses" className="hover:bg-gray-700 px-3 py-2 rounded">My Courses</Link>
              <Link href="/dashboard/quizzes" className="hover:bg-gray-700 px-3 py-2 rounded">My Quizzes</Link>
            </>
          )}
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}
