import React from "react";
import ReactMarkdown from "react-markdown";
import { useCommonCode } from "@/shared/api";
import { CodeType } from "@/shared/constants";

interface LegalCodeProps {
  type: CodeType;
}

interface CodeItem {
  id: number;
  code: string;
  name: string;
}

export const LegalContents: React.FC<LegalCodeProps> = ({ type }) => {
  const { data, isLoading } = useCommonCode<CodeItem[]>(type);

  return (
    <div className="prose max-w-none">
      {isLoading || !data || data.length === 0 ? null : (
        <ReactMarkdown>{data[0].name}</ReactMarkdown>
      )}
    </div>
  );
};
