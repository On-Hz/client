import React from "react";
import { FallbackProps } from "react-error-boundary";


export const ErrorPage: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  let errorMessage = "";

  if ((error as any).response) {
    const { status, statusText } = (error as any).response;
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
        errorMessage = `Error ${status}: ${statusText}`;
    }
  } else if ((error as any).request) {
    errorMessage = "서버로부터 응답이 없습니다.";
  } else {
    errorMessage = error?.message || "알 수 없는 에러가 발생했습니다.";
  }

  return (
    <div role="alert" style={{ padding: "2rem", textAlign: "center" }}>
      <h2>오류가 발생했습니다.</h2>
      <p>{errorMessage}</p>
      <button onClick={resetErrorBoundary}>재시도</button>
    </div>
  );
};
