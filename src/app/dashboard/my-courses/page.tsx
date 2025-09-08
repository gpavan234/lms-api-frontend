"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Mock data for now – later replace with API
const mockCourses = [
  {
    id: "1",
    title: "React for Beginners",
    description: "Learn the basics of React including components, hooks, and state management.",
    thumbnail: "https://source.unsplash.com/400x200/?react,javascript",
    progress: 60,
  },
  {
    id: "2",
    title: "Advanced JavaScript",
    description: "Deep dive into closures, async programming, and design patterns.",
    thumbnail: "https://source.unsplash.com/400x200/?javascript,code",
    progress: 30,
  },
  {
    id: "3",
    title: "Data Science Basics",
    description: "Get started with Python, NumPy, Pandas, and Machine Learning.",
    thumbnail: "https://source.unsplash.com/400x200/?datascience,python",
    progress: 90,
  },
];

export default function MyCoursesPage() {
  const [courses, setCourses] = useState(mockCourses);

  // 🔹 Later replace this with API call
  useEffect(() => {
    // fetch("/api/courses/my-courses", { headers: { Authorization: `Bearer ${token}` } })
    //   .then(res => res.json())
    //   .then(data => setCourses(data));
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">📚 My Courses</h1>

      {courses.length === 0 ? (
        <p className="text-gray-600">You have not enrolled in any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden shadow-lg">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{course.title}</h2>
                <p className="text-sm text-gray-600 mb-4">{course.description}</p>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mb-3">
                  Progress: {course.progress}%
                </p>

                <Link href={`/learn/${course.id}`}>
                  <Button className="w-full">Continue Learning</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
