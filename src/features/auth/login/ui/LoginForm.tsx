import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { InputBox, ModalButton } from "@/shared/ui";
import { useLogin } from "../hooks/useLogin";
import { validateAuth } from "@/shared/validation/authSchema";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

interface LoginFormProps {
  switchMode: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ switchMode }) => {
  const queryClient = useQueryClient();
  const { mutate, errorMessage } = useLogin(queryClient); 
  const [form, setForm] = useState({ email: "", password: "" });
  const [validationError, setValidationError] = useState<string | null>(null);
  
  // 입력값 변경
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //로그인
  const onSubmit = () => {
  const errorMessage = validateAuth(form.email, form.password);
    setValidationError(errorMessage); // 유효성 검사 에러
    if (!errorMessage) {
      mutate(form); 
    }
  };

  return (
    <div>
      <div className="flex flex-col mb-6 space-y-3 w-[300px]">
        <InputBox
          name="email" 
          placeholder="이메일"
          width="100%"
          value={form.email}
          onChange={handleChange}
        />
        <InputBox
          name="password" 
          placeholder="비밀번호"
          width="100%"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>
      {(validationError || errorMessage) && (
        <p className="mb-4 text-sm text-center text-red">
          <ReportProblemIcon /> {validationError || errorMessage}
        </p>
      )}
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
