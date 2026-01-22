"use client";

import { useState, useMemo } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { employerPart1, Question } from "@/data/employerMock";

interface PartProps {
  answers: Record<string, any>;
  onAnswer: (id: number | string, value: any) => void; // ✅ ปรับรองรับ string สำหรับ id_other
  onNextPart: () => void;
  onScrollToTop?: () => void;
}

export function Part1GeneralInfo({
  answers,
  onAnswer,
  onNextPart,
  onScrollToTop,
}: PartProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const questions = employerPart1;
  const uniquePages = useMemo(
    () =>
      Array.from(new Set(questions.map((q) => q.page))).sort((a, b) => a - b),
    [questions],
  );
  const currentQuestions = useMemo(
    () => questions.filter((q) => q.page === currentPage),
    [questions, currentPage],
  );
  const isLastPage = currentPage === uniquePages[uniquePages.length - 1];
  const isFirstPage = currentPage === 1;

  const isPageComplete = currentQuestions.every((q) => {
    if (!q.required) return true;
    const val = answers[q.id];
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
    if (!isFirstPage) {
      setCurrentPage((p) => p - 1);
      setTimeout(() => onScrollToTop?.(), 50);
    }
  };

  const activeSolidBlue = "bg-[#1890FF]";

  const renderInput = (q: Question) => {
    const value = answers[q.id] || "";
    const isFilled = value !== "" && value !== undefined && value !== null;

    const isRatingType =
      q.type === "radio" &&
      Array.isArray(q.options) &&
      q.options.length === 5 &&
      q.options.every(
        (opt) =>
          opt === "1" || (typeof opt === "string" && !isNaN(Number(opt))),
      );

    if (q.type === "text" || q.type === "number") {
      return (
        <div
          className={`rounded-xl border-2 transition-all duration-200 overflow-hidden ${isFilled ? "border-[#1890FF] bg-[#1890FF]" : "border-gray-200 bg-white"}`}
        >
          <input
            type={q.type}
            placeholder={q.placeholder}
            value={value}
            onChange={(e) => onAnswer(q.id, e.target.value)}
            className={`w-full px-4 py-3.5 outline-none transition-all text-base bg-transparent ${
              isFilled
                ? "text-white placeholder:text-white/60"
                : "text-gray-700"
            }`}
          />
        </div>
      );
    }

    if (q.type === "dropdown") {
      return (
        <div
          className={`rounded-xl border-2 transition-all duration-200 overflow-hidden relative ${isFilled ? "border-[#1890FF] bg-[#1890FF]" : "border-gray-200 bg-white"}`}
        >
          <select
            value={value}
            onChange={(e) => onAnswer(q.id, e.target.value)}
            className={`w-full appearance-none px-4 py-3.5 outline-none transition-all text-base cursor-pointer bg-transparent ${
              isFilled ? "text-white font-medium" : "text-gray-700"
            }`}
          >
            <option value="" disabled className="text-gray-400 bg-white">
              {q.placeholder}
            </option>
            {(q.options as string[])?.map((opt, idx) => (
              <option key={idx} value={opt} className="text-gray-700 bg-white">
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown
            className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${isFilled ? "text-white" : "text-gray-400"}`}
            size={20}
          />
        </div>
      );
    }

    if (q.type === "radio") {
      if (isRatingType) {
        return (
          <div className="grid grid-cols-5 gap-2 max-w-3xl">
            {[1, 2, 3, 4, 5].map((val, idx) => {
              const sVal = val.toString();
              const isSelected = answers[q.id] === sVal;
              return (
                <div key={val} className="flex flex-col items-center gap-3">
                  <button
                    onClick={() => onAnswer(q.id, sVal)}
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      isSelected
                        ? `${activeSolidBlue} border-[#1890FF] text-white shadow-lg scale-110`
                        : "bg-white border-gray-100 text-gray-400"
                    }`}
                  >
                    <span className="text-lg md:text-2xl font-bold">{val}</span>
                  </button>
                  <span
                    className={`text-[10px] md:text-xs text-center ${isSelected ? "text-[#1890FF] font-medium" : "text-gray-400 font-light"}`}
                  >
                    {["น้อยที่สุด", "น้อย", "ปานกลาง", "มาก", "มากที่สุด"][idx]}
                  </span>
                </div>
              );
            })}
          </div>
        );
      }

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

                {/* ✅ ส่วนที่เพิ่ม: ช่องกรอกข้อมูลเมื่อเลือกตัวเลือกที่มี withInput */}
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
                    <h2 className="text-[#2994FF] font-bold text-lg md:text-xl uppercase tracking-wide">
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
                  {q.label}{" "}
                  {q.required && <span className="text-red-500">*</span>}
                </h3>
              </div>
              {renderInput(q)}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-100">
        <button
          onClick={handleBack}
          disabled={isFirstPage}
          className={`w-full sm:w-auto px-10 py-3.5 rounded-xl border font-medium ${isFirstPage ? "text-gray-300 border-gray-100" : "text-gray-600 border-gray-300 hover:bg-gray-50"}`}
        >
          ย้อนกลับ
        </button>
        <button
          onClick={handleNext}
          disabled={!isPageComplete}
          className={`w-full sm:w-auto group relative overflow-hidden px-12 py-3.5 rounded-xl font-bold text-white transition-all ${!isPageComplete ? "bg-gray-200" : "bg-[#1890FF] shadow-lg shadow-blue-200"}`}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            ถัดไป <ChevronRight size={20} />
          </span>
        </button>
      </div>
    </div>
  );
}
