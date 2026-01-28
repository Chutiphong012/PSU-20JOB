"use client";

import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { Question, QuestionOption } from "@/data/employerMock";
import { getLocalizedText } from "@/utils/i18nHelper";

interface FieldProps {
  question: Question;
  value: any;
  onAnswer: (id: number | string, value: any) => void;
}

export function EmployerSelectField({ question: q, value, onAnswer }: FieldProps) {
  const { t, i18n } = useTranslation(["employer"]);
  const lang = i18n.language;

  const currentValue = value || "";
  const isFilled = currentValue !== "" && currentValue !== undefined && currentValue !== null;

  return (
    <div
      className={`rounded-xl border-2 transition-all duration-200 overflow-hidden relative ${
        isFilled ? "border-[#1890FF] bg-[#1890FF]" : "border-gray-200 bg-white"
      }`}
    >
      <select
        value={currentValue}
        onChange={(e) => onAnswer(q.id, e.target.value)}
        className={`w-full appearance-none px-4 py-3.5 outline-none transition-all text-base cursor-pointer bg-transparent ${
          isFilled ? "text-white font-medium" : "text-gray-700"
        }`}
      >
        <option value="" disabled className="text-gray-400 bg-white">
          {getLocalizedText(q.placeholder, lang) || t("form.select_placeholder")}
        </option>
        {(q.options as (string | QuestionOption)[])?.map((opt, idx) => {
          const optLabel = typeof opt === "string" ? opt : getLocalizedText(opt.label, lang);
          const optValue = typeof opt === "string" ? opt : opt.value;
          return (
            <option key={idx} value={optValue} className="text-gray-700 bg-white">
              {optLabel}
            </option>
          );
        })}
      </select>
      <ChevronDown
        className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${
          isFilled ? "text-white" : "text-gray-400"
        }`}
        size={20}
      />
    </div>
  );
}
