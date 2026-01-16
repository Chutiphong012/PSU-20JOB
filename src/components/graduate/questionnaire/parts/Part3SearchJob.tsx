// src/components/graduate/questionnaire/parts/Part3SearchJob.tsx
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { ChevronDown, GraduationCap } from "lucide-react";
import { questionPart3 } from "@/data/questionnaireMock";

interface Part3Props {
  answers: Record<string, any>;
  onAnswer: (id: number, value: any) => void;
  onNextPart: (nextPart: number) => void;
  onBackPart: () => void;
  onProgressChange?: (percent: number) => void;
}

export function Part3SearchJob({
  answers,
  onAnswer,
  onNextPart,
  onBackPart,
  onProgressChange,
}: Part3Props) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const uniquePages = useMemo(
    () =>
      Array.from(new Set(questionPart3.map((q) => q.page))).sort(
        (a, b) => a - b
      ),
    []
  );
  const currentPageNumber = uniquePages[currentPageIndex];
  const currentQuestions = useMemo(
    () => questionPart3.filter((q) => q.page === currentPageNumber),
    [currentPageNumber]
  );
  const isLastPage = currentPageIndex === uniquePages.length - 1;

  // Logic ตรวจสอบเงื่อนไข Disable (เหมือน Part 1)
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
      if (isQuestionDisabled(q)) return true; // ถ้า Disable ถือว่าผ่าน

      if (
        q.type === "address_group" ||
        (q.subFields && q.subFields.length > 0)
      ) {
        const groupData = answers[q.id];
        if (groupData && typeof groupData === "object") {
          return Object.values(groupData).some(
            (val: any) => val && val.toString().trim() !== ""
          );
        }
        return false;
      }
      return answers[q.id] !== undefined && answers[q.id] !== "";
    },
    [answers, isQuestionDisabled]
  );

  // Auto Clear: ถ้าคำถามถูก Disable ให้ลบคำตอบออก
  useEffect(() => {
    currentQuestions.forEach((q) => {
      if (isQuestionDisabled(q) && answers[q.id]) {
        onAnswer(q.id, "");
      }
    });
  }, [answers, currentQuestions, onAnswer, isQuestionDisabled]);

  // คำนวณ Progress
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
    [answers, isQuestionAnswered]
  );
  const isCurrentPageComplete = useMemo(
    () => currentQuestions.every((q) => isQuestionAnswered(q)),
    [currentQuestions, isQuestionAnswered]
  );
  const displayProgress = isPartComplete ? 100 : currentProgress;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNext = () => {
    if (currentPageIndex < uniquePages.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
      scrollToTop();
    } else {
      // Logic หน้าสุดท้าย (ข้อ 29)
      const lastQuestion = currentQuestions[currentQuestions.length - 1];
      const answerValue = answers[lastQuestion.id];

      if (lastQuestion.options && typeof answerValue === "string") {
        const selectedOption = (lastQuestion.options as any[]).find(
          (opt: any) =>
            typeof opt === "string"
              ? opt === answerValue
              : opt.value === answerValue
        );

        if (selectedOption && selectedOption.skipToPart) {
          onNextPart(selectedOption.skipToPart);
          return;
        }
      }
      // Default กรณีไม่มี Logic: ไปตอนที่ 4
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

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
        <div>
          <span className="text-[#1890FF] text-sm font-medium">
            ส่วนที่ 1 ภาวะการมีงานทำของบัณฑิต
          </span>
          <h1 className="text-[#1890FF] text-3xl font-bold mt-1">
            ตอนที่ 3 การหางาน (สำหรับผู้ที่ยังไม่ได้ทำงาน)
          </h1>
        </div>

        {/* Badge UI */}
        <div className="relative mt-4 md:mt-0 self-start md:self-center">
          {isPartComplete ? (
            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-linear-to-r from-[#32CBCB] to-[#2995FD]"></div>
              <div className="relative px-8 py-1.5 rounded-full bg-transparent flex items-center justify-center min-w-35">
                <span className="text-sm font-bold text-white pt-1">
                  Complete
                </span>
              </div>
            </div>
          ) : (
            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-linear-to-r from-[#33CCCC] to-[#2994FF] p-[1.5px]">
                <div className="h-full w-full bg-white rounded-full"></div>
              </div>
              <div className="relative px-8 py-1.5 rounded-full bg-transparent flex items-center justify-center min-w-35">
                <span className="text-sm font-bold bg-linear-to-r from-[#33CCCC] to-[#2994FF] bg-clip-text text-transparent pt-1">
                  In Progress
                </span>
              </div>
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white px-1">
                <GraduationCap
                  size={20}
                  className="text-black animate-rock"
                  strokeWidth={2}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
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
              className={`relative rounded-3xl p-0.5 transition-all duration-300 group/question ${
                isDisabled
                  ? "grayscale opacity-60 pointer-events-none bg-gray-200 border border-gray-300 shadow-none"
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

                {/* --- Input Fields (เหมือน Part 1/2) --- */}

                {/* Dropdown */}
                {question.type === "dropdown" && (
                  <div className="relative max-w-full md:max-w-2xl">
                    <div
                      className={`rounded-xl p-px transition-all duration-200 ${
                        isDisabled
                          ? "bg-gray-200"
                          : answers[question.id]
                          ? "bg-transparent"
                          : "bg-gray-200 group-hover/question:bg-linear-to-r group-hover/question:from-[#267FD8] group-hover/question:to-[#2994FF]"
                      }`}
                    >
                      <div className="relative rounded-[calc(0.75rem-1px)] bg-white overflow-hidden">
                        <select
                          disabled={isDisabled}
                          className={`w-full px-4 py-3 border-none outline-none appearance-none cursor-pointer ${
                            isDisabled
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : answers[question.id]
                              ? `${activeSolidBlue} text-white font-medium`
                              : "text-gray-700"
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
                              key={opt}
                              value={opt}
                              className="text-gray-700 bg-white"
                            >
                              {opt}
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

                {/* Radio */}
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
                              : "bg-gray-200 group-hover/question:bg-linear-to-r group-hover/question:from-[#267FD8] group-hover/question:to-[#2994FF]"
                          }`}
                        >
                          <label
                            className={`flex items-start md:items-center gap-4 p-4 cursor-pointer transition-all rounded-[calc(0.75rem-1px)] h-full ${
                              isDisabled
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : isSelected
                                ? `${activeSolidBlue} text-white shadow-md`
                                : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                            onClick={() =>
                              !isDisabled && onAnswer(question.id, val)
                            }
                          >
                            <div
                              className={`mt-1 md:mt-0 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
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
                      );
                    })}
                  </div>
                )}

                {/* Address / SubFields */}
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
                            <label
                              className={`block text-sm font-medium mb-2 ${
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
                                : "bg-gray-200 group-hover/question:bg-linear-to-r group-hover/question:from-[#267FD8] group-hover/question:to-[#2994FF]"
                            }`}
                          >
                            <div className="relative rounded-[calc(0.75rem-1px)] bg-white overflow-hidden">
                              {field.type === "dropdown" ? (
                                <>
                                  <select
                                    disabled={isDisabled}
                                    className={`w-full px-4 py-3 border-none outline-none appearance-none cursor-pointer ${
                                      isDisabled
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        : isFilled
                                        ? `${activeSolidBlue} text-white font-medium`
                                        : "text-gray-700"
                                    }`}
                                    value={val}
                                    onChange={(e) =>
                                      onAnswer(question.id, {
                                        ...groupData,
                                        [field.name]: e.target.value,
                                      })
                                    }
                                  >
                                    <option
                                      value=""
                                      disabled
                                      className={
                                        isFilled
                                          ? "text-white/70"
                                          : "text-gray-400"
                                      }
                                    >
                                      {field.placeholder}
                                    </option>
                                    <option
                                      value="opt1"
                                      className="text-gray-700 bg-white"
                                    >
                                      ตัวเลือกสมมติ
                                    </option>
                                  </select>
                                  <ChevronDown
                                    className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${
                                      isDisabled
                                        ? "text-gray-300"
                                        : isFilled
                                        ? "text-white"
                                        : "text-gray-400"
                                    }`}
                                    size={18}
                                  />
                                </>
                              ) : (
                                <input
                                  type="text"
                                  disabled={isDisabled}
                                  className={`w-full px-4 py-3 border-none outline-none transition-all ${
                                    isDisabled
                                      ? "bg-gray-100 text-gray-400 cursor-not-allowed placeholder:text-gray-400"
                                      : isFilled
                                      ? `${activeSolidBlue} text-white placeholder:text-white/60`
                                      : "bg-white text-gray-700 placeholder:text-gray-300"
                                  }`}
                                  placeholder={field.placeholder}
                                  value={val}
                                  onChange={(e) =>
                                    onAnswer(question.id, {
                                      ...groupData,
                                      [field.name]: e.target.value,
                                    })
                                  }
                                />
                              )}
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

      {/* Footer */}
      <div className="flex gap-4 justify-end mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={handleBack}
          className="px-8 py-3 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 bg-white min-w-30"
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
