"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Cookies from "js-cookie";
export default function EditQuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // ✅ add description
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch quiz details
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = Cookies.get("token");
        const res = await fetch(`http://localhost:5000/api/quizzes/${quizId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description || ""); // ✅ set description
        setQuestions(data.questions || []);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    if (quizId) fetchQuiz();
  }, [quizId]);

  // ✅ Handle update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = Cookies.get("token");
      const res = await fetch(`http://localhost:5000/api/quizzes/${quizId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description, // ✅ send description
          questions,
        }),
      });

      if (!res.ok) throw new Error("Failed to update quiz");

      router.push("/dashboard/quizzes");
    } catch (err) {
      console.error(err);
      alert("Error updating quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Quiz</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium">Quiz Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
            rows={3}
            required
          />
        </div>

        {/* Questions */}
        <div>
          <label className="block text-sm font-medium">Questions</label>
          <input
            type="text"
            value={questions.join(",")}
            onChange={(e) => setQuestions(e.target.value.split(","))}
            className="w-full border rounded px-3 py-2 mt-1"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Updating..." : "Update Quiz"}
        </Button>
      </form>
    </Card>
  );
}
