import React, { useState, useEffect } from "react";
import ModalLayout from "../modalLayout";
import { AuthCommon } from "./AuthModalCommon";
import { useAuthModalStore } from "@/shared/stores";
import { InputBox } from "../../inputBox/InputBox";
import { ModalButton } from "../modal-button/ModalButton";

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
      <div className="w-[340px]">
        {/* 공통 영역: 로고, SNS 아이콘, OR, 타이틀 */}
        <AuthCommon localMode={localMode} />

        {localMode === "login" ? (
          <div className="px-10">
            {/* 입력 폼 */}
            <div className="flex flex-col mb-6 space-y-2">
              <InputBox placeholder="이메일" width="100%" />
              <InputBox placeholder="비밀번호" width="100%" />
            </div>
            {/* 로그인 버튼 */}
            <div className="mb-6">
              <ModalButton text="로그인" width="100%"/>
            </div>
            <div className="flex mb-4 justify-self-center">
              <p className="text-xs text-point">비밀번호를 잊어버리셨나요?</p>
            </div>
            <p className="text-sm text-center">
              계정이 없으신가요?{" "}
              <span
                className="font-extrabold cursor-pointer text-point"
                onClick={switchMode}
              >
                회원가입
              </span>
            </p>
          </div>
        ) : (
          <div className="px-8">
            {/* 입력 폼 */}
            <div className="flex flex-col mb-6 space-y-2">
              <InputBox placeholder="이름" width="100%" />
              <InputBox placeholder="이메일" width="100%" />
              <InputBox placeholder="비밀번호" width="100%" />
            </div>
            {/* 회원가입 버튼 */}
            <div className="mb-6">
              <ModalButton text="회원가입" width="100%"/>
            </div>
            {/* 전환 링크 */}
            <p className="text-sm text-center">
              이미 계정이 있으신가요?{" "}
              <span
                className="font-bold cursor-pointer text-point"
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
