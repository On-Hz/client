import { FC, ReactNode, Suspense } from "react";
import { QueryParamProvider } from "./WithQueryParam";
import { BrowserRouter } from "react-router-dom";
import { LoadingLogo } from "@/shared/ui/loadingLogo/LoadingLogo";
import ScrollToTop from "./ScrollToTop";

export const WithRouter: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-full h-screen bg-white">
            <LoadingLogo />
          </div>
        }
      >
        <QueryParamProvider>{children}</QueryParamProvider>
      </Suspense>
    </BrowserRouter>
  );
};
