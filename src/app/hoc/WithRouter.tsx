import { FC, ReactNode, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { LoadingLogo } from "@/shared/ui/loadingLogo/LoadingLogo";
import ScrollManager from "./ScrollManager";

export const WithRouter: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <ScrollManager />
      <Suspense
        fallback={
          <div className="flex items-center justify-center w-full h-screen bg-white">
            <LoadingLogo />
          </div>
        }
      >
        {children}
      </Suspense>
    </BrowserRouter>
  );
};
