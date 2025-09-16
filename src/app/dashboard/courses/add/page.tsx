"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function AddCoursePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const res = await fetch("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);

          // ❌ Restrict access if not instructor/admin
          if (data.role !== "instructor" && data.role !== "admin") {
            router.push("/dashboard/courses");
          }
        } else {
          router.push("/login");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [router]);

  // ✅ Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = Cookies.get("token");
      const res = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        router.push("/dashboard/courses");
      } else {
        const data = await res.json();
        setError(data.message || "Failed to add course.");
      }
    } catch (err) {
      console.error("Error adding course:", err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 flex justify-center">
      <Card className="w-full sm:w-[500px] shadow-md">
        <CardContent className="p-6">
          <h1 className="text-xl font-bold mb-4">➕ Add New Course</h1>

          {error && <p className="text-red-500 mb-3">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Course Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <Textarea
              placeholder="Course Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Course"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
