"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Award } from "lucide-react";
import Layout from "@/components/Layout";
const mockLessons = [
  { id: "1", title: "Introduction to React", duration: "10 min", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", content: "React is a JavaScript library..." },
  { id: "2", title: "React Components", duration: "15 min", videoUrl: "https://www.w3schools.com/html/movie.mp4", content: "Components let you split the UI..." },
  { id: "3", title: "React Hooks", duration: "20 min", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", content: "Hooks let you use state..." },
];

export default function LearnPage() {
  const params = useParams();
  const courseId = params.id as string;

  const [activeLesson, setActiveLesson] = useState(mockLessons[0]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showCertificate, setShowCertificate] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const markAsCompleted = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      const updatedCompleted = [...completedLessons, lessonId];
      setCompletedLessons(updatedCompleted);

      if (updatedCompleted.length === mockLessons.length) {
        setTimeout(() => setShowCertificate(true), 500);
      }
    }
  };

  const totalLessons = mockLessons.length;
  const completedCount = completedLessons.length;
  const progress = Math.round((completedCount / totalLessons) * 100);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  // 🔹 API call to backend to generate certificate

  const handleGenerateCertificate = async () => {
    const res = await fetch("http://localhost:5000/api/certificates/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ courseId }),
    });

    if (!res.ok) throw new Error("Failed to generate certificate");

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "certificate.pdf";
    link.click();
  };

  return (
    <Layout>
      <main className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white shadow-lg border-r p-4">
          <h2 className="text-lg font-bold mb-4">Course Lessons</h2>
          <ul className="space-y-3">
            {mockLessons.map((lesson) => (
              <li key={lesson.id}>
                <Button
                  variant={lesson.id === activeLesson.id ? "default" : "outline"}
                  className="w-full justify-between"
                  onClick={() => setActiveLesson(lesson)}
                >
                  <span>{lesson.title}</span>
                  {completedLessons.includes(lesson.id) && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </Button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <section className="flex-1 p-6">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress: {completedCount}/{totalLessons} lessons ({progress}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <Card className="p-4 shadow-lg">
            <h1 className="text-2xl font-bold mb-3">{activeLesson.title}</h1>
            <video
              key={activeLesson.id}
              controls
              className="w-full rounded-lg mb-4"
              src={activeLesson.videoUrl}
              onEnded={() => markAsCompleted(activeLesson.id)}
            />
            <p className="text-gray-700">{activeLesson.content}</p>

            {!completedLessons.includes(activeLesson.id) && (
              <Button className="mt-4" onClick={() => markAsCompleted(activeLesson.id)}>
                Mark as Completed
              </Button>
            )}
          </Card>

          {/* 🎉 Completion Popup */}
          {showCertificate && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/60">
              <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-[400px] relative">
                {/* Close Button */}
                <button
                  onClick={() => setShowCertificate(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>

                <Award className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                <h2 className="text-xl font-bold mb-2">🎉 Congratulations!</h2>
                <p className="text-gray-600 mb-4">
                  You have successfully completed <b>all lessons</b> in this course.
                </p>
                <Button
                  className="w-full"
                  onClick={handleGenerateCertificate}
                  disabled={downloading}
                >
                  {downloading ? "Generating..." : "🎓 Download Certificate"}
                </Button>
              </div>
            </div>
          )}
        </section>
      </main>
    </Layout>
  );
}
