import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";

const AuthRedirectRoute = ({ children }) => {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (user) {
    return (
      <Navigate
        to={user.role === "admin" ? "/admin" : "/candidate"}
        replace
      />
    );
  }

  return children;
};

export default AuthRedirectRoute;
