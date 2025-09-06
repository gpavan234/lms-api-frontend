"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login"); // navigate to login page
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold cursor-pointer" onClick={() => router.push("/")}>
          LMS App
        </h1>
        <Button variant="default" onClick={handleLoginClick}>
          Login
        </Button>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4 bg-gray-100">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center p-4">
        &copy; {new Date().getFullYear()} LMS App
      </footer>
    </div>
  );
}
