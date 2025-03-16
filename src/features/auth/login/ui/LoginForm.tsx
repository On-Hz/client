import React, { useState } from "react";
import { InputBox, ModalButton } from "@/shared/ui";
import { useLogin } from "../hooks/useLogin";
import { validateLogin } from "@/shared/validation/authSchema";

interface LoginFormProps {
  switchMode: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ switchMode }) => {
  const { handleLogin } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    // 유효성 검사 & 즉시 에러 업데이트
    const validationError = validateLogin(email, password);
    if (validationError) {
      return setError(validationError);
    }

    const apiError = await handleLogin(email, password);
    setError(apiError);
  };

  return (
    <div>
      <div className="flex flex-col mb-6 space-y-3 w-[300px]">
        <InputBox
          placeholder="이메일"
          width="100%"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputBox
          placeholder="비밀번호"
          width="100%"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="text-red text-sm text-center mb-4">{error}</p>}
      <div className="mb-6">
        <ModalButton text="로그인" width="100%" onClick={onSubmit}/>
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
