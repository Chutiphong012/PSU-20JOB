
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { SectionStructure, Question } from "@/data/questionnaireMock";
import { getLocalizedText } from "@/utils/i18nHelper";
import { useQuestionnaire } from "@/hooks/useQuestionnaire";
import GraduationCapGif from "@/assets/GraduationCap.gif";

// Fields
import { QuestionField } from "@/components/ui/graduate-fields/QuestionField";
import { SelectField } from "@/components/ui/graduate-fields/SelectField";
import { RadioField } from "@/components/ui/graduate-fields/RadioField";
import { RatingField } from "@/components/ui/graduate-fields/RatingField";
import { CheckboxField } from "@/components/ui/graduate-fields/CheckboxField";
import { TextareaField } from "@/components/ui/graduate-fields/TextareaField";
import { AddressGroupField } from "@/components/ui/graduate-fields/AddressGroupField";

interface QuestionnaireRendererProps {
  partInfo: SectionStructure;
  questions: Question[];
  initialAnswers?: Record<string, any>;
  onComplete: (answers: Record<string, any>) => void;
  onBack: () => void;
  onProgressChange?: (percent: number) => void;
  onAnswerChange?: (id: string | number, value: any) => void;
  saveButtonLabel?: string;
  showSuccessModal?: boolean;
  onSuccessModalConfirm?: () => void;
  preTitle?: string;
}

export function QuestionnaireRenderer({
  partInfo,
  questions,
  initialAnswers = {},
  onComplete,
  onBack,
  onProgressChange,
  onAnswerChange, // ✅
  saveButtonLabel,
  showSuccessModal = false,
  onSuccessModalConfirm,
  preTitle,
}: QuestionnaireRendererProps) {
  const { t, i18n } = useTranslation("graduate");
  const lang = i18n.language;

  const {
    answers,
    handleAnswer,
    handleNextPage,
    handleBackPage,
    currentPage,
    totalPages,
    currentQuestions,
    isCurrentPageComplete,
    progress,
    isQuestionDisabled,
    isQuestionAnswered,
  } = useQuestionnaire({
    questions,
    initialAnswers,
    onComplete,
    onProgressChange,
  });

  // Styles
  const activeSolidBlue = "bg-[#2F80ED]";
  const inProgressGradient = "from-[#33CCCC] via-[#85EDFD] to-[#2994FF]";
  const completeGradient = "from-[#2995FD] via-[#5CE1E6] to-[#2995FD]";

  // Handle Back Logic
  const handleBackClick = () => {
    handleBackPage(onBack);
  };

  // Scroll to top of form when page changes
  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (topRef.current) {
        // Scroll with offset if needed, or just plain scrollIntoView
        topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]);

  return (
    <div ref={topRef} className="flex flex-col gap-4 md:gap-6 animate-in fade-in duration-300 font-['Prompt'] relative w-full overflow-hidden">
      {/* --- Header Section --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative px-4 md:px-0">
        <div className="text-left">
          <span className="text-[#1890FF] text-xs md:text-sm font-medium">
            {preTitle || t("questionnaire.section_title")}
          </span>
          <h1 className="text-[#1890FF] text-2xl md:text-3xl font-bold mt-1 leading-tight">
            {getLocalizedText(partInfo.label, lang)}
          </h1>
          {partInfo.subLabel && (
             <p className="text-gray-500 text-sm mt-1">{getLocalizedText(partInfo.subLabel, lang)}</p>
          )}
        </div>

        <div className="relative mt-2 lg:mt-0 self-start lg:self-center shrink-0">
          {progress === 100 ? (
            <div className="relative group overflow-hidden rounded-full min-w-27.5 md:min-w-35 h-8 md:h-8.5 flex items-center justify-center">
              <div
                className={`absolute inset-0 bg-linear-to-r ${completeGradient} animate-shimmer-ltr`}
              />
              <span className="relative z-10 text-xs md:text-sm text-white pt-1 font-bold">
                {t("questionnaire.alerts.complete")}
              </span>
            </div>
          ) : (
            <div className="relative group h-8 md:h-8.5 min-w-27.5 md:min-w-35 flex items-center justify-center">
              <div
                className={`absolute inset-0 rounded-full bg-linear-to-r ${inProgressGradient} animate-shimmer-ltr p-[1.5px]`}
              >
                <div className="h-full w-full bg-white rounded-full"></div>
              </div>
              <div className="relative flex items-center justify-center px-4 md:px-8 overflow-hidden h-full">
                <span
                  className={`text-xs md:text-sm font-bold bg-linear-to-r ${inProgressGradient} bg-clip-text text-transparent pt-1 animate-shimmer-ltr relative z-10`}
                >
                  {t("questionnaire.alerts.in_progress")}
                </span>
              </div>
              <div className="absolute -top-4 md:-top-5 left-1/2 -translate-x-1/2 bg-white px-1 z-20">
                <Image
                  src={GraduationCapGif}
                  alt="GradCap"
                  width={24}
                  height={24}
                  className="animate-rock md:w-7 md:h-7"
                  unoptimized
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- Questions Render --- */}
      <div className="flex flex-col gap-6 md:gap-8 w-full">
        {currentQuestions.map((q, index) => {
          const isVisible =
            !q.condition ||
            answers[q.condition.questionId] === q.condition.value;

          if (!isVisible) return null;

          return (
            <div
              key={q.id}
              className={`animate-in fade-in slide-in-from-bottom-2 duration-500 delay-[${
                index * 50
              }ms] ${q.colSpan === 2 ? "col-span-1 md:col-span-2" : "col-span-1"}`}
            >
              {q.header && (
                <h3 className="text-lg md:text-xl font-semibold text-[#002D55] mt-6 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                  {getLocalizedText(q.header, lang)}
                </h3>
              )}

              <QuestionField
                question={q}
                questionNumber={index + 1}
                isDisabled={isQuestionDisabled(q)}
                isAnswered={isQuestionAnswered(q)}
                error={
                    isCurrentPageComplete &&
                    q.required &&
                    !isQuestionAnswered(q)
                      ? t("required_field")
                      : undefined
                  }
              >
                 {q.type === "dropdown" && (
                <SelectField
                  question={q}
                  value={answers[q.id]}
                  onChange={(val) => {
                      handleAnswer(q.id, val);
                      onAnswerChange?.(q.id, val);
                  }}
                  isDisabled={isQuestionDisabled(q)}
                />
              )}
              {q.type === "radio" && (
                <RadioField
                  question={q}
                  value={answers[q.id]}
                  onChange={(val) => {
                      handleAnswer(q.id, val);
                      onAnswerChange?.(q.id, val);
                  }}
                  isDisabled={isQuestionDisabled(q)}
                />
              )}
              {q.type === "rating" && (
                <RatingField
                  question={q}
                  value={answers[q.id]}
                  onChange={(val) => {
                      handleAnswer(q.id, val);
                      onAnswerChange?.(q.id, val);
                  }}
                  isDisabled={isQuestionDisabled(q)}
                />
              )}
              {q.type === "checkbox" && (
                <CheckboxField
                  question={q}
                  value={answers[q.id]}
                  onChange={(val) => {
                      handleAnswer(q.id, val);
                      onAnswerChange?.(q.id, val);
                  }}
                  isDisabled={isQuestionDisabled(q)}
                />
              )}
              {q.type === "textarea" && (
                <TextareaField
                  question={q}
                  value={answers[q.id]}
                  onChange={(val) => {
                      handleAnswer(q.id, val);
                      onAnswerChange?.(q.id, val);
                  }}
                  isDisabled={isQuestionDisabled(q)}
                />
              )}
              {(q.type === "address_group" ||
                (q.subFields && q.subFields.length > 0)) && (
                <AddressGroupField
                  question={q}
                  value={answers[q.id]}
                  onChange={(val) => {
                      handleAnswer(q.id, val);
                      onAnswerChange?.(q.id, val);
                  }}
                  isDisabled={isQuestionDisabled(q)}
                />
              )}
              </QuestionField>
            </div>
          );
        })}
      </div>

      {/* --- Footer Buttons --- */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 justify-end mt-8 pt-6 border-t border-gray-100 px-4 md:px-0">
        <button
          onClick={handleBackClick}
          className="w-full sm:w-auto px-10 py-3 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 bg-white transition-all"
        >
          {t("questionnaire.buttons.back")}
        </button>
        <button
          onClick={handleNextPage}
          disabled={!isCurrentPageComplete}
          className={`group relative overflow-hidden w-full sm:w-auto px-10 py-3 rounded-xl font-bold transition-all duration-300 ${
            isCurrentPageComplete
              ? `${activeSolidBlue} text-white shadow-lg shadow-blue-100`
              : "bg-[#E0E0E0] text-[#A0A0A0] cursor-not-allowed"
          }`}
        >
          <span className="relative z-10">
            {currentPage === totalPages
              ? saveButtonLabel || t("questionnaire.buttons.next")
              : t("questionnaire.buttons.next")}
          </span>
          {isCurrentPageComplete && (
            <div className="absolute left-1/2 bottom-0 w-[250%] pt-[250%] bg-[#0041C4] rounded-full -translate-x-1/2 translate-y-full group-hover:translate-y-[10%] transition-transform duration-500 ease-in-out z-0 pointer-events-none"></div>
          )}
        </button>
      </div>

      {/* --- Success Modal (Optional) --- */}
      {showSuccessModal && onSuccessModalConfirm && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-white rounded-3xl md:rounded-[2.5rem] p-8 md:p-12 w-full max-w-112.5 flex flex-col items-center shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-[#87D068] rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-50">
              <Check
                className="w-10 h-10 md:w-12 md:h-12 text-white"
                strokeWidth={4}
              />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 text-center leading-tight">
              {t("questionnaire.alerts.save_success_section_1")}
            </h3>
            <p className="text-gray-500 mb-8 text-base md:text-lg text-center">
              {t("questionnaire.buttons.continue_section_2")}
            </p>
            <button
              onClick={onSuccessModalConfirm}
              className="w-full py-4 bg-[#1890FF] text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-100 hover:bg-blue-600 transition-all transform active:scale-95"
            >
              {t("questionnaire.buttons.next_part")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
