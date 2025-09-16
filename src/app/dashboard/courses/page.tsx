"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Course {
  _id: string;
  title: string;
  description: string;
  instructor?: { name: string };
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function CoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // ✅ Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) return;

        const res = await fetch("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  // ✅ Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/courses");
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📚 Courses</h1>

        {/* ✅ Show only for instructors/admin */}
        {user && (user.role === "instructor" || user.role === "admin") && (
          <Button onClick={() => router.push("/dashboard/courses/add")}>
            ➕ Add New Course
          </Button>
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {courses.length > 0 ? (
            courses.map((course) => (
              <Card
                key={course._id}
                className="w-full sm:w-[300px] shadow-md hover:shadow-lg transition"
              >
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold">{course.title}</h2>
                  <p className="text-gray-600 text-sm mt-2">
                    {course.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    👨‍🏫 {course.instructor?.name || "Unknown Instructor"}
                  </p>
                  <Button className="mt-4 w-full">View Details</Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No courses available.</p>
          )}
        </div>
      )}
    </main>
  );
}
