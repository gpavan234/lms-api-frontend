"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import Cookies from "js-cookie";

export default function AddQuizPage() {
  const params = useParams();
  const courseId = params.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: 0 },
  ]);

  // ✅ Add new question block
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: 0 },
    ]);
  };

  // ✅ Update question text
  const handleQuestionChange = (qIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].question = value;
    setQuestions(updated);
  };

  // ✅ Update option text
  const handleOptionChange = (
    qIndex: number,
    oIndex: number,
    value: string
  ) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  // ✅ Update correct answer
  const handleCorrectChange = (qIndex: number, value: number) => {
    const updated = [...questions];
    updated[qIndex].correctAnswer = value;
    setQuestions(updated);
  };

  // ✅ Submit quiz
  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/quizzes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify({
          course: courseId,
          title,
          description,
          questions,
        }),
      });

      if (res.ok) {
        alert("Quiz created successfully!");
      } else {
        const data = await res.json();
        alert(data.message || "Error creating quiz");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card sx={{ maxWidth: 800, margin: "20px auto", padding: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Create Quiz for Course: {courseId}
        </Typography>

        {/* Quiz Title */}
        <TextField
          label="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />

        {/* Quiz Description */}
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />

        {/* Questions */}
        {questions.map((q, qIndex) => (
          <Box key={qIndex} sx={{ mt: 3, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
            <TextField
              label={`Question ${qIndex + 1}`}
              value={q.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              fullWidth
              margin="normal"
            />

            {q.options.map((opt, oIndex) => (
              <TextField
                key={oIndex}
                label={`Option ${oIndex + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                fullWidth
                margin="dense"
              />
            ))}

            <TextField
              label="Correct Answer (0-3)"
              type="number"
              value={q.correctAnswer}
              onChange={(e) => handleCorrectChange(qIndex, Number(e.target.value))}
              fullWidth
              margin="normal"
            />
          </Box>
        ))}

        <Button onClick={addQuestion} variant="outlined" sx={{ mt: 2 }}>
          ➕ Add Another Question
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 3, ml: 2 }}
        >
          Save Quiz
        </Button>
      </CardContent>
    </Card>
  );
}
