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
      <div className="w-[500px] overflow-y-auto max-h-[80vh] p-4 mt-8">
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
    </ModalLayout>
  );
}
