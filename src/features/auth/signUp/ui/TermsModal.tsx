import React, { useState } from "react";
import { ModalLayout, ModalButton } from "@/shared/ui";
import TermDetailModal from "./TermsDetailModal";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { CODE_TYPES, CodeType } from "@/shared/constants";

interface TermsModalProps {
  onComplete: () => void; 
  onClose: () => void;
}

type TermKey = "entire" | "age14" | "terms" | "privacy";

const termsConfig: {
  key: TermKey;
  label: string;
  hasView?: boolean;
}[] = [
  { key: "entire", label: "전체 약관 동의" },
  { key: "age14", label: "(필수) 만 14세 이상입니다." },
  { key: "terms", label: "(필수) 서비스 이용약관", hasView: true },
  { key: "privacy", label: "(필수) 개인정보 수집/이용 동의", hasView: true },
];

export const TermsModal: React.FC<TermsModalProps> = ({ onComplete, onClose }) => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailTerm, setDetailTerm] = useState<CodeType>(
    CODE_TYPES.TERMS
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  const [checks, setChecks] = useState<Record<TermKey, boolean>>({
    entire: false,
    age14: false,
    terms: false,
    privacy: false,
  });

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const key = name as TermKey;
    setChecks((prev) => {
      if (key === "entire") {
        return {
          entire: checked,
          age14: checked,
          terms: checked,
          privacy: checked,
        };
      } else {
        const newState = { ...prev, [key]: checked };
        // 전체 동의는 나머지 항목(age14, service, privacy)이 모두 true일 때 true로 설정
        newState.entire =
          newState.age14 && newState.terms && newState.privacy;
        return newState;
      }
    });
    setErrorMessage(null);
  };

  const openDetailModal = (term: "terms" | "privacy") => {
    setDetailTerm(term);
    setDetailOpen(true);
  };

  const isAllChecked = checks.age14 && checks.terms && checks.privacy;

  const handleSubmit = () => {
    if (!isAllChecked) {
      setErrorMessage("필수 약관에 동의해야 가입이 가능합니다.");
      return;
    }
    onComplete();
  };


  return (
    <>
      <ModalLayout open={true} onClose={onClose} showCloseButton={true}>
        <div className="p-6 w-[340px] bg-white rounded max-500:w-full">
          <h2 className="mb-2 text-lg font-bold">
            약관에 동의하시면 가입이 완료됩니다
          </h2>
          <div className="mt-4 space-y-3 text-sm mb-9">
            {termsConfig.map(({ key, label, hasView }) => (
              <div
                key={key}
                className={`flex items-center justify-${
                  hasView ? "between" : "start"
                }`}
              >
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name={key}
                    checked={checks[key]}
                    onChange={handleCheck}
                    className="mr-2"
                  />
                  {label}
                </label>
                {hasView && (
                  <button
                    className="text-xs text-blue-500 underline"
                    onClick={() =>
                      openDetailModal(key as "terms" | "privacy")
                    }
                  >
                    보기
                  </button>
                )}
              </div>
            ))}
          </div>
          {errorMessage && <p className="text-red text-sm text-center mb-3"> <ReportProblemIcon /> {errorMessage}</p>}
          <ModalButton text="가입하기" width="100%" onClick={handleSubmit} />
        </div>
      </ModalLayout>
      <TermDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        detailTerm={detailTerm}
      />
    </>
  );
};
