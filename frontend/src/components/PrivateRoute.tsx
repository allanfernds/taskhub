import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../services/auth";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");
  if (!token || isTokenExpired(token)) return <Navigate to="/" />;
  return children;
}
