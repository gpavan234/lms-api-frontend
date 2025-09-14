"use client";

import React, { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const AddCoursePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    const res = await fetch("/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      router.push("/courses");
    } else {
      alert("Failed to create course");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add New Course
      </Typography>
      <TextField
        label="Course Title"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Description"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save
      </Button>
    </Container>
  );
};

export default AddCoursePage;
