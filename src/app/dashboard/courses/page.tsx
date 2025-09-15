"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@mui/material"; // or replace with your own UI card
import { Typography } from "@mui/material";

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/courses");
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };
    fetchCourses();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Courses</h1>

      {/* ✅ CSS Grid instead of MUI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="rounded-lg shadow bg-white">
            <Card>
              <CardContent>
                <Typography variant="h6">{course.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {course.description}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </main>
  );
}
