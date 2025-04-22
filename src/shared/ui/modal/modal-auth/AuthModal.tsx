import { useState, useEffect } from "react";
import { ModalLayout } from "@/shared/ui";
import { AuthCommon } from "./AuthModalCommon";
import { useAuthModalStore } from "@/shared/stores";
import {LoginForm, SignUpForm } from "@/features/auth";
import { FindPasswordForm } from "@/features/auth/findPassword/ui/FindPasswordForm";

export const AuthModal: React.FC = () => {
  const { isModalOpen, closeAuthModal, authMode } = useAuthModalStore();
  const [localMode, setLocalMode] = useState<"login" | "signup" | "findPassword">(authMode);

  useEffect(() => {
    setLocalMode(authMode);
  }, [authMode]);

  const switchMode = (mode: "login" | "signup" | "findPassword") => {
    setLocalMode(mode);
  };
  
  return (
    <ModalLayout
      open={isModalOpen}
      onClose={closeAuthModal}
      showCloseButton={false}
    >
      <div className="py-[25px] px-[60px] max-500:p-0 min-w-72">
        {/* 공통 영역: 로고, SNS 아이콘, OR, 타이틀 (AuthCommon) */}
        <AuthCommon showSocial={localMode !== "findPassword"} />
        {localMode === "login" && <LoginForm switchMode={switchMode} />}
        {localMode === "signup" && <SignUpForm switchMode={switchMode} />}
        {localMode === "findPassword" && <FindPasswordForm switchMode={switchMode} />}
      </div>
    </ModalLayout>
  );
};