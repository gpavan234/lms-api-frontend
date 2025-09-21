"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  const courses = [
    {
      id: "1",
      title: "JavaScript Basics",
      description: "Learn the fundamentals of JavaScript",
      progress: 40,
    },
    {
      id: "2",
      title: "React for Beginners",
      description: "Understand React components, hooks, and state",
      progress: 70,
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📊 Dashboard</h1>
        <Button asChild>
          <Link href="/courses">Browse Courses</Link>
        </Button>
      </div>

      {/* My Courses */}
      <div>
        <h2 className="text-xl font-semibold mb-4">My Courses</h2>
        {courses.length === 0 ? (
          <p className="text-gray-500">You are not enrolled in any courses yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id} className="shadow-sm hover:shadow-md transition">
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">{course.description}</p>
                  <Progress value={course.progress} className="mb-2" />
                  <p className="text-sm text-gray-500">{course.progress}% completed</p>
                  <Button asChild className="mt-4 w-full">
                    <Link href={`/courses/${course.id}`}>Continue</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link href="/profile">Go to Profile</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/quizzes">Take a Quiz</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
