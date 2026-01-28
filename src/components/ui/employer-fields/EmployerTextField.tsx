"use client";

import { useTranslation } from "react-i18next";
import { Question } from "@/data/employerMock";
import { getLocalizedText } from "@/utils/i18nHelper";

interface FieldProps {
  question: Question;
  value: any;
  onAnswer: (id: number | string, value: any) => void;
}

export function EmployerTextField({ question: q, value, onAnswer }: FieldProps) {
  const { i18n } = useTranslation(["employer"]);
  const lang = i18n.language;

  const currentValue = value || "";
  const isFilled = currentValue !== "" && currentValue !== undefined && currentValue !== null;

  return (
    <div
      className={`rounded-xl border-2 transition-all duration-200 overflow-hidden ${
        isFilled ? "border-[#1890FF] bg-[#1890FF]" : "border-gray-200 bg-white"
      }`}
    >
      <input
        type={q.type}
        placeholder={getLocalizedText(q.placeholder, lang)}
        value={currentValue}
        onChange={(e) => onAnswer(q.id, e.target.value)}
        className={`w-full px-4 py-3.5 outline-none transition-all text-base bg-transparent ${
          isFilled ? "text-white placeholder:text-white/60" : "text-gray-700"
        }`}
      />
    </div>
  );
}
