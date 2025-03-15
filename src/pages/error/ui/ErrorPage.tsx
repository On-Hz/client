import React from "react";
import { FallbackProps } from "react-error-boundary";
import axios from "axios";
import logoWithText from "/public/logo_text.svg";
import logo from "/public/logo.svg";
import { Layout } from "@/shared/ui";

export const ErrorPage: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  // HTTP 상태 코드를 결정 (axios 에러, error.status, 또는 NotFoundError)
  let status: number | null = null;
  if (axios.isAxiosError(error) && error.response) {
    status = error.response.status;
  } else if ((error as any).status) {
    status = (error as any).status;
  } else if ((error as any).name === "NotFoundError") {
    status = 404;
  }

  // 상태 코드에 따른 에러 메시지 설정
  let errorMessage = error?.message || "알 수 없는 에러가 발생했습니다.";
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
        errorMessage = `Error ${status}`;
    }
  }

  // 상태 코드가 없으면 기본 로고와 메시지 렌더링
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
            재시도
          </button>
        </div>
      </Layout>
    );
  }

  // 상태 코드가 있으면 각 자리별로 렌더링 (0은 logo 이미지)
  const codeElements = status
    .toString()
    .split("")
    .map((digit, idx) =>
      digit === "0" ? (
        <img key={idx} src={logo} alt="0" className="w-32 h-32" />
      ) : (
        <span key={idx} className="mx-1 font-bold text-point text-9xl">
          {digit}
        </span>
      )
    );

  return (
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
        재시도
      </button>
    </div>
  );
};
