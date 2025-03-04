import { ModalLayout } from "@/shared/ui/modal/modalLayout";

interface TermDetailModalProps {
  open: boolean;
  onClose: () => void;
  detailTerm: "service" | "privacy";
}

export default function TermDetailModal({
  open,
  onClose,
  detailTerm,
}: TermDetailModalProps) {
  // detailTerm 값에 따라 다른 내용 표시
  const renderDetail = () => {
    switch (detailTerm) {
      case "service":
        return "서비스 이용약관 상세 내용이 여기에 표시됩니다.";
      case "privacy":
        return "개인정보 수집/이용 동의 상세 내용이 여기에 표시됩니다.";
      default:
        return "";
    }
  };

  return (
    <ModalLayout open={open} onClose={onClose} showCloseButton={true}>
      <div className="w-[320px]">
        <h2 className="mb-4 text-xl font-bold">약관 상세</h2>
        <p className="mb-6 text-sm">{renderDetail()}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-green-500 rounded"
          >
            닫기
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
