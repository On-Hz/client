import { InputBox, ModalButton } from "@/shared/ui";
import { validateUserInfo } from "@/shared/validation/authSchema";
import { useState } from "react";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { findPassword } from "../api/findPassword";
import { useModalStore } from "@/shared/stores";

interface FindPasswordFormProps {
  switchMode: (mode: "login" | "signup") => void;
}

export const FindPasswordForm: React.FC<FindPasswordFormProps> = ({ switchMode }) => {
  const { openModal } = useModalStore();
  const [form, setForm] = useState({ email: "", userName: "" });
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const onSubmit = async () => {
    const error = validateUserInfo(form.email, form.userName);
  
    if (error) {
      setValidationError(error);
      return;
    }
  
    const result = await findPassword(form.email, form.userName);
  
    if ("error" in result) {
      setValidationError(result.error);
      return;
    }
  
    setValidationError(null);
    openModal("alertModal", {
      type: "success",
      message: "등록된 이메일로 임시 비밀번호가 발급되었습니다.",
      closeCallback: () => {
        switchMode("login"); // 로그인 화면으로 이동
      },
    });
  };

  return (
    <div className="text-center">
      <p className="text-[16px] font-bold mb-4 text-point">비밀번호 찾기</p>
      <div className="flex flex-col mb-6 space-y-3 w-[300px]">
          <InputBox
            name="email" 
            placeholder="이메일"
            width="100%"
            value={form.email}
            onChange={handleChange}
          />
          <InputBox
            name="userName" 
            placeholder="닉네임"
            width="100%"
            value={form.userName}
            onChange={handleChange}
          />
      </div>
      <div className="mb-6">
          <ModalButton 
            onClick={onSubmit}
            text="임시비밀번호 발급" 
            width="100%"
          />
      </div>
      {(validationError) && (
        <p className="mb-4 text-sm text-center text-red">
          <ReportProblemIcon /> {validationError}
        </p>
      )}
      <button
        className="text-sm font-bold cursor-pointer text-point" 
        onClick={() => switchMode("login")}>
        로그인 화면으로 돌아가기
      </button>
    </div>
  );
};
