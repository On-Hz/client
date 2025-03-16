import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/shared/stores/authStore";

export const PrivateRoute = () => {
  const { user } = useAuthStore();
  const location = useLocation(); //현재 URL 저장

  return user ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
};
