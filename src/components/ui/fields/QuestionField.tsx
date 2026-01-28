
"use client";

import { ReactNode } from "react";
import { Question } from "@/data/questionnaireMock";
import { getLocalizedText } from "@/utils/i18nHelper";
import { useTranslation } from "react-i18next";

interface QuestionFieldProps {
  question: Question;
  children: ReactNode;
  isAnswered: boolean;
  isDisabled: boolean;
  error?: string;
  questionNumber?: number | string; // ✅ Optional Display Number
}

export function QuestionField({
  question,
  children,
  isAnswered,
  isDisabled,
  error,
  questionNumber,
}: QuestionFieldProps) {
  const { i18n } = useTranslation("graduate");
  const lang = i18n.language;

  // Common Styles
  const questionBoxAnsweredBg = "bg-[#EAF4FF]";

  return (
    <div
      id={`question-${question.id}`}
      className={`relative rounded-none md:rounded-3xl p-0 md:p-0.5 transition-all duration-300 ${
        isDisabled
          ? "grayscale opacity-60 pointer-events-none md:bg-gray-200"
          : isAnswered
          ? "bg-transparent"
          : "md:bg-gray-100 md:hover:bg-linear-to-r md:hover:from-[#267FD8] md:hover:to-[#2994FF]"
      }`}
    >
      <div
        className={`relative rounded-none md:rounded-[calc(1.5rem-2px)] p-6 md:p-10 h-full transition-colors duration-300 ${
          isDisabled
            ? "bg-gray-50 text-gray-400"
            : isAnswered
            ? questionBoxAnsweredBg
            : "bg-white"
        }`}
      >
        <div className="mb-6">
          <span
            className={`text-xs md:text-sm font-bold block mb-1 ${
              isDisabled ? "text-gray-400" : "text-[#1890FF]"
            }`}
          >
            ข้อที่ {questionNumber || question.id}
          </span>
          <h3
            className={`font-medium text-base md:text-xl leading-snug max-w-4xl ${
              isDisabled ? "text-gray-500" : "text-[#18305D]"
            }`}
          >
            {getLocalizedText(question.label, lang)}
          </h3>
        </div>

        {children}
        
        {error && (
            <div className="mt-2 text-red-500 text-sm font-medium animate-in slide-in-from-top-1">
              {error}
            </div>
        )}
      </div>
    </div>
  );
}
