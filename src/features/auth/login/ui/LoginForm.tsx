import React from "react";
import { InputBox } from "@/shared/ui/inputBox/InputBox";
import { ModalButton } from "@/shared/ui/modal/modal-button/ModalButton";

interface LoginFormProps {
  switchMode: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ switchMode }) => {
  return (
    <div>
      <div className="flex flex-col mb-6 space-y-3 w-[300px]">
        <InputBox placeholder="이메일" width="100%" />
        <InputBox placeholder="비밀번호" width="100%" />
      </div>
      <div className="mb-6">
        <ModalButton text="로그인" width="100%" />
      </div>
      <div className="flex justify-center mb-4">
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
  );
};

export default LoginForm;
