import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const ProtectedRoute = ({ children }: any) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
