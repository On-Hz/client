import { initAuth } from "@/features/auth/api/initAuth";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAuthToken } from "../stores/authCookie";

export const InitAuthEffect = () => {
  const location = useLocation();

  useEffect(() => {
    const accessToken = getAuthToken();

    if (accessToken == null) {
      // console.log("initAuth");
      initAuth();
    }
  }, [location.pathname]);
  
  return null; 
};
