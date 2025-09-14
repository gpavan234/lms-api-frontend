"use client";

import React, { useEffect, useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useRouter, useParams } from "next/navigation";

const EditCoursePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    fetch(`/api/courses/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setDescription(data.description);
      });
  }, [params.id]);

  const handleUpdate = async () => {
    const res = await fetch(`/api/courses/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      router.push("/courses");
    } else {
      alert("Failed to update course");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Course
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
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update
      </Button>
    </Container>
  );
};

export default EditCoursePage;
