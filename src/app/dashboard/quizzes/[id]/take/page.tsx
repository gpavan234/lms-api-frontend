"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

interface Question {
  question: string;
  options: string[];
}

export default function TakeQuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch quiz data
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = Cookies.get("token");
        const res = await fetch(`http://localhost:5000/api/quizzes/${quizId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description || "");
        setQuestions(data.questions || []);
        setAnswers(new Array(data.questions.length).fill(-1)); // initialize with -1 (no answer)
      } catch (err) {
        console.error("Error fetching quiz:", err);
      }
    };

    if (quizId) fetchQuiz();
  }, [quizId]);

  // Handle option select
  const handleSelect = (index: number, optionIndex: number) => {
    const updated = [...answers];
    updated[index] = optionIndex;
    setAnswers(updated);
  };

  // Submit quiz
  const handleSubmit = async () => {
    if (answers.includes(-1)) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setLoading(true);
    try {
      const token = Cookies.get("token");
      const res = await fetch(`http://localhost:5000/api/quizzes/${quizId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          answers: answers.map((ans, idx) => ({
            questionId: idx,
            selectedOption: ans,
          })),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Submission failed");

      alert(`Quiz submitted successfully! Score: ${data.score}/${data.totalQuestions}`);
      router.push("/dashboard/quizzes");
    } catch (err) {
      console.error("Error submitting quiz:", err);
      alert("Error submitting quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>

      {questions.map((q, qIndex) => (
        <div key={qIndex} className="mb-6">
          <h2 className="font-semibold mb-2">
            {qIndex + 1}. {q.question}
          </h2>
          <div className="flex flex-col gap-2">
            {q.options.map((opt, oIndex) => (
              <label key={oIndex} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`question-${qIndex}`}
                  checked={answers[qIndex] === oIndex}
                  onChange={() => handleSelect(qIndex, oIndex)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}

      <Button className="w-full" onClick={handleSubmit} disabled={loading}>
        {loading ? "Submitting..." : "Submit Quiz"}
      </Button>
    </Card>
  );
}
