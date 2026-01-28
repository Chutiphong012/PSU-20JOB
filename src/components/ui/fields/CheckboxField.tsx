
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 mt-2">
      {(question.options as QuestionOption[])?.map((option) => {
        const isSelected = (Array.isArray(value) ? value : []).includes(option.value);
        const IconComponent = option.icon ? iconMap[option.icon] : null;
        const optLabel = getLocalizedText(option.label, lang);

        return (
          <button
            key={option.value}
            type="button"
            disabled={isDisabled}
            onClick={() => !isDisabled && toggleCheckbox(option.value)}
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
  );
}
