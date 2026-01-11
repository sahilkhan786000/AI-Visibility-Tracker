import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

export default function PublicRoute({
  children,
}: {
  children: ReactNode;
}) {
  const token = localStorage.getItem("token");

  // If user is already logged in → redirect to dashboard
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
