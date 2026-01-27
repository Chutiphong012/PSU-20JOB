// src/components/graduate/questionnaire/parts/Part3SearchJob.tsx
"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { ChevronDown, Languages, MessageCircle, Globe, Calculator, Laptop, Wifi, Wrench, FileSearch, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { questionPart3, section1Structure, LocalizedText, QuestionOption } from "@/data/questionnaireMock";
import GraduationCapGif from "@/assets/GraduationCap.gif";
import { useTranslation } from "react-i18next";


interface Part3Props {
  answers: Record<string, any>;
  onAnswer: (id: number, value: any) => void;
  onNextPart: (nextPart: number) => void;
  onBackPart: () => void;
  onProgressChange?: (percent: number) => void;
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

export function Part3SearchJob({
  answers,
  onAnswer,
  onNextPart,
  onBackPart,
  onProgressChange,
}: Part3Props) {
  const { t, i18n } = useTranslation("graduate");
  
  // Helper to get text based on current language
  const getLocalizedText = (text: LocalizedText) => text[i18n.language as 'th' | 'en'] || text.th;
  
  // ✅ ดึงข้อมูล Structure ของ Part 3 (Index 2) มาใช้
  const partInfo = section1Structure[2];

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [hoverRating, setHoverRating] = useState<{
    qId: number;
    val: number;
  } | null>(null);

  const uniquePages = useMemo(
    () =>
      Array.from(new Set(questionPart3.map((q) => q.page))).sort(
        (a, b) => a - b,
      ),
    [],
  );
  const currentPageNumber = uniquePages[currentPageIndex];
  const currentQuestions = useMemo(
    () => questionPart3.filter((q) => q.page === currentPageNumber),
    [currentPageNumber],
  );
  const isLastPage = currentPageIndex === uniquePages.length - 1;

  const isQuestionDisabled = useCallback(
    (question: any) => {
      if (!question.disabledCondition) return false;
      const { questionId, value } = question.disabledCondition;
      return answers[questionId] === value;
    },
    [answers],
  );

  const isQuestionAnswered = useCallback(
    (q: any) => {
      if (isQuestionDisabled(q)) return true;

      // ตรวจสอบประเภทกลุ่มที่อยู่ หรือ subFields (เช่น ข้อ 27)
      if (
        q.type === "address_group" ||
        (q.subFields && q.subFields.length > 0)
      ) {
        const groupData = answers[q.id];
        if (groupData && typeof groupData === "object") {
          // ถ้าเป็นกลุ่ม ให้เช็คว่ามีอย่างน้อย 1 field ที่มีข้อมูล
          return Object.values(groupData).some(
            (val: any) =>
              val !== undefined && val !== null && val.toString().trim() !== "",
          );
        }
        return false;
      }
      return answers[q.id] !== undefined && answers[q.id] !== "";
    },
    [answers, isQuestionDisabled],
  );

  useEffect(() => {
    currentQuestions.forEach((q) => {
      if (isQuestionDisabled(q) && answers[q.id]) {
        onAnswer(q.id, "");
      }
    });
  }, [answers, currentQuestions, onAnswer, isQuestionDisabled]);

  const currentProgress = useMemo(() => {
    const total = questionPart3.length;
    const answered = questionPart3.filter((q) => isQuestionAnswered(q)).length;
    return total === 0 ? 0 : Math.round((answered / total) * 100);
  }, [answers, isQuestionAnswered]);

  useEffect(() => {
    if (onProgressChange) onProgressChange(currentProgress);
  }, [currentProgress, onProgressChange]);

  const isPartComplete = useMemo(
    () => questionPart3.every((q) => isQuestionAnswered(q)),
    [answers, isQuestionAnswered],
  );
  const isCurrentPageComplete = useMemo(
    () => currentQuestions.every((q) => isQuestionAnswered(q)),
    [currentQuestions, isQuestionAnswered],
  );
  const displayProgress = isPartComplete ? 100 : currentProgress;

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

  // ✅ แก้ไข Logic handleNext ให้ดึงค่าจาก mock data โดยตรง
  const handleNext = () => {
    if (currentPageIndex < uniquePages.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
      scrollToTop();
    } else {
      // ค้นหาคำตอบข้อที่ 29
      const answer29 = answers[29];
      const question29 = questionPart3.find((q) => q.id === 29);

      if (question29 && answer29) {
        const selectedOption = (question29.options as any[]).find((opt: any) =>
          typeof opt === "string" ? opt === answer29 : opt.value === answer29,
        );

        if (selectedOption && selectedOption.skipToPart) {
          onNextPart(selectedOption.skipToPart);
          return;
        }
      }
      // ถ้าหาไม่เจอ ให้ไป Part 4 เป็นพื้นฐาน
      onNextPart(4);
    }
  };

  const handleBack = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
      scrollToTop();
    } else {
      onBackPart();
    }
  };

  const activeSolidBlue = "bg-[#2F80ED]";
  const questionBoxAnsweredBg = "bg-[#EAF4FF]";
  const inProgressGradient =
    "from-[#33CCCC] via-[#32CBCB] via-[#E0FFFF] via-[#32CBCB] to-[#33CCCC]";
  const completeGradient =
    "from-[#2995FD] via-[#32CBCB] via-[#A5F3F3] via-[#32CBCB] to-[#2995FD]";

  return (
    <div ref={topRef} className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
        <div>
          <span className="text-[#1890FF] text-sm font-medium">
            {t('questionnaire.section_title')}
          </span>
          {/* ✅ ใช้ Label จาก Mock Data แทน Text Hardcode */}
          <h1 className="text-[#1890FF] text-3xl font-bold mt-1">
            {getLocalizedText(partInfo.label)}
          </h1>
        </div>

        <div className="relative mt-4 md:mt-0 self-start md:self-center">
          {isPartComplete ? (
            <div className="relative group overflow-hidden rounded-full min-w-35 h-8.5 flex items-center justify-center">
              <div
                className={`absolute inset-0 bg-linear-to-r ${completeGradient} animate-shimmer-ltr`}
              />
              <span className="relative z-10 text-sm text-white pt-0.5">
                {t('questionnaire.alerts.complete')}
              </span>
            </div>
          ) : (
            <div className="relative group h-8.5 min-w-35 flex items-center justify-center">
              <div
                className={`absolute inset-0 rounded-full bg-linear-to-r ${inProgressGradient} animate-shimmer-ltr p-[1.5px]`}
              >
                <div className="h-full w-full bg-white rounded-full"></div>
              </div>
              <div className="relative flex items-center justify-center px-8 overflow-hidden h-full">
                <span
                  className={`text-sm font-bold bg-linear-to-r ${inProgressGradient} bg-clip-text text-transparent animate-shimmer-ltr pt-1`}
                >
                  {t('questionnaire.alerts.in_progress')}
                </span>
              </div>
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white px-1 z-20">
                <Image
                  src={GraduationCapGif}
                  alt="GradCap"
                  width={28}
                  height={28}
                  className="animate-rock"
                  unoptimized
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-4">
        <div
          className="bg-[#1890FF] h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${displayProgress}%` }}
        ></div>
      </div>

      {/* Render Questions */}
      <div className="flex flex-col gap-8">
        {currentQuestions.map((question) => {
          const isDisabled = isQuestionDisabled(question);
          const answered = isQuestionAnswered(question) && !isDisabled;

          return (
            <div
              key={question.id}
              className={`relative rounded-3xl p-0.5 transition-all duration-300 ${
                isDisabled
                  ? "grayscale opacity-60 pointer-events-none"
                  : answered
                    ? "bg-transparent"
                    : "bg-gray-100 hover:bg-linear-to-r hover:from-[#267FD8] hover:to-[#2994FF]"
              }`}
            >
              <div
                className={`relative rounded-[calc(1.5rem-2px)] p-6 md:p-8 h-full transition-colors duration-300 ${
                  isDisabled
                    ? "bg-gray-50"
                    : answered
                      ? questionBoxAnsweredBg
                      : "bg-white"
                }`}
              >
                <div className="mb-6">
                  <span
                    className={`text-sm font-bold block mb-1 ${
                      isDisabled ? "text-gray-400" : "text-[#1890FF]"
                    }`}
                  >
                    ข้อที่ {question.id}
                  </span>
                  <h3
                    className={`font-medium text-lg md:text-xl ${
                      isDisabled ? "text-gray-500" : "text-[#18305D]"
                    }`}
                  >
                    {getLocalizedText(question.label)}
                  </h3>
                </div>

                {/* Question Types (Dropdown/Radio/SubFields) - ใช้ Hover แยกอิสระตามที่คุณต้องการ */}
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
                                ? `${activeSolidBlue} text-white`
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
                                  ? `${activeSolidBlue} text-white shadow-md`
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

                {/* จัดการ SubFields เช่น ข้อ 27 (ความต้องการทักษะ) */}
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
                                      ? `${activeSolidBlue} text-white placeholder:text-white/60`
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
                {question.type === "rating" && (
                  <div className="flex flex-col items-center py-4 overflow-x-auto">
                    <div className="flex justify-between w-full max-w-3xl min-w-75 px-2 md:px-10 gap-2">
                      {[1, 2, 3, 4, 5].map((score, index) => {
                        const isSelected = answers[question.id] === score;
                        const isHovered =
                          hoverRating?.qId === question.id &&
                          hoverRating?.val === score;
                        const showEmoji = isSelected || isHovered;

                        return (
                          <div
                            key={score}
                            className="flex flex-col items-center gap-3 w-16 lg:w-24 shrink-0"
                          >
                            <button
                              type="button"
                              onClick={() => !isDisabled && onAnswer(question.id, score)}
                              onMouseEnter={() =>
                                setHoverRating({ qId: question.id, val: score })
                              }
                              onMouseLeave={() => setHoverRating(null)}
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
                                isSelected
                                  ? "text-[#1890FF] font-semibold"
                                  : "text-gray-400"
                              }`}
                            >
                              {(question.options as QuestionOption[])?.[index] ? getLocalizedText((question.options as QuestionOption[])[index].label) : ""}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* --- Checkbox Logic --- */}
                {question.type === "checkbox" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 mt-2">
                    {(question.options as QuestionOption[])?.map((option) => {
                      const isSelected = (answers[question.id] || []).includes(
                        option.value,
                      );
                      const IconComponent = option.icon
                        ? iconMap[option.icon]
                        : null;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          disabled={isDisabled}
                          onClick={() => {
                            if (isDisabled) return;
                            const currentSelected: string[] = answers[question.id] || [];
                            if (currentSelected.includes(option.value)) {
                              onAnswer(
                                question.id,
                                currentSelected.filter((item) => item !== option.value),
                              );
                            } else {
                              onAnswer(question.id, [...currentSelected, option.value]);
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
                            {getLocalizedText(option.label)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* --- Textarea Logic --- */}
                {question.type === "textarea" && (
                  <div className="relative group mt-2 max-w-4xl">
                    <div className={`absolute left-4 top-3.5 ${isDisabled ? "text-gray-300" : "text-gray-400"}`}>
                      <FileSearch size={18} />
                    </div>
                    <div
                      className={`rounded-xl p-px transition-all duration-200 ${
                        isDisabled
                           ? "bg-gray-200"
                           : answered
                             ? "bg-transparent"
                             : "bg-gray-200"
                      }`}
                    >
                      <div className="relative rounded-[calc(0.75rem-1px)] bg-white overflow-hidden">
                        <textarea
                          rows={4}
                          disabled={isDisabled}
                          placeholder={question.placeholder ? getLocalizedText(question.placeholder) : ''}
                          value={answers[question.id] || ""}
                          onChange={(e) => onAnswer(question.id, e.target.value)}
                          className={`w-full pl-12 pr-4 py-3 outline-none transition-all resize-none text-sm md:text-base ${
                            isDisabled
                              ? "bg-gray-100 text-gray-400"
                              : answered
                                ? `${activeSolidBlue} text-white placeholder:text-white/60`
                                : "bg-white text-gray-700 placeholder:text-gray-400"
                          }`}
                        />
                      </div>
                    </div>
                    <div className="text-right text-[10px] md:text-xs text-gray-400 mt-2">
                      {(answers[question.id] || "").length}/255
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4 justify-end mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={handleBack}
          className="px-8 py-3 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 min-w-30"
        >
          {t('questionnaire.buttons.back')}
        </button>
        <button
          onClick={handleNext}
          className={`relative overflow-hidden px-8 py-3 rounded-xl font-bold transition-all duration-300 min-w-30 ${
            isCurrentPageComplete
              ? `${activeSolidBlue} text-white shadow-lg`
              : "bg-[#E0E0E0] text-[#A0A0A0]"
          }`}
        >
          <span className="relative z-10">
            {isLastPage ? t('questionnaire.buttons.next') : t('questionnaire.buttons.next')}
          </span>
          {isCurrentPageComplete && (
            <div className="absolute left-1/2 bottom-0 w-[250%] pt-[250%] bg-[#0041C4] rounded-full -translate-x-1/2 translate-y-full group-hover:translate-y-[10%] transition-transform duration-500 ease-in-out z-0 pointer-events-none"></div>
          )}
        </button>
      </div>
    </div>
  );
}
