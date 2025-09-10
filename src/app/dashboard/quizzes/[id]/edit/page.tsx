"use client";

import { useState, useEffect, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Cookies from "js-cookie";
interface Course {
  _id: string;
  title: string;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  course?: string;
}

export default function EditQuizPage() {
  const router = useRouter();
  const params = useParams();
  const quizId = params.id as string;

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch quiz + courses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");

        const [quizRes, coursesRes] = await Promise.all([
          fetch(`http://localhost:5000/api/quizzes/${quizId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/api/courses", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const quizData = await quizRes.json();
        const coursesData = await coursesRes.json();

        setQuiz(quizData);
        setCourses(Array.isArray(coursesData) ? coursesData : coursesData.courses || []);
      } catch (err) {
        console.error("Failed to fetch quiz/courses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [quizId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!quiz) return;

    setSaving(true);
    try {
      const token = Cookies.get("token");
      const res = await fetch(`http://localhost:5000/api/quizzes/${quizId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: quiz.title,
          description: quiz.description,
          courseId: quiz.course,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update quiz");
      }

      alert("✅ Quiz updated successfully");
      router.push("/dashboard/quizzes");
    } catch (err: any) {
      console.error(err);
      alert(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading quiz...</p>;
  if (!quiz) return <p>Quiz not found</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Quiz</h1>
      <Card className="p-6 max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <Input
              type="text"
              value={quiz.title}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <Textarea
              value={quiz.description}
              onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Course</label>
            <select
              className="w-full border p-2 rounded"
              value={quiz.course || ""}
              onChange={(e) => setQuiz({ ...quiz, course: e.target.value })}
              required
            >
              <option value="">Select a course</option>
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Card>
    </main>
  );
}
