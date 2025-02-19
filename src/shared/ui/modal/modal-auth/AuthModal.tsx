import React, { useState, useEffect } from "react";
import { ModalLayout } from "../modalLayout";
import { AuthCommon } from "./AuthModalCommon";
import { useAuthModalStore } from "@/shared/stores";
import LoginForm from "@/features/auth/login/ui/LoginForm";
import SignupForm from "@/features/auth/signUp/ui/SignUpForm";

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
        {/* 공통 영역: 로고, SNS 아이콘, OR, 타이틀 (AuthCommon) */}
        <AuthCommon localMode={localMode} />
        {localMode === "login" ? (
          <LoginForm switchMode={switchMode} />
        ) : (
          <SignupForm switchMode={switchMode} />
        )}
      </div>
    </ModalLayout>
  );
}
