// components/Auth/CandidateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";

const CandidateRoute = ({ children }) => {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!user || user.role !== "candidate") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default CandidateRoute;
