"use client";

import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const mockCourses = [
  {
    id: "1",
    title: "React Basics",
    description: "Learn the fundamentals of React, components, and JSX.",
    lessons: 8,
    duration: "2h 30m",
  },
  {
    id: "2",
    title: "Node.js for Beginners",
    description: "Understand Node.js runtime and build REST APIs.",
    lessons: 10,
    duration: "3h 10m",
  },
  {
    id: "3",
    title: "MongoDB Essentials",
    description: "Get started with MongoDB and Mongoose.",
    lessons: 6,
    duration: "1h 45m",
  },
];

export default function CourseDetailsPage() {
  const params = useParams();
  const courseId = params.id as string;

  const course = mockCourses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold">Course Not Found ❌</h1>
        <Link href="/">
          <Button className="mt-4">⬅ Back to Catalog</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="p-6">
      <Card className="p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <p className="text-gray-700 mb-4">{course.description}</p>
        <p className="text-gray-600">📚 Lessons: {course.lessons}</p>
        <p className="text-gray-600 mb-6">⏱ Duration: {course.duration}</p>

        <Link href={`/learn/${course.id}`}>
          <Button className="w-full">🚀 Start Course</Button>
        </Link>
      </Card>
    </main>
  );
}
