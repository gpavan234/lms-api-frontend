"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockCourses = [
  {
    id: "1",
    title: "React for Beginners",
    description: "Learn the basics of React.js including components, hooks, and state management.",
    content: "This course includes hands-on projects, quizzes, and a final assessment to test your knowledge.",
  },
  {
    id: "2",
    title: "Next.js Mastery",
    description: "Build production-ready apps with Next.js, routing, API routes, and deployment.",
    content: "In this course, you'll learn advanced routing, API integrations, and how to optimize performance.",
  },
  {
    id: "3",
    title: "MongoDB with Mongoose",
    description: "Learn how to design schemas, models, and queries with MongoDB and Mongoose.",
    content: "We cover CRUD operations, indexing, relationships, and real-world project structures.",
  },
];

export default function CourseDetailsPage() {
  const params = useParams();
  const courseId = params.id as string;

  const course = mockCourses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold text-red-600">Course Not Found ❌</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <Card className="shadow-lg max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">{course.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">{course.description}</p>
          <p className="text-gray-600">{course.content}</p>

          <div className="mt-6 flex gap-3">
            <Button asChild>
              <a href={`/courses/${course.id}/learn`}>Start Course</a>
            </Button> 
            <Button variant="outline">Back to Courses</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
