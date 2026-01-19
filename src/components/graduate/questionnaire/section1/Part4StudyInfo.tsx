// src/components/graduate/questionnaire/parts/Part4StudyInfo.tsx
"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { questionPart4 } from "@/data/questionnaireMock";
import GraduationCapGif from "@/assets/GraduationCap.gif";

interface Part4Props {
  answers: Record<string, any>;
  onAnswer: (id: number, value: any) => void;
  onNextPart: (nextPart: number) => void;
  onBackPart: () => void;
  onProgressChange?: (percent: number) => void;
}

export function Part4StudyInfo({
  answers,
  onAnswer,
  onNextPart,
  onBackPart,
  onProgressChange,
}: Part4Props) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const uniquePages = useMemo(
    () =>
      Array.from(new Set(questionPart4.map((q) => q.page))).sort(
        (a, b) => a - b
      ),
    []
  );
  const currentPageNumber = uniquePages[currentPageIndex];
  const currentQuestions = useMemo(
    () => questionPart4.filter((q) => q.page === currentPageNumber),
    [currentPageNumber]
  );
  const isLastPage = currentPageIndex === uniquePages.length - 1;

  const isQuestionAnswered = useCallback(
    (q: any) => answers[q.id] !== undefined && answers[q.id] !== "",
    [answers]
  );

  const currentProgress = useMemo(() => {
    const total = questionPart4.length;
    const answered = questionPart4.filter((q) => isQuestionAnswered(q)).length;
    return total === 0 ? 0 : Math.round((answered / total) * 100);
  }, [answers, isQuestionAnswered]);

  useEffect(() => {
    if (onProgressChange) onProgressChange(currentProgress);
  }, [currentProgress, onProgressChange]);

  const isPartComplete = useMemo(
    () => questionPart4.every((q) => isQuestionAnswered(q)),
    [answers, isQuestionAnswered]
  );
  const isCurrentPageComplete = useMemo(
    () => currentQuestions.every((q) => isQuestionAnswered(q)),
    [currentQuestions, isQuestionAnswered]
  );
  const displayProgress = isPartComplete ? 100 : currentProgress;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // ✅ แก้ไขให้เป็น Dynamic: ดึงข้อมูล skipToPart จากคำตอบข้อสุดท้าย
  const handleNext = () => {
    if (currentPageIndex < uniquePages.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
      scrollToTop();
    } else {
      // ค้นหาคำตอบของข้อสุดท้ายในหน้านั้น (เช่น ข้อ 34)
      const lastQuestion = currentQuestions[currentQuestions.length - 1];
      const answerValue = answers[lastQuestion.id];

      if (lastQuestion.options && answerValue) {
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
      onNextPart(5); // Fallback กรณีหาค่าไม่เจอ
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
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Header พร้อมสีวิ่ง LTR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
        <div>
          <span className="text-[#1890FF] text-sm font-medium">
            ส่วนที่ 1 ภาวะการมีงานทำของบัณฑิต
          </span>
          <h1 className="text-[#1890FF] text-3xl font-bold mt-1">
            ตอนที่ 4 การศึกษาต่อ
          </h1>
        </div>

        <div className="relative mt-4 md:mt-0 self-start md:self-center">
          {isPartComplete ? (
            <div className="relative group overflow-hidden rounded-full min-w-35 h-8.5 flex items-center justify-center">
              <div
                className={`absolute inset-0 bg-linear-to-r ${completeGradient} animate-shimmer-ltr`}
              />
              <span className="relative z-10 text-sm font-bold text-white pt-0.5">
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
              <div className="relative flex items-center justify-center px-8 overflow-hidden h-full">
                <span
                  className={`text-sm font-bold bg-linear-to-r ${inProgressGradient} bg-clip-text text-transparent animate-shimmer-ltr pt-1`}
                >
                  In Progress
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

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-4">
        <div
          className="bg-[#1890FF] h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${displayProgress}%` }}
        ></div>
      </div>

      {/* คำถาม */}
      <div className="flex flex-col gap-8">
        {currentQuestions.map((question) => {
          const answered = isQuestionAnswered(question);
          return (
            <div
              key={question.id}
              className={`relative rounded-3xl p-0.5 transition-all duration-300 ${
                answered
                  ? "bg-transparent"
                  : "bg-gray-100 hover:bg-linear-to-r hover:from-[#267FD8] hover:to-[#2994FF]"
              }`}
            >
              <div
                className={`relative rounded-[calc(1.5rem-2px)] p-6 md:p-8 h-full transition-colors duration-300 ${
                  answered ? questionBoxAnsweredBg : "bg-white"
                }`}
              >
                <div className="mb-6">
                  <span className="text-[#1890FF] text-sm font-bold block mb-1">
                    ข้อที่ {question.id}
                  </span>
                  <h3 className="text-[#18305D] font-medium text-lg md:text-xl">
                    {question.label}
                  </h3>
                </div>

                {/* Render Dropdown / Radio พร้อมระบบ Hover แยกอิสระ */}
                {question.type === "dropdown" && (
                  <div className="relative max-w-full md:max-w-2xl">
                    <div
                      className={`rounded-xl p-px transition-all duration-200 ${
                        answers[question.id]
                          ? "bg-transparent"
                          : "bg-gray-200 hover:bg-linear-to-r hover:from-[#267FD8] hover:to-[#2994FF]"
                      }`}
                    >
                      <div className="relative rounded-[calc(0.75rem-1px)] bg-white overflow-hidden">
                        <select
                          className={`w-full px-4 py-3 border-none outline-none appearance-none cursor-pointer ${
                            answers[question.id]
                              ? `${activeSolidBlue} text-white`
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
                            answers[question.id]
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
                      question.id === 32
                        ? "grid-cols-1 md:grid-cols-3"
                        : "grid-cols-1"
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
                            isSelected
                              ? "bg-transparent"
                              : "bg-gray-200 hover:bg-linear-to-r hover:from-[#267FD8] hover:to-[#2994FF]"
                          }`}
                        >
                          <label
                            className={`flex items-start md:items-center gap-4 p-4 cursor-pointer transition-all rounded-[calc(0.75rem-1px)] h-full ${
                              isSelected
                                ? `${activeSolidBlue} text-white shadow-md`
                                : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                            onClick={() => onAnswer(question.id, val)}
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
                              {label}
                            </span>
                          </label>
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
          className="px-8 py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 min-w-30"
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
