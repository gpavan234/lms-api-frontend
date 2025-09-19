"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

interface Course {
  _id: string;
  title: string;
  description: string;
}

export default function InstructorDashboard() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch courses assigned to this instructor
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = Cookies.get("token");
        const res = await fetch("http://localhost:5000/api/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Failed to fetch courses");
        }

        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Instructor Dashboard</h1>

      <Button
        className="mb-6"
        onClick={() => router.push("/dashboard/courses/add")}
      >
        + Add New Course
      </Button>

      {loading ? (
        <p>Loading courses...</p>
      ) : courses.length === 0 ? (
        <p>No courses found. Create your first course!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course._id} className="p-4 shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="mb-4">{course.description}</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => router.push(`/dashboard/courses/${course._id}/add-quiz`)}
                >
                  Add Quiz
                </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/dashboard/courses/${course._id}/edit`)}
                  >
                    Edit Course
                  </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
