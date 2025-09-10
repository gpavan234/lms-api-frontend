"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
interface Quiz {
  _id: string;
  title: string;
  description: string;
  course?: string;
}

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const token = Cookies.get("token");
      const res = await fetch("http://localhost:5000/api/quizzes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setQuizzes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quiz?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/quizzes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to delete quiz");
      }

      alert("✅ Quiz deleted successfully");
      setQuizzes(quizzes.filter((q) => q._id !== id));
    } catch (err: any) {
      console.error(err);
      alert(`❌ ${err.message}`);
    }
  };

  if (loading) return <p>Loading quizzes...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Quizzes</h1>
        <Link href="/dashboard/quizzes/create">
          <Button>Create New Quiz</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {quizzes.length === 0 ? (
          <p>No quizzes found.</p>
        ) : (
          quizzes.map((quiz) => (
            <Card key={quiz._id} className="p-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{quiz.title}</h2>
                <p className="text-gray-600">{quiz.description}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/dashboard/quizzes/${quiz._id}/edit`}>
                  <Button variant="outline">Edit</Button>
                </Link>
                <Button variant="destructive" onClick={() => handleDelete(quiz._id)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
