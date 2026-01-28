
"use client";

import { useState } from "react";
import { Question, QuestionOption } from "@/data/questionnaireMock";
import { getLocalizedText } from "@/utils/i18nHelper";
import { useTranslation } from "react-i18next";

interface RatingFieldProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
  isDisabled: boolean;
}

const ratingEmojis = ["😭", "☹️", "😐", "😁", "🤩"];

export function RatingField({
  question,
  value,
  onChange,
  isDisabled,
}: RatingFieldProps) {
  const { i18n } = useTranslation("graduate");
  const lang = i18n.language;
  const [hoverVal, setHoverVal] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center py-4 overflow-x-auto">
      <div className="flex justify-between w-full max-w-3xl min-w-[300px] px-2 md:px-10 gap-2">
        {[1, 2, 3, 4, 5].map((score, index) => {
          const isSelected = value === score || value === String(score);
          const isHovered = hoverVal === score;
          const showEmoji = isSelected || isHovered;

          // Safely access option label if available
          const optionLabel = (question.options as QuestionOption[])?.[index]
            ? getLocalizedText((question.options as QuestionOption[])[index].label, lang)
            : "";

          return (
            <div
              key={score}
              className="flex flex-col items-center gap-3 w-16 lg:w-24 shrink-0"
            >
              <button
                type="button"
                onClick={() => !isDisabled && onChange(score)}
                onMouseEnter={() => setHoverVal(score)}
                onMouseLeave={() => setHoverVal(null)}
                disabled={isDisabled}
                className={`relative w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center text-2xl transition-all duration-300 ease-out ${
                  isDisabled
                    ? "border-gray-300 bg-gray-50 opacity-50 cursor-not-allowed"
                    : isSelected
                    ? "border-[#1890FF] bg-blue-50 shadow-md scale-110"
                    : "border-gray-200 bg-white hover:border-[#1890FF] hover:shadow-md"
                }`}
              >
                <span
                  className={`absolute transition-opacity duration-200 ${
                    showEmoji ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {ratingEmojis[index]}
                </span>
                <span
                  className={`absolute font-semibold text-gray-500 text-sm md:text-base transition-opacity duration-200 ${
                    showEmoji ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {score}
                </span>
                {isSelected && (
                  <div className="absolute -bottom-2 w-2 h-2 bg-[#1890FF] rounded-full" />
                )}
              </button>
              <span
                className={`text-[10px] md:text-xs text-center leading-tight transition-colors h-8 flex items-center ${
                  isSelected ? "text-[#1890FF] font-semibold" : "text-gray-400"
                }`}
              >
                {optionLabel}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
