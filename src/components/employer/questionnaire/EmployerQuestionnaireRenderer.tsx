"use client";

import { useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Question, SectionStructure } from "@/data/employerMock";
import { getLocalizedText } from "@/utils/i18nHelper";
import { useEmployerQuestionnaire } from "@/hooks/useEmployerQuestionnaire";
import { EmployerQuestionRenderer } from "./EmployerQuestionRenderer";

interface EmployerQuestionnaireRendererProps {
  partInfo: SectionStructure;
  questions: Question[];
  initialAnswers?: Record<string, any>;
  onComplete: (answers: Record<string, any>) => void;
  onBack: () => void;
  onProgressChange?: (percent: number) => void;
  onAnswerChange?: (id: string | number, value: any) => void;
  isLastPart?: boolean;
  startPage?: number;
}

export function EmployerQuestionnaireRenderer({
  partInfo,
  questions,
  initialAnswers = {},
  onComplete,
  onBack,
  onProgressChange,
  onAnswerChange,
  isLastPart = false,
  startPage,
}: EmployerQuestionnaireRendererProps) {
  const { t, i18n } = useTranslation("employer");
  const lang = i18n.language;

  const {
    answers,
    handleAnswer,
    currentQuestions,
    isCurrentPageComplete,
    isFirstPage,
    isLastPage,
    handleNextPage,
    handleBackPage,
  } = useEmployerQuestionnaire({
    questions,
    initialAnswers,
    onComplete,
    onProgressChange,
    onAnswerChange,
    startPage,
  });

  // Scroll to top when page changes
  const topRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    handleNextPage();
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const handleBack = () => {
    handleBackPage(onBack);
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  return (
    <div ref={topRef} className="flex flex-col h-full font-['Prompt']">
      {/* Questions Container */}
      <div className="flex-1 space-y-10 border border-gray-100 rounded-3xl p-6 md:p-10 bg-white shadow-sm">
        {currentQuestions.map((q, index) => {
          const questionNumber = questions.findIndex((item) => item.id === q.id) + 1;

          return (
            <div
              key={q.id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10 border-b border-gray-50 last:border-0 last:pb-0"
            >
              {/* Section Header */}
              {q.section &&
                (index === 0 ||
                  currentQuestions[index - 1].section !== q.section) && (
                  <div className="mb-8 mt-4">
                    <h2 className="text-[#2994FF] font-semibold text-lg md:text-xl uppercase tracking-wide">
                      {getLocalizedText(q.section, lang)}
                    </h2>
                  </div>
                )}

              {/* Question Label */}
              <div className="mb-6">
                <div className="mb-2">
                  <span className="text-xs md:text-sm text-gray-400 font-light">
                    {t("form.question_prefix")} {questionNumber}
                  </span>
                </div>
                <h3 className="font-semibold text-lg md:text-xl text-black leading-snug">
                  {getLocalizedText(q.label, lang)}{" "}
                  {q.required && <span className="text-red-500">*</span>}
                </h3>
              </div>

              {/* Question Input */}
              <EmployerQuestionRenderer
                question={q}
                answer={answers[q.id]}
                otherAnswer={answers[`${q.id}_other`]}
                onAnswer={handleAnswer}
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-100">
        <button
          onClick={handleBack}
          className="w-full sm:w-auto min-w-28 md:min-w-32 px-6 py-3 rounded-xl border border-gray-200 bg-white text-gray-500 font-medium text-sm md:text-base transition-transform duration-200 hover:border-gray-300 cursor-pointer active:scale-95"
        >
          {t("form.buttons.back")}
        </button>

        <button
          onClick={handleNext}
          disabled={!isCurrentPageComplete}
          className={`group w-full sm:w-auto flex items-center justify-center gap-2 min-w-30 md:min-w-40 px-8 py-3 rounded-xl font-medium text-sm md:text-base text-white transition-all duration-300 ${
            isCurrentPageComplete
              ? "bg-[#2994FF] hover:bg-[#2276CC] cursor-pointer hover:shadow-lg active:scale-95"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          <span>
            {isLastPart && isLastPage ? t("form.buttons.submit") : t("form.buttons.next")}
          </span>
          {!(isLastPart && isLastPage) && (
            <ChevronRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          )}
        </button>
      </div>
    </div>
  );
}
