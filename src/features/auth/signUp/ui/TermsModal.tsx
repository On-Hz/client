import React, { useState } from "react";
import { ModalLayout } from "@/shared/ui/modal/modalLayout";
import TermDetailModal from "./TermsDetailModal";

interface TermsModalProps {
  onClose: () => void;
}

type TermKey = "entire" | "age14" | "service" | "privacy";

const termsConfig: {
  key: TermKey;
  label: string;
  hasView?: boolean;
}[] = [
  { key: "entire", label: "전체 약관 동의" },
  { key: "age14", label: "만 14세 이상입니다." },
  { key: "service", label: "서비스 이용약관", hasView: true },
  { key: "privacy", label: "개인정보 수집/이용 동의", hasView: true },
];

export const TermsModal: React.FC<TermsModalProps> = ({ onClose }) => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailTerm, setDetailTerm] = useState<"service" | "privacy">(
    "service"
  );

  const [checks, setChecks] = useState<Record<TermKey, boolean>>({
    entire: false,
    age14: false,
    service: false,
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
          service: checked,
          privacy: checked,
        };
      } else {
        const newState = { ...prev, [key]: checked };
        // 전체 동의는 나머지 항목(age14, service, privacy)이 모두 true일 때 true로 설정
        newState.entire =
          newState.age14 && newState.service && newState.privacy;
        return newState;
      }
    });
  };

  const openDetailModal = (term: "service" | "privacy") => {
    setDetailTerm(term);
    setDetailOpen(true);
  };

  return (
    <>
      <ModalLayout open={true} onClose={onClose} showCloseButton={true}>
        <div className="p-6 w-[340px] bg-white rounded">
          <h2 className="mb-2 text-lg font-bold">
            약관에 동의하시면 가입이 완료됩니다
          </h2>
          <div className="mt-4 mb-4 space-y-3 text-sm">
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
                      openDetailModal(key as "service" | "privacy")
                    }
                  >
                    보기
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            className="w-full py-2 text-white rounded bg-point"
            onClick={onClose}
          >
            가입하기
          </button>
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
