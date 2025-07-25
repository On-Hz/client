import React from "react";
import { ModalLayout } from "@/shared/ui";
import { useModalStore, useAuthModalStore } from "@/shared/stores";
import logo from "/public/logo_text.svg";

export const AuthInfoModal: React.FC = () => {
  const { modals, closeModal } = useModalStore();
  const openAuthModal = useAuthModalStore((state) => state.openAuthModal);

  // 로그인 버튼 클릭 시:
  const handleLogin = () => {
    closeModal("authInfoModal");
    openAuthModal("login");
  };

  // 회원가입 버튼 클릭 시:
  const handleSignup = () => {
    closeModal("authInfoModal");
    openAuthModal("signup");
  };

  return (
    <ModalLayout
      open={modals["authInfoModal"] || false}
      onClose={() => closeModal("authInfoModal")}
      showCloseButton={true}
    >
      <div className="py-[20px] px-[30px] max-500:p-0 min-w-72">
        <div className="mb-6">
          <div className="px-8 mb-10 text-center">
            <img src={logo} alt="On-Hz" className="w-20 m-auto mb-1" />
          </div>
        </div>
        <p className="mb-10 text-lg text-center text-black break-keep">
          로그인 또는 회원가입 후 <br /> 이용 가능합니다.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-point text-white border rounded-[5px] text-[14px] py-[10px] px-[12px]"
            onClick={handleSignup}
          >
            회원가입
          </button>
          <button
            className="hz-login text-black py-[10px] px-[12px] mr-[5px] text-[14px] transform hover:text-point transition-colors"
            onClick={handleLogin}
          >
            로그인
          </button>
        </div>
      </div>
    </ModalLayout>
  );
};
