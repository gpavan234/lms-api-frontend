// src/components/ProtectedRoute.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import Loader from "@/components/Loader";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[]; // optional role-based access
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user && allowedRoles && !allowedRoles.includes(user.role)) {
      router.push("/dashboard"); // redirect if role not allowed
    }
  }, [user, loading, router, allowedRoles]);

  if (loading || !user) return <Loader />;

  return <>{children}</>;
}
