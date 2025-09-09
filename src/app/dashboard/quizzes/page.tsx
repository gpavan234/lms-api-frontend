// src/app/dashboard/quizzes/page.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Quiz {
    _id: string;
    title: string;
    description: string;
    course?: string;
}

export default function QuizzesPage() {
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchQuizzes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/quizzes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setQuizzes(Array.isArray(data) ? data : data.quizzes || []);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      setQuizzes([]);
    } finally {
      setLoading(false);
    }
  };

  fetchQuizzes();
}, []);


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
                                <Button variant="destructive">Delete</Button>
                            </div>
                        </Card>
                    ))
                )}

            </div>
        </div>
    );
}
