// src/components/graduate/questionnaire/parts/Part1GeneralInfo.tsx
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { questionPart1 } from "@/data/questionnaireMock";

// Import ไฟล์ GIF จากโฟลเดอร์ assets
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
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const uniquePages = useMemo(
    () =>
      Array.from(new Set(questionPart1.map((q) => q.page))).sort(
        (a, b) => a - b
      ),
    []
  );
  const currentPageNumber = uniquePages[currentPageIndex];
  const currentQuestions = useMemo(
    () => questionPart1.filter((q) => q.page === currentPageNumber),
    [currentPageNumber]
  );
  const isLastPage = currentPageIndex === uniquePages.length - 1;

  const isQuestionDisabled = useCallback(
    (question: any) => {
      if (!question.disabledCondition) return false;
      const { questionId, value } = question.disabledCondition;
      return answers[questionId] === value;
    },
    [answers]
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
              val !== undefined && val !== null && val.toString().trim() !== ""
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
    [answers, isQuestionDisabled]
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
    [currentQuestions, isQuestionAnswered]
  );
  const isPartComplete = useMemo(
    () => questionPart1.every((q) => isQuestionAnswered(q)),
    [answers, isQuestionAnswered]
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
            : opt.value === employmentAnswer
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
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
        <div>
          <span className="text-[#1890FF] text-sm font-medium">
            ส่วนที่ 1 ภาวะการมีงานทำของบัณฑิต
          </span>
          <h1 className="text-[#1890FF] text-3xl font-bold mt-1">
            ตอนที่ 1 ข้อมูลทั่วไป
          </h1>
        </div>

        <div className="relative mt-4 md:mt-0 self-start md:self-center">
          {isPartComplete ? (
            <div className="relative group overflow-hidden rounded-full min-w-35 h-8.5 flex items-center justify-center">
              <div
                className={`absolute inset-0 bg-linear-to-r ${completeGradient} animate-shimmer-ltr`}
              />
              <span className="relative z-10 text-sm text-white pt-1">
                Complete
              </span>
            </div>
          ) : (
            <div className="relative group h-8.5 min-w-35 flex items-center justify-center">
              <div
                className={`absolute inset-0 rounded-full bg-linear-to-r ${inProgressGradient} animate-shimmer-ltr p-[1.5px]`}
              >
                <div className="h-full w-full bg-white rounded-full"></div>
              </div>

              {/* ✅ แก้ไขตรงนี้: แยก Image ออกจาก div ที่มี overflow-hidden */}
              <div className="relative flex items-center justify-center px-8 overflow-hidden h-full">
                <span
                  className={`text-sm font-bold bg-linear-to-r ${inProgressGradient} bg-clip-text text-transparent pt-1 animate-shimmer-ltr relative z-10`}
                >
                  In Progress
                </span>
              </div>

              {/* ย้ายมาอยู่ข้างนอกตรงนี้ */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white px-1 z-20">
                <Image
                  src={GraduationCapGif}
                  alt="Graduation Cap"
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

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-4">
        <div
          className="bg-[#1890FF] h-full rounded-full shadow-sm transition-all duration-500 ease-out"
          style={{ width: `${displayProgress}%` }}
        ></div>
      </div>

      {/* คำถาม */}
      <div className="flex flex-col gap-8">
        {currentQuestions.map((question) => {
          const isDisabled = isQuestionDisabled(question);
          const answered = isQuestionAnswered(question) && !isDisabled;
          return (
            <div
              key={question.id}
              className={`relative rounded-3xl p-0.5 transition-all duration-300 ${
                isDisabled
                  ? "grayscale opacity-60 pointer-events-none bg-gray-200"
                  : answered
                  ? "bg-transparent"
                  : "bg-gray-100 hover:bg-linear-to-r hover:from-[#267FD8] hover:to-[#2994FF]"
              }`}
            >
              <div
                className={`relative rounded-[calc(1.5rem-2px)] p-6 md:p-8 h-full transition-colors duration-300 ${
                  isDisabled
                    ? "bg-gray-50 text-gray-400"
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
                    {question.label}
                  </h3>
                </div>

                {/* Question Types */}
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
                          className={`w-full appearance-none border-none px-4 py-3 outline-none transition-all ${
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
                      (question.options as any[])?.length > 3 ||
                      question.id >= 8
                        ? "grid-cols-1"
                        : "grid-cols-1 md:grid-cols-3"
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
                              className={`text-sm font-medium mb-3 mt-2 ${
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
                              className={`flex items-start md:items-center gap-4 p-4 rounded-[calc(0.75rem-1px)] h-full ${
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
                                className={`mt-1 md:mt-0 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                  isDisabled
                                    ? "border-gray-300 bg-gray-50"
                                    : isSelected
                                    ? "border-white"
                                    : "border-gray-300"
                                }`}
                              >
                                {isSelected && !isDisabled && (
                                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
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

                {/* SubFields section */}
                {(question.type === "address_group" ||
                  (question.subFields && question.subFields.length > 0)) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-6 gap-y-6">
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
                              ? "col-span-1 md:col-span-1 lg:col-span-3"
                              : "col-span-1 md:col-span-1 lg:col-span-2"
                          }
                        >
                          {field.label && (
                            <label
                              className={`block font-medium mb-2 text-sm ${
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
                                className={`w-full border-none px-4 py-3 outline-none transition-all ${
                                  isDisabled
                                    ? "bg-gray-100"
                                    : isFilled
                                    ? `${activeSolidBlue} text-white`
                                    : "bg-white text-gray-700"
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

      {/* Footer Navigation */}
      <div className="flex gap-4 justify-end mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={handleBack}
          disabled={currentPageIndex === 0}
          className="px-8 py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 min-w-30"
        >
          ย้อนกลับ
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
