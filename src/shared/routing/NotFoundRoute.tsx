import { ErrorPage } from "@/pages/error";
import { useNavigate } from "react-router-dom";

export const NotFoundRoute: React.FC = () => {
  const navigate = useNavigate();
  return (
    <ErrorPage
      error={Object.assign(new Error("404 Not Found"), {
        status: 404,
        name: "NotFoundError",
      })}
      resetErrorBoundary={() => navigate("/", { replace: true })}
    />
  );
};
