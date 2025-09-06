"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            🎓 Learning Management System
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-gray-600 text-center">
            Welcome to your LMS! Get started by signing in or exploring courses.
          </p>
          <div className="flex gap-2 justify-center">
            <Button asChild>
             <Link href="/login">Login</Link>
            </Button>
            <Button asChild variant="outline">
             <Link href="/register">Register</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
