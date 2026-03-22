import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export function ProtectedRoute({ children }) {
  const { currentUser, loading } = useContext(UserContext);
  if (loading) return <div className="h-screen flex items-center justify-center">Authenticating...</div>;
  if (!currentUser) return <Navigate to="/" />;
  return children;
}
