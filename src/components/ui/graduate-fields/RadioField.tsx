
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
        
        // Check if this option is "other"
        const isOtherOption = optValue === "other";
        
        // Check if selected:
        // 1. Exact match
        // 2. OR it is the "other" option AND the current value starts with "other:"
        const isSelected = 
          value === optValue || 
          (isOtherOption && typeof value === "string" && value.startsWith("other:"));

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
              <div
                className={`flex flex-col rounded-[calc(0.75rem-1px)] h-full overflow-hidden ${
                   isDisabled
                    ? "bg-gray-100"
                    : isSelected
                    ? `${activeSolidBlue}` // Base background for selected
                    : "bg-white"
                }`}
              >
                  <label
                    className={`flex items-start md:items-center gap-4 p-4 cursor-pointer transition-all h-full ${
                      isDisabled
                        ? "text-gray-400 cursor-not-allowed"
                        : isSelected
                        ? "text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => {
                        if (!isDisabled && !isSelected) {
                            onChange(optValue);
                        }
                    }}
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

            {/* ✅ Input Field for "Other" - Moved Outside and Styled */}
            {isOtherOption && isSelected && (
                <div className="flex items-center gap-4 mt-3 pl-2 md:pl-4 animate-in slide-in-from-top-2">
                    <span className="text-sm font-medium text-gray-700 shrink-0">
                        {lang === 'th' ? 'ระบุ :' : 'Specify :'}
                    </span>
                    <input
                    type="text"
                    autoFocus
                    disabled={isDisabled}
                    placeholder={lang === 'th' ? 'โปรดระบุ...' : 'Please specify...'}
                    className={`w-full md:max-w-md px-4 py-2.5 rounded-lg text-sm border outline-none transition-all ${
                        isDisabled 
                        ? "bg-gray-100 border-gray-200 text-gray-500 placeholder:text-gray-400"
                        : "bg-white border-gray-300 text-gray-700 placeholder:text-gray-400 focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20"
                    }`}
                    value={typeof value === 'string' && value.startsWith('other:') ? value.substring(6) : ''}
                    onChange={(e) => {
                        const newVal = e.target.value;
                        onChange(`other:${newVal}`);
                    }}
                    />
                </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
