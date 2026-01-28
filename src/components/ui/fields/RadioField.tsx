
"use client";

import { Question } from "@/data/questionnaireMock";
import { getLocalizedText } from "@/utils/i18nHelper";
import { useTranslation } from "react-i18next";

interface RadioFieldProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
  isDisabled: boolean;
}

export function RadioField({
  question,
  value,
  onChange,
  isDisabled,
}: RadioFieldProps) {
  const { i18n } = useTranslation("graduate");
  const lang = i18n.language;
  const activeSolidBlue = "bg-[#2F80ED]";

  // Determine grid layout based on options length
  const gridCols =
    question.options && question.options.length > 3
      ? "grid-cols-1"
      : "grid-cols-1 md:grid-cols-2";

  return (
    <div className={`grid gap-4 ${gridCols}`}>
      {question.options?.map((opt: any, idx: number) => {
        const optValue = typeof opt === "string" ? opt : opt.value;
        const optLabel = typeof opt === "string" ? opt : getLocalizedText(opt.label, lang);
        const isSelected = value === optValue;

        return (
          <div key={idx} className="flex flex-col transition-all duration-300">
            {/* ✅ Conditional Option Header (แสดงเมื่อเลือก) */}
            {isSelected && opt.header && (
              <span
                className={`text-sm md:text-base font-medium mb-2 animate-in fade-in slide-in-from-bottom-1 ${
                  opt.headerStyle || "text-[#1890FF]"
                }`}
              >
                {getLocalizedText(opt.header, lang)}
              </span>
            )}

            <div
              className={`rounded-xl p-px transition-all duration-200 ${
                isDisabled
                  ? "bg-gray-200"
                  : isSelected
                  ? "bg-transparent"
                  : "bg-gray-200 hover:bg-linear-to-r hover:from-[#267FD8] hover:to-[#2994FF]"
              }`}
            >
              <label
                className={`flex items-start md:items-center gap-4 p-4 cursor-pointer transition-all rounded-[calc(0.75rem-1px)] h-full ${
                  isDisabled
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : isSelected
                    ? `${activeSolidBlue} text-white shadow-md`
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => !isDisabled && onChange(optValue)}
              >
                <div
                  className={`mt-1 md:mt-0 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    isDisabled
                      ? "border-gray-300 bg-gray-50"
                      : isSelected
                      ? "border-white"
                      : "border-gray-300"
                  }`}
                >
                  {isSelected && !isDisabled && (
                    <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-sm md:text-base font-medium leading-snug">
                  {optLabel}
                </span>
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
}
