import "./globals.css";
import { ReactNode } from "react";
import Link from "next/link";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-4">
          <h2 className="text-xl font-bold mb-4">LMS</h2>
          <nav className="flex flex-col gap-2">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
            <Link href="/quizzes" className="hover:text-blue-600">Quizzes</Link>
            <Link href="/certificates" className="hover:text-blue-600">Certificates</Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  );
}
