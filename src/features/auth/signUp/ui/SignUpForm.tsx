import React, { useState } from "react";
import { InputBox } from "@/shared/ui/inputBox/InputBox";
import { ModalButton } from "@/shared/ui/modal/modal-button/ModalButton";
import { TermsModal } from "@/features/auth/signUp/ui/TermsModal";

interface SignupFormProps {
  switchMode: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ switchMode }) => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <div className="px-8">
      <div className="flex flex-col mb-6 space-y-4">
        <InputBox placeholder="이름" width="100%" />
        <InputBox placeholder="이메일" width="100%" />
        <InputBox placeholder="비밀번호" width="100%" />
      </div>
      <div className="mb-6">
        <ModalButton
          text="회원가입"
          width="100%"
          onClick={() => setIsTermsOpen(true)}
        />
      </div>

      <p className="text-sm text-center">
        이미 계정이 있으신가요?{" "}
        <span
          className="font-bold cursor-pointer text-point"
          onClick={switchMode}
        >
          로그인
        </span>
      </p>
      {/* 약관 동의 모달 (첫번째 nested modal) */}
      {isTermsOpen && <TermsModal onClose={() => setIsTermsOpen(false)} />}
    </div>
  );
};

export default SignupForm;
