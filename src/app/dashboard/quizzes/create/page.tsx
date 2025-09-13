"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

export default function CreateQuizPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => setQuestions([...questions, ""]);
  const removeQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = Cookies.get("token");
      const res = await fetch("http://localhost:5000/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          questions: questions.map((q) => ({
            question: q,
            options: ["Option 1", "Option 2", "Option 3", "Option 4"], // default
            correctAnswer: 0, // default
          })),
        }),
      });

      if (!res.ok) throw new Error("Failed to create quiz");

      router.push("/dashboard/quizzes");
    } catch (err) {
      console.error(err);
      alert("Error creating quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Create New Quiz</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div>
          <label className="block text-sm font-medium">Questions</label>
          {questions.map((q, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={q}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                className="flex-1 border rounded px-3 py-2"
                required
              />
              <Button type="button" variant="destructive" onClick={() => removeQuestion(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addQuestion}>
            Add Question
          </Button>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating..." : "Create Quiz"}
        </Button>
      </form>
    </Card>
  );
}
