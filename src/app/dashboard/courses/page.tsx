"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Course {
  _id: string;
  title: string;
  description: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    fetch("http://localhost:5000/api/courses", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📚 Courses</h1>
        <Button onClick={() => router.push("/dashboard/courses/add")}>
          ➕ Add New Course
        </Button>
      </div>

      {courses.length === 0 ? (
        <p className="text-gray-600">No courses available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <Card
              key={course._id}
              className="p-4 cursor-pointer hover:shadow-lg transition"
              onClick={() =>
                router.push(`/dashboard/courses/${course._id}`)
              }
            >
              <h2 className="text-lg font-semibold">{course.title}</h2>
              <p className="text-gray-600">{course.description}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
