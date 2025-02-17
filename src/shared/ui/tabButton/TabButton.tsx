import React from "react";

interface TabButtonProps {
  text: string;
  isActive: boolean;
  onClick?: () => void;
}

export const TabButton: React.FC<TabButtonProps> = ({
  text,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-[12px] py-[6px] mr-[8px] border rounded-[8px] transform transition-colors
        ${
          isActive
            ? "border-point text-point"
            : "border-gray5 text-black hover:border-point hover:text-point"
        }
      `}
    >
      {text}
    </button>
  );
};
