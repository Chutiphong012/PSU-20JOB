
"use client";

import { Question } from "@/data/questionnaireMock";
import { getLocalizedText } from "@/utils/i18nHelper";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SelectFieldProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
  isDisabled: boolean;
}

export function SelectField({
  question,
  value,
  onChange,
  isDisabled,
}: SelectFieldProps) {
  const { i18n } = useTranslation("graduate");
  const lang = i18n.language;
  const activeSolidBlue = "bg-[#2F80ED]";

  return (
    <div className="relative max-w-full md:max-w-2xl">
      <div
        className={`rounded-xl p-px transition-all duration-200 ${
          isDisabled
            ? "bg-gray-200"
            : value
            ? "bg-transparent"
            : "bg-gray-200 hover:bg-linear-to-r hover:from-[#267FD8] hover:to-[#2994FF]"
        }`}
      >
        <div className="relative rounded-[calc(0.75rem-1px)] bg-white overflow-hidden">
          <select
            disabled={isDisabled}
            className={`w-full px-4 py-3 border-none outline-none appearance-none cursor-pointer text-sm md:text-base transition-all ${
              isDisabled
                ? "bg-gray-100 text-gray-400"
                : value
                ? `${activeSolidBlue} text-white font-medium`
                : "text-gray-700 bg-white"
            }`}
             // ✅ Fix: Check if value is "other:..." -> bind select to "other"
            value={(typeof value === 'string' && value.startsWith('other:')) ? 'other' : (value || "")}
            onChange={(e) => {
                const val = e.target.value;
                if (val === 'other') {
                    // Start with just "other" if newly selected
                    onChange('other');
                } else {
                    onChange(val);
                }
            }}
          >
            <option value="" disabled className="text-gray-400">
              {question.placeholder ? getLocalizedText(question.placeholder, lang) : ""}
            </option>
            {question.options?.map((opt: any) => {
              const optValue = typeof opt === "string" ? opt : opt.value;
              const optLabel = typeof opt === "string" ? opt : getLocalizedText(opt.label, lang);
              return (
                <option
                  key={optValue}
                  value={optValue}
                  className="text-gray-700 bg-white"
                >
                  {optLabel}
                </option>
              );
            })}
          </select>
          <ChevronDown
            className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${
              isDisabled
                ? "text-gray-300"
                : value
                ? "text-white"
                : "text-gray-400"
            }`}
            size={20}
          />
        </div>
      </div>
       {/* ✅ Input Field for "Other" in Select */}
      {(value === 'other' || (typeof value === 'string' && value.startsWith('other:'))) && (
        <div className="mt-3 flex items-center gap-4 animate-in slide-in-from-top-2">
            <span className="text-sm font-medium text-gray-700 shrink-0">
                {lang === 'th' ? 'ระบุ :' : 'Specify :'}
            </span>
            <input
            type="text"
            autoFocus
            disabled={isDisabled}
            placeholder={lang === 'th' ? 'โปรดระบุ...' : 'Please specify...'}
            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 ${
                isDisabled 
                ? "bg-gray-100 border-gray-200 text-gray-500"
                : "bg-white border-gray-300 focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20"
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
}
