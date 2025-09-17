"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { TextField, Button, Card, CardContent } from "@mui/material";

export default function AddQuizPage() {
  const params = useParams();
  const courseId = params.id as string; // ✅ match folder [id]

  console.log("Course ID from params:", courseId); // Debug log

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/quizzes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          course: courseId, // ✅ now correctly passed
          title,
          description,
          questions: [],
        }),
      });

      if (res.ok) {
        alert("Quiz created!");
      } else {
        const data = await res.json();
        alert(data.message || "Error creating quiz");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "20px auto", padding: 2 }}>
      <CardContent>
        <h2>Create Quiz for Course: {courseId}</h2>
        <TextField
          label="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Save Quiz
        </Button>
      </CardContent>
    </Card>
  );
}
