
"use client";

import { Question } from "@/data/questionnaireMock";
import { getLocalizedText } from "@/utils/i18nHelper";
import { useTranslation } from "react-i18next";
import { FileSearch } from "lucide-react";

interface TextareaFieldProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
  isDisabled: boolean;
}

export function TextareaField({
  question,
  value,
  onChange,
  isDisabled,
}: TextareaFieldProps) {
  const { i18n } = useTranslation("graduate");
  const lang = i18n.language;
  const activeSolidBlue = "bg-[#2F80ED]";
  const isAnswered = value && value.length > 0;

  return (
    <div className="relative group mt-2 max-w-4xl">
      <div
        className={`absolute left-4 top-3.5 ${
          isDisabled ? "text-gray-300" : "text-gray-400"
        }`}
      >
        <FileSearch size={18} />
      </div>
      <div
        className={`rounded-xl p-px transition-all duration-200 ${
          isDisabled
            ? "bg-gray-200"
            : isAnswered
            ? "bg-transparent"
            : "bg-gray-200 hover:bg-linear-to-r hover:from-[#267FD8] hover:to-[#2994FF]"
        }`}
      >
        <div className="relative rounded-[calc(0.75rem-1px)] bg-white overflow-hidden">
          <textarea
            rows={4}
            disabled={isDisabled}
            placeholder={
              question.placeholder
                ? getLocalizedText(question.placeholder, lang)
                : ""
            }
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full pl-12 pr-4 py-3 outline-none transition-all resize-none text-sm md:text-base ${
              isDisabled
                ? "bg-gray-100 text-gray-400"
                : isAnswered
                ? `${activeSolidBlue} text-white placeholder:text-white/60`
                : "bg-white text-gray-700 placeholder:text-gray-400"
            }`}
          />
        </div>
      </div>
      <div className="text-right text-[10px] md:text-xs text-gray-400 mt-2">
        {(value || "").length}/255
      </div>
    </div>
  );
}
