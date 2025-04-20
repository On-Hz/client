import React from "react";
import { FallbackProps } from "react-error-boundary";
import axios from "axios";
import logoWithText from "/public/logo_text.svg";
import logo from "/public/logo.svg";
import { Layout } from "@/shared/ui";

interface ApiErrorResponse {
  message?: string;
  status?: string;
  statusCode?: number;
}

export const ErrorPage: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  let status: number | null = null;
  let errorMessage = "알 수 없는 에러가 발생했습니다.";

  if (axios.isAxiosError(error) && error.response) {
    const data = error.response.data as ApiErrorResponse;
    status = data.statusCode ?? error.response.status;
    errorMessage = data.message ?? error.message;
  } else if ((error as any).statusCode || (error as any).status) {
    status = (error as any).statusCode ?? (error as any).status;
    errorMessage = (error as any).message ?? errorMessage;
  }

  if (status) {
    switch (status) {
      case 404:
        errorMessage = "404 Not Found: 요청한 페이지를 찾을 수 없습니다.";
        break;
      case 401:
        errorMessage = "401 Unauthorized: 인증이 필요합니다.";
        break;
      case 502:
        errorMessage = "502 Bad Gateway: 서버와의 연결에 문제가 발생했습니다.";
        break;
      default:
        errorMessage = errorMessage ? errorMessage : `Error ${status}`;
    }
  }

  if (!status) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
          <img src={logoWithText} alt="로고" className="w-80" />
          <h2 className="text-3xl font-bold text-gray-700">
            오류가 발생했습니다.
          </h2>
          <p className="mt-4 text-lg text-potin">{errorMessage}</p>
          <button
            onClick={resetErrorBoundary}
            className="px-10 py-4 mt-12 text-lg font-bold text-white rounded-full bg-point"
          >
            HOME
          </button>
        </div>
      </Layout>
    );
  }

  const codeElements = status
    .toString()
    .split("")
    .map((digit, idx) =>
      digit === "0" ? (
        <img key={idx} src={logo} alt="0" className="w-32 h-32" />
      ) : (
        <span key={idx} className="mx-1 mr-6 font-bold text-point text-9xl">
          {digit}
        </span>
      )
    );

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
        <div className="flex items-center justify-center">{codeElements}</div>
        <h2 className="mt-8 text-3xl font-bold text-gray-700">
          오류가 발생했습니다.
        </h2>
        <p className="mt-4 text-lg text-gray-600">{errorMessage}</p>
        <button
          onClick={resetErrorBoundary}
          className="px-10 py-4 mt-12 text-lg font-bold text-white rounded-full bg-point"
        >
          HOME
        </button>
      </div>
    </Layout>
  );
};
