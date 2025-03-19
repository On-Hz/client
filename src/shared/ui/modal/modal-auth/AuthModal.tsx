import { useState, useEffect } from "react";
import { ModalLayout } from "@/shared/ui";
import { AuthCommon } from "./AuthModalCommon";
import { useAuthModalStore } from "@/shared/stores";
import {LoginForm, SignUpForm } from "@/features/auth";

export const AuthModal: React.FC = () => {
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
      <div className="py-[25px] px-[60px] max-500:p-0 min-w-72">
        {/* 공통 영역: 로고, SNS 아이콘, OR, 타이틀 (AuthCommon) */}
        <AuthCommon />
        {localMode === "login" ? (
          <LoginForm switchMode={switchMode} />
        ) : (
          <SignUpForm switchMode={switchMode} />
        )}
      </div>
    </ModalLayout>
  );
};

// feature 컴포넌트를 shared에서 가져올 수 없음. feature/auth 폴더 내에서 login,signUpForm을 props로 받아오는 등 방법 생각해봐야할듯. 