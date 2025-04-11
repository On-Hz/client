import { FC, ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "@/pages/error";
import { useNavigate } from "react-router-dom";

interface WithErrorBoundaryProps {
  children: ReactNode;
}

export const WithErrorBoundary: FC<WithErrorBoundaryProps> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <ErrorBoundary
      key={window.location.pathname}
      FallbackComponent={ErrorPage}
      onReset={() => {
        navigate("/", { replace: true })
      }}
    >
      {children}
    </ErrorBoundary>
  );
};
