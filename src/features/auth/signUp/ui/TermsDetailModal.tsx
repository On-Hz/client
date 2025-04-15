import { ModalLayout } from "@/shared/ui";
import { LegalContents } from "@/features/legal";
import { CODE_TYPES, CodeType } from "@/shared/constants";

interface TermDetailModalProps {
  open: boolean;
  onClose: () => void;
  detailTerm: CodeType;
}

export default function TermDetailModal({
  open,
  onClose,
  detailTerm,
}: TermDetailModalProps) {
  const renderDetail = () => {
    switch (detailTerm) {
      case CODE_TYPES.TERMS:
        return <LegalContents type={CODE_TYPES.TERMS} />;
      case CODE_TYPES.PRIVACY:
        return <LegalContents type={CODE_TYPES.PRIVACY} />;
      default:
        return "";
    }
  };

  return (
    <ModalLayout open={open} onClose={onClose} showCloseButton={true}>
      <div className="min-w-72 pt-8 max-500:pt-5">
        <div className="w-[450px] overflow-y-auto max-h-[60vh] max-500:px-4 max-500:w-[300px]">
          {renderDetail()}
        </div>
        <div className="flex justify-center mt-4">
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
