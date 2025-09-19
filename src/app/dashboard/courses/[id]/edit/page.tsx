"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TextField, Button, Card, CardContent } from "@mui/material";
import Cookies from "js-cookie";

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ✅ Load existing course
  useEffect(() => {
    const token = Cookies.get("token");
    fetch(`http://localhost:5000/api/courses/${courseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setDescription(data.description);
      })
      .catch(console.error);
  }, [courseId]);

  // ✅ Update course
  const handleSubmit = async () => {
    const token = Cookies.get("token");
    const res = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      alert("Course updated!");
      router.push("/dashboard/courses");
    } else {
      const data = await res.json();
      alert(data.message || "Error updating course");
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "20px auto", padding: 2 }}>
      <CardContent>
        <h2>Edit Course</h2>
        <TextField
          label="Title"
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
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}
