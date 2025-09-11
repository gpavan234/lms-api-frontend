"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Cookies from "js-cookie";
interface Question {
  _id?: string;
  text: string;
  options: string[];
  answer: string;
}

export default function QuizDetailPage() {
  const params = useParams();
  const quizId = params.id as string;

  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Add question state
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");

  // 🔹 Fetch quiz details
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5000/api/quizzes/${quizId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch quiz");
        const data = await res.json();
        setQuiz(data);
      } catch (err) {
        console.error(err);
        alert("❌ Error loading quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  // 🔹 Add a new question
  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = Cookies.get("token");
      const res = await fetch(`http://localhost:5000/api/quizzes/${quizId}/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, options, answer }),
      });

      if (!res.ok) throw new Error("Failed to add question");

      const newQuestion = await res.json();
      setQuiz((prev: any) => ({
        ...prev,
        questions: [...(prev?.questions || []), newQuestion],
      }));

      // Reset form
      setText("");
      setOptions(["", "", "", ""]);
      setAnswer("");
    } catch (err) {
      console.error(err);
      alert("❌ Error adding question");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!quiz) return <p className="text-center">Quiz not found.</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-2">{quiz.title}</h1>
        <p className="text-gray-600 mb-4">{quiz.description}</p>

        <h2 className="text-lg font-semibold mb-2">Questions</h2>
        {quiz.questions?.length > 0 ? (
          <ul className="list-disc pl-5 mb-4">
            {quiz.questions.map((q: Question, idx: number) => (
              <li key={q._id || idx} className="mb-2">
                <p className="font-medium">{q.text}</p>
                <ul className="pl-4 list-decimal text-sm text-gray-700">
                  {q.options.map((opt, i) => (
                    <li key={i} className={opt === q.answer ? "font-bold text-green-600" : ""}>
                      {opt}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mb-4">No questions added yet.</p>
        )}

        <hr className="my-4" />

        <h2 className="text-lg font-semibold mb-2">➕ Add Question</h2>
        <form onSubmit={handleAddQuestion} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Question Text</label>
            <Input value={text} onChange={(e) => setText(e.target.value)} required />
          </div>

          {options.map((opt, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium mb-1">Option {idx + 1}</label>
              <Input
                value={opt}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[idx] = e.target.value;
                  setOptions(newOptions);
                }}
                required
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-1">Correct Answer</label>
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Copy one of the above options"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Add Question
          </Button>
        </form>
      </Card>
    </div>
  );
}
