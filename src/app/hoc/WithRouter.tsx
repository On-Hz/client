import { FC, ReactNode, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryParamProvider } from "./WithQueryParam";

export const WithRouter: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <QueryParamProvider>{children}</QueryParamProvider>
      </Suspense>
    </BrowserRouter>
  );
};
