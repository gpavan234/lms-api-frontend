"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

interface Option {
  text: string;
}

interface Question {
  question: string;
  options: Option[];
  correctAnswer: number;
}

export default function EditQuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch quiz details
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
        setQuestions(
          data.questions.map((q: any) => ({
            question: q.question,
            options: q.options.map((opt: string) => ({ text: opt })),
            correctAnswer: q.correctAnswer,
          }))
        );
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    if (quizId) fetchQuiz();
  }, [quizId]);

  // Question handlers
  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex].text = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (qIndex: number, value: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctAnswer = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }], correctAnswer: 0 },
    ]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const addOption = (qIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push({ text: "" });
    setQuestions(newQuestions);
  };

  const removeOption = (qIndex: number, oIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.splice(oIndex, 1);
    setQuestions(newQuestions);
  };

  // Submit update
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
          description,
          questions: questions.map((q) => ({
            question: q.question,
            options: q.options.map((o) => o.text),
            correctAnswer: q.correctAnswer,
          })),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update quiz");
      }

      router.push("/dashboard/quizzes");
    } catch (err: any) {
      console.error(err);
      alert("Error updating quiz: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Quiz</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
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
          <label className="block text-sm font-medium mb-2">Questions</label>
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="border rounded p-3 mb-4">
              <div className="flex justify-between items-center mb-2">
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                  className="flex-1 border rounded px-3 py-2"
                  placeholder={`Question ${qIndex + 1}`}
                  required
                />
                <Button type="button" variant="destructive" onClick={() => removeQuestion(qIndex)}>
                  Remove
                </Button>
              </div>

              {/* Options */}
              <div className="space-y-2 ml-4">
                {q.options.map((opt, oIndex) => (
                  <div key={oIndex} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={opt.text}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                      className="flex-1 border rounded px-3 py-2"
                      placeholder={`Option ${oIndex + 1}`}
                      required
                    />
                    <input
                      type="radio"
                      name={`correct-${qIndex}`}
                      checked={q.correctAnswer === oIndex}
                      onChange={() => handleCorrectAnswerChange(qIndex, oIndex)}
                    />
                    <Button type="button" variant="destructive" onClick={() => removeOption(qIndex, oIndex)}>
                      Remove Option
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={() => addOption(qIndex)}>
                  Add Option
                </Button>
              </div>
            </div>
          ))}
          <Button type="button" onClick={addQuestion}>
            Add Question
          </Button>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Updating..." : "Update Quiz"}
        </Button>
      </form>
    </Card>
  );
}
