// src/components/graduate/questionnaire/parts/Part5Suggestions.tsx
"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Question,
  questionPart5,
  QuestionOption,
  section1Structure,
  LocalizedText,
} from "@/data/questionnaireMock";
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
  Check,
  ChevronDown,
} from "lucide-react";

import GraduationCapGif from "@/assets/GraduationCap.gif";

interface Part5Props {
  answers: Record<string, any>;
  onAnswer: (id: number, value: any) => void;
  onNextPart: (nextPart: number) => void;
  onBackPart: () => void;
  onProgressChange: (percent: number) => void;
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

const ratingEmojis = ["😭", "☹️", "😐", "😁", "🤩"];

export function Part5Suggestions({
  answers,
  onAnswer,
  onNextPart,
  onBackPart,
  onProgressChange,
}: Part5Props) {
  const topRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
      // ใช้ setTimeout เพื่อให้แน่ใจว่า DOM ถูก Render เรียบร้อยแล้ว
      setTimeout(() => {
        // 1. Force Scroll ที่ Window ก่อน
        window.scrollTo({ top: 0, behavior: "smooth" });
        
        // 2. ถ้ามี Ref ให้ Scroll ไปที่ Ref
        if (topRef.current) {
          topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50);
  };
  const { t, i18n } = useTranslation("graduate");
  
  // Helper to get text based on current language
  const getLocalizedText = (text: LocalizedText) => text[i18n.language as 'th' | 'en'] || text.th;
  
  // ✅ ดึงข้อมูล Structure ของ Part 5 (Index 4) มาใช้
  const partInfo = section1Structure[4];

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [hoverRating, setHoverRating] = useState<{
    qId: number;
    val: number;
  } | null>(null);

  const currentQuestions = useMemo(() => {
    return questionPart5.filter((q) => q.page === currentPage);
  }, [currentPage]);

  const isQuestionAnswered = useCallback(
    (q: Question) => {
      const ans = answers[q.id];
      if (Array.isArray(ans)) return ans.length > 0;
      return ans !== undefined && ans !== "";
    },
    [answers],
  );

  const isPartComplete = useMemo(
    () => questionPart5.every((q) => isQuestionAnswered(q)),
    [answers, isQuestionAnswered],
  );

  const isCurrentPageComplete = useMemo(
    () => currentQuestions.every((q) => isQuestionAnswered(q)),
    [currentQuestions, isQuestionAnswered],
  );

  const currentProgress = useMemo(() => {
    const totalQuestions = questionPart5.length;
    const answeredCount = questionPart5.filter((q) =>
      isQuestionAnswered(q),
    ).length;
    return Math.round((answeredCount / totalQuestions) * 100);
  }, [answers, isQuestionAnswered]);

  useEffect(() => {
    onProgressChange(currentProgress);
  }, [currentProgress, onProgressChange]);

  const displayProgress = isPartComplete ? 100 : currentProgress;

  const activeSolidBlue = "bg-[#2F80ED]";
  const questionBoxAnsweredBg = "bg-[#EAF4FF]";
  const inProgressGradient = "from-[#33CCCC] via-[#85EDFD] to-[#2994FF]";
  const completeGradient = "from-[#2995FD] via-[#5CE1E6] to-[#2995FD]";

  const handleNext = () => {
    if (!isCurrentPageComplete) return;

    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      scrollToTop();
    } else {
      setShowSuccessModal(true);
    }
  };

  const handleConfirmNext = () => {
    setShowSuccessModal(false);
    onNextPart(6);
  };

  const handleBack = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      scrollToTop();
    } else {
      onBackPart();
    }
  };

  const toggleCheckbox = (questionId: number, value: string) => {
    const currentSelected: string[] = answers[questionId] || [];
    if (currentSelected.includes(value)) {
      onAnswer(
        questionId,
        currentSelected.filter((item) => item !== value),
      );
    } else {
      onAnswer(questionId, [...currentSelected, value]);
    }
  };

  return (
    <div ref={topRef} className="flex flex-col gap-4 md:gap-6 animate-in fade-in duration-300 font-['Prompt'] relative w-full overflow-hidden">
      {/* --- Header Section --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative px-4 md:px-0">
        <div className="text-left">
          <span className="text-[#1890FF] text-xs md:text-sm font-medium">
            {t('questionnaire.section_title')}
          </span>
          {/* ✅ ใช้ Label จาก Mock Data แทน Text Hardcode */}
          <h1 className="text-[#1890FF] text-2xl md:text-3xl font-bold mt-1 leading-tight">
            {getLocalizedText(partInfo.label)}
          </h1>
        </div>

        <div className="relative mt-2 lg:mt-0 self-start lg:self-center shrink-0">
          {isPartComplete ? (
            <div className="relative group overflow-hidden rounded-full min-w-27.5 md:min-w-35 h-8 md:h-8.5 flex items-center justify-center">
              <div
                className={`absolute inset-0 bg-linear-to-r ${completeGradient} animate-shimmer-ltr`}
              />
              <span className="relative z-10 text-xs md:text-sm text-white pt-1 font-bold">
                {t('questionnaire.alerts.complete')}
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
                  {t('questionnaire.alerts.in_progress')}
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

      {/* --- Progress Bar --- */}
      <div className="px-4 md:px-0">
        <div className="w-full bg-gray-100 h-2 md:h-2.5 rounded-full overflow-hidden mb-2">
          <div
            className="bg-[#1890FF] h-full shadow-sm transition-all duration-500 ease-out"
            style={{ width: `${displayProgress}%` }}
          />
        </div>
      </div>

      {/* --- Questions List --- */}
      <div className="flex flex-col gap-6 md:gap-8 w-full">
        {currentQuestions.map((q) => {
          const question = q;
          const answered = isQuestionAnswered(q);
          const isDisabled = (question as any).disabledCondition 
            ? answers[(question as any).disabledCondition.questionId] === (question as any).disabledCondition.value 
            : false;

          return (
            <div
              key={q.id}
              className={`relative rounded-none md:rounded-3xl p-0 md:p-0.5 transition-all duration-300 ${
                answered
                  ? "bg-transparent"
                  : "md:bg-gray-100 md:hover:bg-linear-to-r md:hover:from-[#267FD8] md:hover:to-[#2994FF]"
              }`}
            >
              <div
                className={`relative rounded-none md:rounded-[calc(1.5rem-2px)] p-6 md:p-10 h-full transition-colors duration-300 ${
                  answered ? questionBoxAnsweredBg : "bg-white"
                }`}
              >
                <div className="mb-6">
                  <span className="text-[#1890FF] text-xs md:text-sm font-bold block mb-1">
                    ข้อที่ {q.id}
                  </span>
                  <h3 className="text-[#18305D] font-medium text-base md:text-xl leading-snug max-w-4xl">
                    {getLocalizedText(q.label)}
                  </h3>
                </div>

                {/* --- Dropdown Logic --- */}
                {question.type === "dropdown" && (
                  <div className="relative max-w-full md:max-w-2xl">
                    <div
                      className={`rounded-xl p-px transition-all duration-200 ${
                        isDisabled
                          ? "bg-gray-200"
                          : answers[question.id]
                            ? "bg-transparent"
                            : "bg-gray-200 hover:bg-linear-to-r hover:from-[#267FD8] hover:to-[#2994FF]"
                      }`}
                    >
                      <div className="relative rounded-[calc(0.75rem-1px)] bg-white overflow-hidden">
                        <select
                          disabled={isDisabled}
                          className={`w-full px-4 py-3 border-none outline-none appearance-none cursor-pointer ${
                            isDisabled
                              ? "bg-gray-100"
                              : answers[question.id]
                                ? "bg-[#2F80ED] text-white"
                                : "text-gray-700"
                          }`}
                          value={answers[question.id] || ""}
                          onChange={(e) =>
                            onAnswer(question.id, e.target.value)
                          }
                        >
                          <option value="" disabled className="text-gray-400">
                            {question.placeholder ? getLocalizedText(question.placeholder) : ''}
                          </option>
                          {question.options?.map((opt: any) => (
                            <option
                              key={typeof opt === "string" ? opt : opt.value}
                              value={typeof opt === "string" ? opt : opt.value}
                              className="text-gray-700 bg-white"
                            >
                              {typeof opt === "string" ? opt : getLocalizedText(opt.label)}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${
                            isDisabled
                              ? "text-gray-300"
                              : answers[question.id]
                                ? "text-white"
                                : "text-gray-400"
                          }`}
                          size={20}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* --- Radio Logic --- */}
                {question.type === "radio" && (
                  <div
                    className={`grid gap-4 ${
                      question.options && question.options.length > 3
                        ? "grid-cols-1"
                        : "grid-cols-1 md:grid-cols-2"
                    }`}
                  >
                    {question.options?.map((opt: any, idx: number) => {
                      const label = typeof opt === "string" ? opt : opt.label;
                      const val = typeof opt === "string" ? opt : opt.value;
                      const isSelected = answers[question.id] === val;
                      return (
                        <div
                          key={idx}
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
                                ? "bg-gray-100"
                                : isSelected
                                  ? "bg-[#2F80ED] text-white shadow-md"
                                  : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                            onClick={() =>
                              !isDisabled && onAnswer(question.id, val)
                            }
                          >
                            <div
                              className={`mt-1 md:mt-0 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                isSelected ? "border-white" : "border-gray-300"
                              }`}
                            >
                              {isSelected && (
                                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                              )}
                            </div>
                            <span className="text-sm md:text-base font-medium leading-snug">
                              {typeof label === "object" ? getLocalizedText(label) : String(label)}
                            </span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* --- Address Group Logic --- */}
                {(question.type === "address_group" ||
                  (question.subFields && question.subFields.length > 0)) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    {question.subFields?.map((field: any, idx: number) => {
                      const groupData = answers[question.id] || {};
                      const val = groupData[field.name] || "";
                      const isFilled = val.toString().trim() !== "";
                      return (
                        <div
                          key={idx}
                          className={
                            field.size === "full"
                              ? "col-span-full"
                              : "col-span-1"
                          }
                        >
                          {field.label && (
                            <label className="block text-sm font-medium mb-2 text-[#18305D]">
                              {getLocalizedText(field.label)}
                            </label>
                          )}
                          <div
                            className={`rounded-xl p-px transition-all duration-200 ${
                              isDisabled
                                ? "bg-gray-200"
                                : isFilled
                                  ? "bg-transparent"
                                  : "bg-gray-200 hover:bg-linear-to-r hover:from-[#267FD8] hover:to-[#2994FF]"
                            }`}
                          >
                            <div className="relative rounded-[calc(0.75rem-1px)] bg-white overflow-hidden">
                              <input
                                type="text"
                                disabled={isDisabled}
                                className={`w-full px-4 py-3 border-none outline-none transition-all ${
                                  isDisabled
                                    ? "bg-gray-100"
                                    : isFilled
                                      ? "bg-[#2F80ED] text-white placeholder:text-white/60"
                                      : "bg-white text-gray-700 placeholder:text-gray-300"
                                }`}
                                placeholder={field.placeholder ? getLocalizedText(field.placeholder) : ''}
                                value={val}
                                onChange={(e) =>
                                  onAnswer(question.id, {
                                    ...groupData,
                                    [field.name]: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* --- Rating Logic --- */}
                {q.type === "rating" && (
                  <div className="flex flex-col items-center py-4 overflow-x-auto">
                    <div className="flex justify-between w-full max-w-3xl min-w-75 px-2 md:px-10 gap-2">
                      {[1, 2, 3, 4, 5].map((score, index) => {
                        const isSelected = answers[q.id] === score;
                        const isHovered =
                          hoverRating?.qId === q.id &&
                          hoverRating?.val === score;
                        const showEmoji = isSelected || isHovered;

                        return (
                          <div
                            key={score}
                            className="flex flex-col items-center gap-3 w-16 lg:w-24 shrink-0"
                          >
                            <button
                              type="button"
                              onClick={() => onAnswer(q.id, score)}
                              onMouseEnter={() =>
                                setHoverRating({ qId: q.id, val: score })
                              }
                              onMouseLeave={() => setHoverRating(null)}
                              className={`relative w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center text-2xl transition-all duration-300 ease-out ${
                                isSelected
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
                                isSelected
                                  ? "text-[#1890FF] font-semibold"
                                  : "text-gray-400"
                              }`}
                            >
                              {(q.options as QuestionOption[])?.[index] ? getLocalizedText((q.options as QuestionOption[])[index].label) : ""}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* --- Checkbox Logic (Responsive Grid) --- */}
                {q.type === "checkbox" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 mt-2">
                    {(q.options as QuestionOption[])?.map((option) => {
                      const isSelected = (answers[q.id] || []).includes(
                        option.value,
                      );
                      const IconComponent = option.icon
                        ? iconMap[option.icon]
                        : null;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => toggleCheckbox(q.id, option.value)}
                          className={`relative flex items-center gap-3 px-4 py-4 rounded-xl border transition-all duration-200 text-left group ${
                            isSelected
                              ? "bg-[#1890FF] border-[#1890FF] text-white shadow-md"
                              : "bg-white border-gray-200 text-gray-600 hover:border-[#1890FF] hover:bg-gray-50"
                          }`}
                        >
                          <div
                            className={`w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
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
                            {getLocalizedText(option.label)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* --- Textarea Logic --- */}
                {q.type === "textarea" && (
                  <div className="relative group mt-2 max-w-4xl">
                    <div className="absolute left-4 top-3.5 text-gray-400">
                      <FileSearch size={18} />
                    </div>
                    <div
                      className={`rounded-xl p-px transition-all duration-200 ${
                        answered ? "bg-transparent" : "bg-gray-200"
                      }`}
                    >
                      <div className="relative rounded-[calc(0.75rem-1px)] bg-white overflow-hidden">
                        <textarea
                          rows={4}
                          placeholder={q.placeholder ? getLocalizedText(q.placeholder) : ''}
                          value={answers[q.id] || ""}
                          onChange={(e) => onAnswer(q.id, e.target.value)}
                          className={`w-full pl-12 pr-4 py-3 outline-none transition-all resize-none text-sm md:text-base ${
                            answered
                              ? `${activeSolidBlue} text-white placeholder:text-white/60`
                              : "bg-white text-gray-700 placeholder:text-gray-400"
                          }`}
                        />
                      </div>
                    </div>
                    <div className="text-right text-[10px] md:text-xs text-gray-400 mt-2">
                      {(answers[q.id] || "").length}/255
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* --- Footer Buttons --- */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 justify-end mt-8 pt-6 border-t border-gray-100 px-4 md:px-0">
        <button
          onClick={handleBack}
          className="w-full sm:w-auto px-10 py-3 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 bg-white transition-all"
        >
          {t('questionnaire.buttons.back')}
        </button>
        <button
          onClick={handleNext}
          disabled={!isCurrentPageComplete}
          className={`group relative overflow-hidden w-full sm:w-auto px-10 py-3 rounded-xl font-bold transition-all duration-300 ${
            isCurrentPageComplete
              ? `${activeSolidBlue} text-white shadow-lg shadow-blue-100`
              : "bg-[#E0E0E0] text-[#A0A0A0] cursor-not-allowed"
          }`}
        >
          <span className="relative z-10">
            {currentPage === totalPages ? t('questionnaire.buttons.save_section_1') : t('questionnaire.buttons.next')}
          </span>
          {isCurrentPageComplete && (
            <div className="absolute left-1/2 bottom-0 w-[250%] pt-[250%] bg-[#0041C4] rounded-full -translate-x-1/2 translate-y-full group-hover:translate-y-[10%] transition-transform duration-500 ease-in-out z-0 pointer-events-none"></div>
          )}
        </button>
      </div>

      {/* --- Success Modal --- */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-white rounded-3xl md:rounded-[2.5rem] p-8 md:p-12 w-full max-w-112.5 flex flex-col items-center shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-[#87D068] rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-50">
              <Check
                className="w-10 h-10 md:w-12 md:h-12 text-white"
                strokeWidth={4}
              />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 text-center leading-tight">
              {t('questionnaire.alerts.save_success_section_1')}
            </h3>
            <p className="text-gray-500 mb-8 text-base md:text-lg text-center">
              {t('questionnaire.buttons.continue_section_2')}
            </p>
            <button
              onClick={handleConfirmNext}
              className="w-full py-4 bg-[#1890FF] text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-100 hover:bg-blue-600 transition-all transform active:scale-95"
            >
              {t('questionnaire.buttons.next_part')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
