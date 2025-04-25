import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { parseSlug } from "../helpers";

export const NotFoundRoute: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!location.pathname.startsWith("/search/")) {
      throw Object.assign(new Error("404 Not Found"), { status: 404 });
    }

    const href = window.location.href;
    const afterSearch = href.split("/search/")[1] || "";
    const rawSlug = afterSearch.split("/")[0];  
    const { keyword, redirectTo } = parseSlug(rawSlug);
    if (keyword && redirectTo) {
      navigate(redirectTo, { replace: true });
    } else {
      throw Object.assign(new Error("404 Not Found"), { status: 404 });
    }
  }, [location, navigate]);

  return null;
};
