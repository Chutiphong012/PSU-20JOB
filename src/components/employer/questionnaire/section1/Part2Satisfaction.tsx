"use client";

import { useState, useMemo } from "react";
import { ChevronRight } from "lucide-react";
import { employerPart2, Question } from "@/data/employerMock";

interface PartProps {
  answers: Record<string, any>;
  onAnswer: (id: number | string, value: any) => void;
  onNextPart: () => void;
  onBackPart: () => void;
  onScrollToTop?: () => void;
}

export function Part2Satisfaction({
  answers,
  onAnswer,
  onNextPart,
  onBackPart,
  onScrollToTop,
}: PartProps) {
  const [currentPage, setCurrentPage] = useState(4);

  const questions = employerPart2;
  const uniquePages = useMemo(
    () =>
      Array.from(new Set(questions.map((q) => q.page))).sort((a, b) => a - b),
    [questions],
  );
  const currentQuestions = useMemo(
    () => questions.filter((q) => q.page === currentPage),
    [questions, currentPage],
  );

  const isFirstPage = currentPage === uniquePages[0];
  const isLastPage = currentPage === uniquePages[uniquePages.length - 1];

  const isPageComplete = currentQuestions.every((q) => {
    const val = answers[q.id.toString()];
    return val !== undefined && val !== "" && val !== null;
  });

  const handleNext = () => {
    if (isLastPage) {
      onNextPart();
    } else {
      setCurrentPage((p) => p + 1);
      setTimeout(() => onScrollToTop?.(), 50);
    }
  };

  const handleBack = () => {
    if (isFirstPage) {
      onBackPart();
    } else {
      setCurrentPage((p) => p - 1);
      setTimeout(() => onScrollToTop?.(), 50);
    }
  };

  const activeSolidBlue = "bg-[#1890FF]";

  const renderInput = (q: Question) => {
    const value = answers[q.id.toString()] || "";
    const isFilled = value !== "" && value !== undefined && value !== null;

    const isRatingType =
      q.type === "radio" &&
      Array.isArray(q.options) &&
      q.options.length === 5 &&
      q.options.every(
        (opt) =>
          opt === "1" || (typeof opt === "string" && !isNaN(Number(opt))),
      );

    if (isRatingType) {
      const labels = ["น้อยที่สุด", "น้อย", "ปานกลาง", "มาก", "มากที่สุด"];
      return (
        <div className="grid grid-cols-5 gap-2 max-w-3xl mx-auto md:mx-0">
          {[1, 2, 3, 4, 5].map((val, idx) => {
            const sVal = val.toString();
            const isSelected = value === sVal;

            return (
              <div key={val} className="flex flex-col items-center gap-3">
                <button
                  onClick={() => onAnswer(q.id, sVal)}
                  className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? `${activeSolidBlue} border-[#1890FF] text-white shadow-lg scale-110`
                      : "bg-white border-gray-100 text-gray-400 hover:border-blue-200"
                  }`}
                >
                  {/* 1. แก้ไขเลข Rating เป็น font-semibold */}
                  <span className="text-lg md:text-2xl font-semibold">
                    {val}
                  </span>
                </button>
                <span
                  className={`text-[10px] md:text-xs text-center transition-colors ${isSelected ? "text-[#1890FF] font-medium" : "text-gray-400 font-light"}`}
                >
                  {labels[idx]}
                </span>
              </div>
            );
          })}
        </div>
      );
    }

    if (q.type === "radio") {
      return (
        <div className="space-y-3">
          {(q.options as any[])?.map((opt, idx) => {
            const label = typeof opt === "string" ? opt : opt.label;
            const val = typeof opt === "string" ? opt : opt.value;
            const isSelected = value === val;
            const withInput = typeof opt === "object" && opt.withInput;

            return (
              <div key={idx} className="space-y-3">
                <label
                  className={`group flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border-2 ${
                    isSelected
                      ? "bg-[#1890FF] border-[#1890FF] text-white shadow-sm"
                      : "bg-white border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => onAnswer(q.id, val)}
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? "border-white" : "border-gray-300"}`}
                  >
                    {isSelected && (
                      <div className="w-3 h-3 bg-white rounded-full animate-in zoom-in duration-300" />
                    )}
                  </div>
                  <span className="text-base font-medium">{label}</span>
                </label>

                {withInput && isSelected && (
                  <div className="mt-3 ml-2 md:ml-4 pl-4 border-l-2 border-blue-200 animate-in slide-in-from-top-2 fade-in duration-300">
                    <input
                      type="text"
                      placeholder={opt.placeholder || "โปรดระบุรายละเอียด"}
                      value={answers[`${q.id}_other`] || ""}
                      onChange={(e) =>
                        onAnswer(`${q.id}_other`, e.target.value)
                      }
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base outline-none focus:border-[#1890FF] transition-all bg-white text-gray-700"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col h-full font-['Prompt']">
      <div className="flex-1 space-y-10 border border-gray-100 rounded-3xl p-6 md:p-10 bg-white shadow-sm">
        {currentQuestions.map((q, index) => {
          const questionNumber =
            questions.findIndex((item) => item.id === q.id) + 1;

          return (
            <div
              key={q.id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10 border-b border-gray-50 last:border-0 last:pb-0"
            >
              {q.section &&
                (index === 0 ||
                  currentQuestions[index - 1].section !== q.section) && (
                  <div className="mb-8 mt-4">
                    {/* 2. แก้ไขหัวข้อ Section เป็น font-semibold */}
                    <h2 className="text-[#2994FF] font-semibold text-lg md:text-xl uppercase tracking-wide">
                      {q.section}
                    </h2>
                  </div>
                )}

              <div className="mb-6">
                <div className="mb-2">
                  <span className="text-xs md:text-sm text-gray-400 font-light">
                    ข้อที่ {questionNumber}
                  </span>
                </div>
                <h3 className="font-semibold text-lg md:text-xl text-black leading-snug">
                  {q.label.replace(/^\d+\.\s*/, "")}{" "}
                  <span className="text-red-500">*</span>
                </h3>
              </div>

              {renderInput(q)}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 mt-12 pt-8 border-t border-gray-100">
        <button
          onClick={handleBack}
          className="w-full sm:w-49 px-10 py-3.5 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition-all bg-white"
        >
          ย้อนกลับ
        </button>
        <button
          onClick={handleNext}
          disabled={!isPageComplete}
          className={`w-full sm:w-49 group relative overflow-hidden px-12 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 ${
            !isPageComplete
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-[#1890FF] shadow-lg shadow-blue-200 hover:shadow-blue-300"
          }`}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            ถัดไป
          </span>
          {isPageComplete && (
            <span className="absolute left-1/2 bottom-0 w-100 h-100 bg-[#0060C0] rounded-full -translate-x-1/2 translate-y-1/2 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out z-0"></span>
          )}
        </button>
      </div>
    </div>
  );
}
