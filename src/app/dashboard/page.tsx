// src/app/dashboard/page.tsx
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
        {/* Add courses, progress, etc. */}
      </main>
    </ProtectedRoute>
  );
}
