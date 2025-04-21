import React, { useState } from "react";
import { InputBox, ModalButton } from "@/shared/ui";
import { TermsModal } from "./TermsModal";
import { validateAuth, validateEmailOnly } from "@/shared/validation/authSchema";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { emailCheck } from "../api/validateUserEmailCheckApi";
import { useSignUp } from "../hooks/useSignUp";
import { useCountdownTimer } from "../hooks/useCountdownTimer";
import { emailVerification } from "../api/emailVerificationApi";
import { emailVerificationVerify } from "../api/emailVerificationVerifyApi";

interface SignupFormProps {
  switchMode: () => void;
}

export const SignUpForm: React.FC<SignupFormProps> = ({ switchMode }) => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const { mutate, errorMessage } = useSignUp({
    onSuccess: () => {
      setIsTermsOpen(false);
      switchMode();
    },
  });
  const [form, setForm] = useState({ email: "", password: "" });
  const [emailCode, setEmailCode] = useState("");
  const [emailSuccessMessage, setEmailSuccessMessage] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false); // 인증 성공 여부
  const [validationError, setValidationError] = useState<string | null>(null);
  const {timeLeft, isRunning, start, reset, minutes, seconds } = useCountdownTimer(300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  
    //이메일이 바뀌면 상태 초기화
    if (name === "email") {
      setIsVerified(false);
      setEmailCode("");
      setValidationError(null);
      setEmailSuccessMessage(null);
      reset(); //타이머 초기화
    }
  };

  
  const handleEmailVerification = async () => {
    const error = validateEmailOnly(form.email);
    if (error) {
      setValidationError(error);
      return;
    }

    const check = await emailCheck(form.email);
    if ("available" in check && !check.available) {
      setValidationError("이미 사용 중인 이메일입니다.");
      return;
    }
  
    setValidationError(null);
    setEmailCode("");
    reset();//인증타이머 초기화
  
    const result = await emailVerification(form.email);

    if ("error" in result) {
      setValidationError(result.error);
    } else {
      setEmailSuccessMessage(result.message);
      start(); //인증 타이머 시작
    }
  
  };
  
  const handleVerifyCode = async () => {
    if (!emailCode) {
      setValidationError("인증번호를 입력해주세요.");
      return;
    }
  
    const result = await emailVerificationVerify(form.email, emailCode);
    console.log("이메일 인증확인",result);

    if ("error" in result) {
      setValidationError(result.error);
      return;
    }
 
    if (result.success) {
      setEmailSuccessMessage(result.message);
      setIsVerified(true); // 인증 성공 상태 저장
      reset(); // 타이머 종료
    } else {
      setValidationError(result.message);
    }
  };

  // 약관 동의 후 회원가입 실행
  const handleCompleteSignup = () => {
    mutate({ ...form });
  };

  const onSubmit = async () => {
    const error = validateAuth(form.email, form.password);
  
    // 유효성 검증
    if (error) {
      setValidationError(error);
      return;
    }
  
    // 이메일 인증 확인
    if (!isVerified) {
      setValidationError("이메일 인증을 완료해주세요.");
      return;
    }
  
    setValidationError(null);
    setIsTermsOpen(true);
  };
  

  return (
    <div>
      <div className="flex flex-col mb-6 space-y-3 w-[300px]">
        <div className="flex">
          <div className="flex-1">
            <InputBox
              name="email"
              placeholder="이메일"
              width="100%"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <button
            disabled={isVerified}
            onClick={handleEmailVerification}
            className={`text-[14px] border rounded-md ml-2 px-2 transition-colors ${
              isVerified
                ? "bg-gray-300 text-white cursor-not-allowed bg-gray5"
                : "bg-point text-white hover:bg-white hover:text-point border-point"
            }`}
          >
            {isVerified ? "인증 완료" : "인증번호 발송"}
          </button>

        </div>
        
        {emailSuccessMessage && isRunning && (
          <p className="mb-2 text-sm text-green-600 text-left">{emailSuccessMessage}</p>
        )}


        {!isVerified && isRunning && (
          <>
            <div className="flex">
              <div className="flex-1">
                <InputBox
                  name="emailCode"
                  placeholder="인증번호 입력"
                  width="100%"
                  type="text"
                  value={emailCode}
                  onChange={(e) => setEmailCode(e.target.value)}
                />
              </div>
              <button
                onClick={handleVerifyCode}
                className="text-[14px] border border-point bg-point text-white rounded-md ml-2 px-2 hover:bg-white hover:text-point transition-colors"
              >
                인증확인
              </button>
            </div>

            <p className="text-xs text-gray-500 text-right mt-1 text-red">
              남은 시간: {minutes}:{seconds}
            </p>
          </>
        )}

        {isVerified && (
          <p className="text-xs text-green-600 mt-1">이메일 인증이 완료되었습니다.</p>
        )}

        {!isVerified && !isRunning && timeLeft === 0 && emailSuccessMessage && (
          <p className="text-xs text-red mt-1">
            인증 시간이 만료되었습니다. 다시 시도해주세요.
          </p>
        )}



        <InputBox
          name="password"
          placeholder="비밀번호"
          width="100%"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>

      {/* 0421 (추후 에러메세지 수정 예정) */}

      {/* 인증 중 발생한 에러 (인증번호 틀림 등) */}
      {validationError && isRunning && !isVerified && (
        <p className="mb-4 text-sm text-center text-red">
            <ReportProblemIcon className="mr-1" />
            {validationError}
          </p>
      )}

      {/* 일반 유효성 검증 에러 (이메일/비밀번호 미입력 등) */}
      {validationError && !isRunning && !isVerified && (
        <p className="mb-4 text-sm text-center text-red">
            <ReportProblemIcon className="mr-1" />
            {validationError}
          </p>
      )}
      {/* 서버응답 에러 */}
      {errorMessage && (
        <p className="mb-4 text-sm text-center text-red">
          <ReportProblemIcon className="mr-1" />
          {errorMessage}
        </p>
      )}

      <div className="mb-6">
        <ModalButton text="회원가입" width="100%" onClick={onSubmit} />
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
