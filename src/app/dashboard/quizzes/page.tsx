"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

interface Quiz {
  _id: string;
  title: string;
  description: string;
}

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchQuizzes();
  }, []);

  if (loading) return <p>Loading quizzes...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quizzes</h1>
        <Link href="/dashboard/quizzes/create">
          <Button>Create New Quiz</Button>
        </Link>
      </div>

      {quizzes.length === 0 ? (
        <p>No quizzes found.</p>
      ) : (
        <div className="grid gap-4">
          {quizzes.map((quiz) => (
            <Card key={quiz._id} className="p-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{quiz.title}</h2>
                <p className="text-gray-600">{quiz.description}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/dashboard/quizzes/${quiz._id}`}>
                  <Button variant="outline">View</Button>
                </Link>
                <Link href={`/dashboard/quizzes/${quiz._id}/edit`}>
                  <Button variant="outline">Edit</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
