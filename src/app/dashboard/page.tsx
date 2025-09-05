import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome to your LMS Dashboard 🎓</p>
      </div>
    </ProtectedRoute>
  );
}
