"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const mockCourses = [
  {
    id: "1",
    title: "React Basics",
    description: "Learn the fundamentals of React, components, and JSX.",
    duration: "2h 30m",
  },
  {
    id: "2",
    title: "Node.js for Beginners",
    description: "Understand Node.js runtime and build REST APIs.",
    duration: "3h 10m",
  },
  {
    id: "3",
    title: "MongoDB Essentials",
    description: "Get started with MongoDB and Mongoose.",
    duration: "1h 45m",
  },
];

export default function HomePage() {
  return (
    <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {mockCourses.map((course) => (
        <Card key={course.id} className="p-4 shadow-lg rounded-xl">
          <h2 className="text-xl font-bold mb-2">{course.title}</h2>
          <p className="text-gray-600 mb-3">{course.description}</p>
          <p className="text-sm text-gray-500 mb-4">⏱ {course.duration}</p>
          <Link href={`/courses/${course.id}`}>
            <Button className="w-full">Start Learning</Button>
          </Link>
        </Card>
      ))}
    </main>
  );
}
