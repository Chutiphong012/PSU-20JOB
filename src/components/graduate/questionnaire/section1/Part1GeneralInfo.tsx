// src/components/graduate/questionnaire/parts/Part1GeneralInfo.tsx
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { questionPart1, section1Structure } from "@/data/questionnaireMock"; // ✅ Import section1Structure
import GraduationCapGif from "@/assets/GraduationCap.gif";

interface Part1Props {
  answers: Record<string, any>;
  onAnswer: (id: number, value: any) => void;
  progress: number;
  onNextPart: (nextPart: number) => void;
  onProgressChange?: (percent: number) => void;
}

export function Part1GeneralInfo({
  answers,
  onAnswer,
  onNextPart,
  onProgressChange,
}: Part1Props) {
  // ✅ ดึงข้อมูล Structure ของ Part 1 (Index 0) มาใช้
  const partInfo = section1Structure[0];

  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const uniquePages = useMemo(
    () =>
      Array.from(new Set(questionPart1.map((q) => q.page))).sort(
        (a, b) => a - b,
      ),
    [],
  );
  const currentPageNumber = uniquePages[currentPageIndex];
  const currentQuestions = useMemo(
    () => questionPart1.filter((q) => q.page === currentPageNumber),
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
      if (
        q.type === "address_group" ||
        (q.subFields && q.subFields.length > 0)
      ) {
        const groupData = answers[q.id];
        if (groupData && typeof groupData === "object") {
          return Object.values(groupData).some(
            (val: any) =>
              val !== undefined && val !== null && val.toString().trim() !== "",
          );
        }
        return false;
      }
      return (
        answers[q.id] !== undefined &&
        answers[q.id] !== "" &&
        answers[q.id] !== null
      );
    },
    [answers, isQuestionDisabled],
  );

  const currentProgress = useMemo(() => {
    const total = questionPart1.length;
    const answered = questionPart1.filter((q) => isQuestionAnswered(q)).length;
    return total === 0 ? 0 : Math.round((answered / total) * 100);
  }, [answers, isQuestionAnswered]);

  useEffect(() => {
    if (onProgressChange) onProgressChange(currentProgress);
  }, [currentProgress, onProgressChange]);

  const isCurrentPageComplete = useMemo(
    () => currentQuestions.every((q) => isQuestionAnswered(q)),
    [currentQuestions, isQuestionAnswered],
  );
  const isPartComplete = useMemo(
    () => questionPart1.every((q) => isQuestionAnswered(q)),
    [answers, isQuestionAnswered],
  );

  const displayProgress = isPartComplete ? 100 : currentProgress;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNext = () => {
    if (currentPageIndex < uniquePages.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
      scrollToTop();
    } else {
      const employmentAnswer = answers[12];
      const question12 = questionPart1.find((q) => q.id === 12);

      if (question12 && employmentAnswer) {
        const selectedOption = (question12.options as any[]).find((opt: any) =>
          typeof opt === "string"
            ? opt === employmentAnswer
            : opt.value === employmentAnswer,
        );

        if (selectedOption && selectedOption.skipToPart) {
          onNextPart(selectedOption.skipToPart);
        } else {
          onNextPart(2);
        }
      } else {
        onNextPart(2);
      }
    }
  };

  const handleBack = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
      scrollToTop();
    }
  };

  const activeSolidBlue = "bg-[#2F80ED]";
  const questionBoxAnsweredBg = "bg-[#EAF4FF]";
  const inProgressGradient = "from-[#33CCCC] via-[#85EDFD] to-[#2994FF]";
  const completeGradient = "from-[#2995FD] via-[#5CE1E6] to-[#2995FD]";

  return (
    <div className="flex flex-col gap-4 md:gap-6 animate-in fade-in duration-300 font-['Prompt']">
      {/* Header - ปรับ Padding และ Gap สำหรับมือถือ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 relative">
        <div className="text-left px-1 md:px-0">
          <span className="text-[#1890FF] text-xs md:text-sm font-medium">
            ส่วนที่ 1 ภาวะการมีงานทำของบัณฑิต
          </span>
          {/* ✅ ใช้ Label จาก Mock Data แทน Text Hardcode */}
          <h1 className="text-[#1890FF] text-2xl md:text-3xl font-bold mt-1 leading-tight">
            {partInfo.label}
          </h1>
        </div>

        <div className="relative mt-2 md:mt-0 self-start md:self-center shrink-0">
          {isPartComplete ? (
            <div className="relative group overflow-hidden rounded-full min-w-27.5 md:min-w-35 h-8 md:h-8.5 flex items-center justify-center">
              <div
                className={`absolute inset-0 bg-linear-to-r ${completeGradient} animate-shimmer-ltr`}
              />
              <span className="relative z-10 text-xs md:text-sm text-white pt-1 font-bold">
                Complete
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
                  In Progress
                </span>
              </div>

              <div className="absolute -top-4 md:-top-5 left-1/2 -translate-x-1/2 bg-white px-1 z-20">
                <Image
                  src={GraduationCapGif}
                  alt="Graduation Cap"
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

      {/* Progress Bar - ปรับ Margin ท้ายสำหรับมือถือ */}
      <div className="w-full bg-gray-100 h-2 md:h-2.5 rounded-full overflow-hidden mb-3 md:mb-4">
        <div
          className="bg-[#1890FF] h-full rounded-full shadow-sm transition-all duration-500 ease-out"
          style={{ width: `${displayProgress}%` }}
        ></div>
      </div>

      {/* คำถาม - ปรับ Padding ภายใน Card ให้ลดลงบนมือถือ */}
      <div className="flex flex-col gap-5 md:gap-8">
        {currentQuestions.map((question) => {
          const isDisabled = isQuestionDisabled(question);
          const answered = isQuestionAnswered(question) && !isDisabled;
          return (
            <div
              key={question.id}
              className={`relative rounded-2xl md:rounded-3xl p-0.5 transition-all duration-300 ${
                isDisabled
                  ? "grayscale opacity-60 pointer-events-none bg-gray-200"
                  : answered
                    ? "bg-transparent"
                    : "bg-gray-100 hover:bg-linear-to-r hover:from-[#267FD8] hover:to-[#2994FF]"
              }`}
            >
              <div
                className={`relative rounded-[calc(1rem-2px)] md:rounded-[calc(1.5rem-2px)] p-4 md:p-8 h-full transition-colors duration-300 ${
                  isDisabled
                    ? "bg-gray-50 text-gray-400"
                    : answered
                      ? questionBoxAnsweredBg
                      : "bg-white"
                }`}
              >
                <div className="mb-4 md:mb-6">
                  <span
                    className={`text-xs md:text-sm font-bold block mb-1 ${
                      isDisabled ? "text-gray-400" : "text-[#1890FF]"
                    }`}
                  >
                    ข้อที่ {question.id}
                  </span>
                  <h3
                    className={`font-medium text-base md:text-xl leading-snug ${
                      isDisabled ? "text-gray-500" : "text-[#18305D]"
                    }`}
                  >
                    {question.label}
                  </h3>
                </div>

                {/* Dropdown Section */}
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
                      <div className="relative rounded-[calc(0.75rem-1px)] overflow-hidden bg-white">
                        <select
                          disabled={isDisabled}
                          className={`w-full appearance-none border-none px-4 py-3 outline-none text-sm md:text-base transition-all ${
                            isDisabled
                              ? "bg-gray-100"
                              : answers[question.id]
                                ? `${activeSolidBlue} text-white font-medium cursor-pointer`
                                : "bg-white text-gray-700 cursor-pointer"
                          }`}
                          value={answers[question.id] || ""}
                          onChange={(e) =>
                            onAnswer(question.id, e.target.value)
                          }
                        >
                          <option value="" disabled className="text-gray-400">
                            {question.placeholder}
                          </option>
                          {question.options?.map((opt: any) => (
                            <option
                              key={typeof opt === "string" ? opt : opt.value}
                              value={typeof opt === "string" ? opt : opt.value}
                              className="text-gray-700 bg-white"
                            >
                              {typeof opt === "string" ? opt : opt.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          className={`absolute right-3 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none ${
                            isDisabled
                              ? "text-gray-300"
                              : answers[question.id]
                                ? "text-white"
                                : "text-gray-400"
                          }`}
                          size={18}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Radio Section */}
                {question.type === "radio" && (
                  <div
                    className={`grid gap-3 md:gap-4 ${
                      (question.options as any[])?.length > 3 ||
                      question.id >= 8
                        ? "grid-cols-1"
                        : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                    }`}
                  >
                    {question.options?.map((opt: any, idx: number) => {
                      const label = typeof opt === "string" ? opt : opt.label;
                      const val = typeof opt === "string" ? opt : opt.value;
                      const isSelected = answers[question.id] === val;
                      const header =
                        typeof opt === "object" ? opt.header : null;
                      return (
                        <div key={idx} className="w-full">
                          {header && (
                            <div
                              className={`text-xs md:text-sm font-medium mb-2 mt-2 ${
                                isDisabled ? "text-gray-400" : "text-[#1890FF]"
                              }`}
                            >
                              {header}
                            </div>
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
                            <label
                              className={`flex items-start md:items-center gap-3 md:gap-4 p-3 md:p-4 rounded-[calc(0.75rem-1px)] h-full transition-all ${
                                isDisabled
                                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                  : isSelected
                                    ? `${activeSolidBlue} text-white shadow-md cursor-pointer`
                                    : "bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
                              }`}
                              onClick={() =>
                                !isDisabled && onAnswer(question.id, val)
                              }
                            >
                              <div
                                className={`mt-0.5 md:mt-0 w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                  isDisabled
                                    ? "border-gray-300 bg-gray-50"
                                    : isSelected
                                      ? "border-white"
                                      : "border-gray-300"
                                }`}
                              >
                                {isSelected && !isDisabled && (
                                  <div className="w-2 md:w-2.5 h-2 md:h-2.5 bg-white rounded-full"></div>
                                )}
                              </div>
                              <span className="text-sm md:text-base font-medium leading-snug">
                                {label}
                              </span>
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* SubFields section (Address Group) */}
                {(question.type === "address_group" ||
                  (question.subFields && question.subFields.length > 0)) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-4 md:gap-x-6 md:gap-y-6">
                    {question.subFields?.map((field: any, idx: number) => {
                      const currentGroupData = answers[question.id] || {};
                      const currentValue = currentGroupData[field.name] || "";
                      const isFilled = currentValue.toString().trim() !== "";
                      return (
                        <div
                          key={idx}
                          className={
                            field.size === "full"
                              ? "col-span-full"
                              : field.size === "half"
                                ? "col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-3"
                                : "col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2"
                          }
                        >
                          {field.label && (
                            <label
                              className={`block font-medium mb-1.5 md:mb-2 text-xs md:text-sm ${
                                isDisabled ? "text-gray-400" : "text-[#18305D]"
                              }`}
                            >
                              {field.label}
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
                            <div className="relative rounded-[calc(0.75rem-1px)] overflow-hidden bg-white">
                              <input
                                type="text"
                                disabled={isDisabled}
                                className={`w-full border-none px-3 py-2.5 md:px-4 md:py-3 outline-none text-sm md:text-base transition-all ${
                                  isDisabled
                                    ? "bg-gray-100"
                                    : isFilled
                                      ? `${activeSolidBlue} text-white placeholder:text-white/60`
                                      : "bg-white text-gray-700 placeholder:text-gray-300"
                                }`}
                                placeholder={field.placeholder}
                                value={currentValue}
                                onChange={(e) =>
                                  onAnswer(question.id, {
                                    ...currentGroupData,
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
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Navigation - ปรับ Layout เมื่อเป็นหน้าจอมือถือเล็กมาก */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 justify-end mt-6 md:mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={handleBack}
          disabled={currentPageIndex === 0}
          className="w-full sm:w-auto px-8 py-3 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 disabled:opacity-30 min-w-30 transition-all bg-white"
        >
          ย้อนกลับ
        </button>
        <button
          onClick={handleNext}
          className={`group relative overflow-hidden w-full sm:w-auto px-8 py-3 rounded-xl font-bold transition-all duration-300 min-w-30 ${
            isCurrentPageComplete
              ? `${activeSolidBlue} text-white shadow-lg`
              : "bg-[#E0E0E0] text-[#A0A0A0] cursor-not-allowed"
          }`}
          disabled={!isCurrentPageComplete}
        >
          <span className="relative z-10 text-sm md:text-base">
            {isLastPage ? "ถัดไป" : "ถัดไป"}
          </span>
          {isCurrentPageComplete && (
            <div className="absolute left-1/2 bottom-0 w-[250%] pt-[250%] bg-[#0041C4] rounded-full -translate-x-1/2 translate-y-full group-hover:translate-y-[10%] transition-transform duration-500 ease-in-out z-0 pointer-events-none"></div>
          )}
        </button>
      </div>
    </div>
  );
}
