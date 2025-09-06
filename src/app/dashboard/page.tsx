"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Courses Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">View and manage your enrolled courses.</p>
            <Button asChild className="mt-3 w-full">
              <a href="/courses">Go to Courses</a>
            </Button>
          </CardContent>
        </Card>

        {/* Quizzes Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Take quizzes and track your progress.</p>
            <Button className="mt-3 w-full">Go to Quizzes</Button>
          </CardContent>
        </Card>

        {/* Certificates Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Download your earned certificates.</p>
            <Button className="mt-3 w-full">View Certificates</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
