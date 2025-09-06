"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const courses = [
  {
    id: 1,
    title: "React for Beginners",
    description: "Learn the basics of React.js including components, hooks, and state management.",
  },
  {
    id: 2,
    title: "Next.js Mastery",
    description: "Build production-ready apps with Next.js, routing, API routes, and deployment.",
  },
  {
    id: 3,
    title: "MongoDB with Mongoose",
    description: "Learn how to design schemas, models, and queries with MongoDB and Mongoose.",
  },
];

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">📚 Courses</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="shadow-lg">
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-3">{course.description}</p>
             <Button asChild className="w-full">
                <a href={`/courses/${course.id}`}>View Details</a>
            </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
