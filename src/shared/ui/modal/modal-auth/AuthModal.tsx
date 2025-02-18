import React, { useState, useEffect } from "react";
import ModalLayout from "../modalLayout";
import { AuthCommon } from "./AuthModalCommon";
import { useAuthModalStore } from "@/shared/stores";

export default function AuthModal() {
  const { isModalOpen, closeAuthModal, authMode } = useAuthModalStore();
  const [localMode, setLocalMode] = useState<"login" | "signup">(authMode);

  useEffect(() => {
    setLocalMode(authMode);
  }, [authMode]);

  const switchMode = () => {
    setLocalMode((prev) => (prev === "login" ? "signup" : "login"));
  };

  return (
    <ModalLayout
      open={isModalOpen}
      onClose={closeAuthModal}
      showCloseButton={false}
    >
      <div>
        <AuthCommon />
        {localMode === "login" ? (
          <div>
            <h2 className="mb-4 text-xl font-bold">로그인</h2>
            <div className="flex flex-col mb-4 space-y-2">
              <input className="p-2 border" placeholder="이메일" />
              <input
                className="p-2 border"
                placeholder="비밀번호"
                type="password"
              />
            </div>
            <button className="w-full py-2 text-white bg-blue-500 rounded">
              로그인
            </button>
            <p className="mt-4 text-sm text-center">
              계정이 없으신가요?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={switchMode}
              >
                회원가입
              </span>
            </p>
          </div>
        ) : (
          <div>
            <h2 className="mb-4 text-xl font-bold">회원가입</h2>
            <div className="flex flex-col mb-4 space-y-2">
              <input className="p-2 border" placeholder="이름" />
              <input className="p-2 border" placeholder="이메일" />
              <input
                className="p-2 border"
                placeholder="비밀번호"
                type="password"
              />
            </div>
            <button className="w-full py-2 text-white bg-green-500 rounded">
              회원가입
            </button>
            <p className="mt-4 text-sm text-center">
              이미 계정이 있으신가요?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={switchMode}
              >
                로그인
              </span>
            </p>
          </div>
        )}
      </div>
    </ModalLayout>
  );
}
