"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Edit, Trash2, PlusCircle } from "lucide-react";

// Mock Data (replace with API later)
const mockCourses = [
  {
    id: "1",
    title: "React for Beginners",
    instructor: "John Doe",
    students: 120,
  },
  {
    id: "2",
    title: "Advanced JavaScript",
    instructor: "Jane Smith",
    students: 85,
  },
  {
    id: "3",
    title: "Data Science Basics",
    instructor: "Alice Johnson",
    students: 200,
  },
];

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState(mockCourses);

  // 🔹 Later replace with API call
  useEffect(() => {
    // fetch("/api/admin/courses", { headers: { Authorization: `Bearer ${token}` } })
    //   .then(res => res.json())
    //   .then(data => setCourses(data));
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((course) => course.id !== id));
    }
  };

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📘 Manage Courses</h1>
        <Button className="flex items-center gap-2">
          <PlusCircle className="w-4 h-4" />
          Add New Course
        </Button>
      </div>

      {courses.length === 0 ? (
        <p className="text-gray-600">No courses found.</p>
      ) : (
        <Card className="p-4 shadow-lg overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border-b">Course Title</th>
                <th className="p-3 border-b">Instructor</th>
                <th className="p-3 border-b">Students</th>
                <th className="p-3 border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{course.title}</td>
                  <td className="p-3 border-b">{course.instructor}</td>
                  <td className="p-3 border-b">{course.students}</td>
                  <td className="p-3 border-b text-right space-x-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Edit className="w-4 h-4" /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => handleDelete(course.id)}
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </main>
  );
}
