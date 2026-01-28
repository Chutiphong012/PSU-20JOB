
"use client";

import { Question, QuestionOption } from "@/data/questionnaireMock";
import { getLocalizedText } from "@/utils/i18nHelper";
import { useTranslation } from "react-i18next";
import {
  Languages,
  MessageCircle,
  Globe,
  Calculator,
  Laptop,
  Wifi,
  Wrench,
  FileSearch,
  MoreHorizontal,
} from "lucide-react";

interface CheckboxFieldProps {
  question: Question;
  value: any; // expects array of strings
  onChange: (value: any) => void;
  isDisabled: boolean;
}

const iconMap: Record<string, any> = {
  languages: Languages,
  "message-circle": MessageCircle,
  globe: Globe,
  calculator: Calculator,
  laptop: Laptop,
  wifi: Wifi,
  wrench: Wrench,
  "file-search": FileSearch,
  "more-horizontal": MoreHorizontal,
};

export function CheckboxField({
  question,
  value,
  onChange,
  isDisabled,
}: CheckboxFieldProps) {
  const { i18n } = useTranslation("graduate");
  const lang = i18n.language;

  const toggleCheckbox = (optValue: string) => {
    const currentSelected: string[] = Array.isArray(value) ? value : [];
    if (currentSelected.includes(optValue)) {
      onChange(currentSelected.filter((item) => item !== optValue));
    } else {
      onChange([...currentSelected, optValue]);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
        {(question.options as QuestionOption[])?.map((option) => {
          // Check if selected (handle 'other' special case)
          const currentSelected = Array.isArray(value) ? value : [];
          const isOther = option.value === 'other';
          
          const isSelected = isOther 
            ? currentSelected.some((v: string) => v === 'other' || v.startsWith('other:'))
            : currentSelected.includes(option.value);

          const IconComponent = option.icon ? iconMap[option.icon] : null;
          const optLabel = getLocalizedText(option.label, lang);

          return (
            <button
              key={option.value}
              type="button"
              disabled={isDisabled}
              onClick={() => {
                  if (isDisabled) return;
                  if (isOther) {
                      // Toggle Other
                      if (isSelected) {
                          // Remove any "other..."
                          onChange(currentSelected.filter((v: string) => v !== 'other' && !v.startsWith('other:')));
                      } else {
                          // Add plain "other"
                          onChange([...currentSelected, 'other']);
                      }
                  } else {
                      toggleCheckbox(option.value);
                  }
              }}
              className={`relative flex items-center gap-3 px-4 py-4 rounded-xl border transition-all duration-200 text-left group ${
                isDisabled
                  ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                  : isSelected
                  ? "bg-[#1890FF] border-[#1890FF] text-white shadow-md"
                  : "bg-white border-gray-200 text-gray-600 hover:border-[#1890FF] hover:bg-gray-50"
              }`}
            >
              <div
                className={`w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isDisabled
                    ? "bg-gray-200 text-gray-400"
                    : isSelected
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-500 group-hover:bg-white group-hover:text-[#1890FF]"
                }`}
              >
                {IconComponent ? (
                  <IconComponent size={20} />
                ) : (
                  <div className="w-5 h-5 bg-gray-300 rounded-sm" />
                )}
              </div>
              <span className="text-sm font-medium leading-snug">
                {optLabel}
              </span>
            </button>
          );
        })}
      </div>

       {/* ✅ Input Field for "Other" in Checkbox */}
       {(() => {
           const currentSelected = Array.isArray(value) ? value : [];
           const otherValue = currentSelected.find((v: string) => v === 'other' || v.startsWith('other:'));
           
           if (otherValue) {
               return (
                <div className="flex items-center gap-4 mt-3 animate-in slide-in-from-top-2">
                    <span className="text-sm font-medium text-gray-700 shrink-0">
                        {lang === 'th' ? 'ระบุ :' : 'Specify :'}
                    </span>
                    <input
                        type="text"
                        autoFocus
                        disabled={isDisabled}
                        placeholder={lang === 'th' ? 'โปรดระบุ...' : 'Please specify...'}
                        className={`w-full md:w-1/2 px-4 py-3 rounded-xl border outline-none transition-all duration-200 ${
                            isDisabled 
                            ? "bg-gray-100 border-gray-200 text-gray-500"
                            : "bg-white border-gray-300 focus:border-[#1890FF] focus:ring-2 focus:ring-[#1890FF]/20"
                        }`}
                        value={otherValue.startsWith('other:') ? otherValue.substring(6) : ''}
                        onChange={(e) => {
                            const newVal = e.target.value;
                            const newOtherStr = `other:${newVal}`;
                            // Replace the existing other entry
                            const newArr = currentSelected.map((v: string) => 
                                (v === 'other' || v.startsWith('other:')) ? newOtherStr : v
                            );
                            onChange(newArr);
                        }}
                    />
                </div>
               );
           }
           return null;
       })()}
    </div>
  );
}
