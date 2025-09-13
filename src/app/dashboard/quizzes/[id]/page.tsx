"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import useUser from "@/hooks/useUser";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
}

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.id as string;

  const { user, loading: userLoading } = useUser();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<{ questionId: number; selectedOption: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    fetch(`http://localhost:5000/api/quizzes/${quizId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setQuiz(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [quizId]);

  const handleOptionSelect = (questionIndex: number, optionIndex: number) => {
    const updated = [...answers];
    updated[questionIndex] = { questionId: questionIndex, selectedOption: optionIndex };
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const token = Cookies.get("token");
      const res = await fetch(`http://localhost:5000/api/quizzes/${quizId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ answers }),
      });

      if (!res.ok) throw new Error("Submit failed");
      const data = await res.json();
      alert(`Quiz submitted! Score: ${data.score}/${data.totalQuestions}`);
      router.push("/dashboard/my-courses");
    } catch (err) {
      console.error(err);
      alert("Error submitting quiz");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || userLoading) return <p>Loading...</p>;
  if (!quiz) return <p>Quiz not found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold">{quiz.title}</h1>
        <p className="text-gray-700 mb-4">{quiz.description}</p>

        {user?.role === "instructor" || user?.role === "admin" ? (
          <div className="flex gap-2 mb-4">
            <Button onClick={() => router.push(`/dashboard/quizzes/${quiz._id}/edit`)}>Edit Quiz</Button>
            <Button onClick={() => router.push(`/dashboard/quizzes/${quiz._id}/questions`)}>Add Questions</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {quiz.questions.map((q, idx) => (
              <Card key={idx} className="p-4">
                <p className="font-medium">{q.question}</p>
                <div className="flex flex-col gap-2 mt-2">
                  {q.options.map((opt, i) => (
                    <label key={i} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`question-${idx}`}
                        checked={answers[idx]?.selectedOption === i}
                        onChange={() => handleOptionSelect(idx, i)}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </Card>
            ))}
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Quiz"}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
