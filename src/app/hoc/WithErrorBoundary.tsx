import { FC, ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "@/pages/error";

interface WithErrorBoundaryProps {
  children: ReactNode;
}

export const WithErrorBoundary: FC<WithErrorBoundaryProps> = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorPage}
      onReset={() => {
        window.location.reload();
      }}
    >
      {children}
    </ErrorBoundary>
  );
};
