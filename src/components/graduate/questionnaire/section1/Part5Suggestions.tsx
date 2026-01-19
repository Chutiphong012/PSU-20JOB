// src/components/graduate/questionnaire/parts/Part5Suggestions.tsx
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Question,
  questionPart5,
  QuestionOption,
} from "@/data/questionnaireMock";
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

  // ✅ Helper เช็คว่าตอบหรือยัง
  const isQuestionAnswered = useCallback(
    (q: Question) => {
      const ans = answers[q.id];
      if (Array.isArray(ans)) return ans.length > 0;
      return ans !== undefined && ans !== "";
    },
    [answers]
  );

  // ✅ คำนวณ Progress และ Complete State
  const isPartComplete = useMemo(
    () => questionPart5.every((q) => isQuestionAnswered(q)),
    [answers, isQuestionAnswered]
  );

  // ✅ เพิ่ม Logic เช็คว่าหน้าปัจจุบันทำเสร็จหรือยัง (เหมือน Part 4)
  const isCurrentPageComplete = useMemo(
    () => currentQuestions.every((q) => isQuestionAnswered(q)),
    [currentQuestions, isQuestionAnswered]
  );

  const currentProgress = useMemo(() => {
    const totalQuestions = questionPart5.length;
    const answeredCount = questionPart5.filter((q) =>
      isQuestionAnswered(q)
    ).length;
    return Math.round((answeredCount / totalQuestions) * 100);
  }, [answers, isQuestionAnswered]);

  useEffect(() => {
    onProgressChange(currentProgress);
  }, [currentProgress, onProgressChange]);

  const displayProgress = isPartComplete ? 100 : currentProgress;

  // Styles
  const activeSolidBlue = "bg-[#2F80ED]";
  const questionBoxAnsweredBg = "bg-[#EAF4FF]";
  const inProgressGradient = "from-[#33CCCC] via-[#85EDFD] to-[#2994FF]";
  const completeGradient = "from-[#2995FD] via-[#5CE1E6] to-[#2995FD]";

  const handleNext = () => {
    // ป้องกันการกดถ้ายังทำหน้านั้นไม่เสร็จ (Optional: ถ้าต้องการบังคับ)
    if (!isCurrentPageComplete) return;

    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      console.log("Submit Answers Part 5:", answers);
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onBackPart();
    }
  };

  const toggleCheckbox = (questionId: number, value: string) => {
    const currentSelected: string[] = answers[questionId] || [];
    if (currentSelected.includes(value)) {
      onAnswer(
        questionId,
        currentSelected.filter((item) => item !== value)
      );
    } else {
      onAnswer(questionId, [...currentSelected, value]);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300 font-['Prompt'] relative">
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
        <div>
          <span className="text-[#1890FF] text-sm font-medium">
            ส่วนที่ 1 ภาวะการมีงานทำของบัณฑิต
          </span>
          <h1 className="text-[#1890FF] text-3xl font-bold mt-1">
            ตอนที่ 5 ข้อเสนอแนะ
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
              <div className="relative flex items-center justify-center px-8 overflow-hidden h-full">
                <span
                  className={`text-sm font-bold bg-linear-to-r ${inProgressGradient} bg-clip-text text-transparent pt-1 animate-shimmer-ltr relative z-10`}
                >
                  In Progress
                </span>
              </div>
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

      {/* --- Progress Bar --- */}
      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-4">
        <div
          className="bg-[#1890FF] h-full rounded-full shadow-sm transition-all duration-500 ease-out"
          style={{ width: `${displayProgress}%` }}
        />
      </div>

      {/* --- Questions List --- */}
      <div className="flex flex-col gap-8">
        {currentQuestions.map((q) => {
          const answered = isQuestionAnswered(q);

          return (
            <div
              key={q.id}
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
                {/* Question Label */}
                <div className="mb-6">
                  <span className="text-[#1890FF] text-sm font-bold block mb-1">
                    ข้อที่ {q.id}
                  </span>
                  <h3 className="text-[#18305D] font-medium text-lg md:text-xl">
                    {q.label}
                  </h3>
                </div>

                {/* --- Rating Logic --- */}
                {q.type === "rating" && (
                  <div className="flex flex-col items-center py-4">
                    <div className="flex justify-between w-full max-w-2xl px-2 md:px-10 gap-2 md:gap-4">
                      {[1, 2, 3, 4, 5].map((score, index) => {
                        const isSelected = answers[q.id] === score;
                        const isHovered =
                          hoverRating?.qId === q.id &&
                          hoverRating?.val === score;
                        const showEmoji = isSelected || isHovered;

                        return (
                          <div
                            key={score}
                            className="flex flex-col items-center gap-3 w-16 md:w-20"
                          >
                            <button
                              type="button"
                              onClick={() => onAnswer(q.id, score)}
                              onMouseEnter={() =>
                                setHoverRating({ qId: q.id, val: score })
                              }
                              onMouseLeave={() => setHoverRating(null)}
                              className={`
                                  relative w-14 h-14 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center 
                                  text-2xl transition-all duration-300 ease-out
                                  ${
                                    isSelected
                                      ? "border-[#1890FF] bg-blue-50 shadow-md scale-110"
                                      : "border-gray-200 bg-white hover:border-[#1890FF] hover:shadow-md"
                                  }
                                `}
                            >
                              <span
                                className={`absolute transition-opacity duration-200 ${
                                  showEmoji ? "opacity-100" : "opacity-0"
                                }`}
                              >
                                {ratingEmojis[index]}
                              </span>
                              <span
                                className={`absolute font-semibold text-gray-500 transition-opacity duration-200 ${
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
                              className={`text-xs text-center transition-colors ${
                                isSelected
                                  ? "text-[#1890FF] font-semibold"
                                  : "text-gray-400"
                              }`}
                            >
                              {(q.options as string[])?.[index]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* --- Checkbox Logic --- */}
                {q.type === "checkbox" && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(q.options as QuestionOption[])?.map((option) => {
                      const isSelected = (answers[q.id] || []).includes(
                        option.value
                      );
                      const IconComponent = option.icon
                        ? iconMap[option.icon]
                        : null;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => toggleCheckbox(q.id, option.value)}
                          className={`
                                    relative flex items-center gap-3 px-4 py-4 rounded-xl border transition-all duration-200 text-left group
                                    ${
                                      isSelected
                                        ? "bg-[#1890FF] border-[#1890FF] text-white shadow-md shadow-blue-200"
                                        : "bg-white border-gray-200 text-gray-600 hover:border-[#1890FF] hover:bg-gray-50"
                                    }
                                  `}
                        >
                          <div
                            className={`
                                      w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors
                                      ${
                                        isSelected
                                          ? "bg-white/20 text-white"
                                          : "bg-gray-100 text-gray-500 group-hover:bg-white group-hover:text-[#1890FF]"
                                      }
                                    `}
                          >
                            {IconComponent ? (
                              <IconComponent size={20} />
                            ) : (
                              <div className="w-5 h-5 bg-gray-300 rounded-sm" />
                            )}
                          </div>

                          <span
                            className={`text-sm font-medium ${
                              isSelected ? "text-white" : "text-gray-700"
                            }`}
                          >
                            {option.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* --- Textarea Logic --- */}
                {q.type === "textarea" && (
                  <div className="relative group">
                    <div className="absolute left-4 top-3 text-gray-400">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        ></path>
                      </svg>
                    </div>
                    {/* Style Input */}
                    <div
                      className={`rounded-xl p-px transition-all duration-200 ${
                        answered ? "bg-transparent" : "bg-gray-200"
                      }`}
                    >
                      <div className="relative rounded-[calc(0.75rem-1px)] bg-white overflow-hidden">
                        <textarea
                          rows={3}
                          placeholder={q.placeholder}
                          value={answers[q.id] || ""}
                          onChange={(e) => onAnswer(q.id, e.target.value)}
                          className={`w-full pl-12 pr-4 py-3 outline-none transition-all resize-none ${
                            answered
                              ? `${activeSolidBlue} text-white placeholder:text-white/60`
                              : "bg-white text-gray-700 placeholder:text-gray-400"
                          }`}
                        />
                      </div>
                    </div>
                    <div className="text-right text-xs text-gray-400 mt-2">
                      {(answers[q.id] || "").length}/255
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* --- Footer Buttons (Updated Logic) --- */}
      <div className="flex gap-4 justify-end mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={handleBack}
          className="px-8 py-3 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 bg-white min-w-30"
        >
          ย้อนกลับ
        </button>
        <button
          onClick={handleNext}
          // ✅ ปรับ className ตาม isCurrentPageComplete เหมือน Part 4
          className={`relative overflow-hidden px-8 py-3 rounded-xl font-bold transition-all duration-300 min-w-30 ${
            isCurrentPageComplete
              ? `${activeSolidBlue} text-white shadow-lg`
              : "bg-[#E0E0E0] text-[#A0A0A0] cursor-not-allowed"
          }`}
        >
          <span className="relative z-10">
            {currentPage === totalPages ? "บันทึกข้อมูลส่วนที่ 1" : "ถัดไป"}
          </span>
          {/* ✅ เพิ่ม Animation วงกลมขยายตัวเมื่อ Active */}
          {isCurrentPageComplete && (
            <div className="absolute left-1/2 bottom-0 w-[250%] pt-[250%] bg-[#0041C4] rounded-full -translate-x-1/2 translate-y-full group-hover:translate-y-[10%] transition-transform duration-500 ease-in-out z-0 pointer-events-none"></div>
          )}
        </button>
      </div>

      {/* --- Success Modal --- */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-4xl p-8 md:p-10 w-105 flex flex-col items-center shadow-2xl animate-in zoom-in-95 duration-200 mx-4">
            <div className="w-24 h-24 bg-[#87D068] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100">
              <Check className="w-12 h-12 text-white" strokeWidth={4} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              บันทึกข้อมูลตอนที่ 1 สำเร็จ !
            </h3>
            <p className="text-gray-500 mb-8 text-lg">
              ทำแบบสอบถามต่อใน{" "}
              <span className="text-[#1890FF] font-bold cursor-pointer hover:underline">
                ส่วนที่ 2
              </span>
            </p>
            <button
              onClick={handleConfirmNext}
              className="w-full max-w-50 py-3 bg-[#1890FF] text-white rounded-xl font-semibold shadow-lg shadow-blue-200 hover:bg-blue-600 hover:shadow-blue-300 transition-all transform hover:scale-105"
            >
              ถัดไป
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
