import React, { useState } from "react";
import { InputBox, ModalButton } from "@/shared/ui";
import { TermsModal } from "./TermsModal";
import { useSignUp } from "./hooks/useSignUp";
import { validateSignup } from "@/shared/validation/authSchema";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

interface SignupFormProps {
  switchMode: () => void;
}

export const SignUpForm: React.FC<SignupFormProps> = ({ switchMode }) => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const { mutate, errorMessage } = useSignUp();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 약관 동의 후 회원가입 실행
  const handleCompleteSignup = () => {
    mutate({ ...form });
  };

  const onSubmit = () => {
    const error = validateSignup(form.name, form.email, form.password);
    setValidationError(error);

    if (!error) {
      setIsTermsOpen(true);
    }
  };

  return (
    <div>
      <div className="flex flex-col mb-6 space-y-3 w-[300px]">
        <InputBox
          name="name"
          placeholder="닉네임"
          width="100%"
          value={form.name}
          onChange={handleChange}
        />
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
        <p className="text-red text-sm text-center mb-4">
          <ReportProblemIcon /> {validationError || errorMessage}
        </p>
      )}
      
      <div className="mb-6">
        <ModalButton text="회원가입" width="100%" onClick={onSubmit} />
      </div>

      <p className="text-sm text-center">
        이미 계정이 있으신가요?{" "}
        <span className="font-bold cursor-pointer text-point" onClick={switchMode}>
          로그인
        </span>
      </p>

      {/* 약관 동의 모달 */}
      {isTermsOpen && (
        <TermsModal
          onClose={() => setIsTermsOpen(false)}
          onComplete={handleCompleteSignup}
        />
      )}
    </div>
  );
};
