// src/components/graduate/questionnaire/section2/Section2Assessment.tsx
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { assessmentData, ratingOptions, assessmentPageContent } from "@/data/assessmentMock";
import GraduationCapGif from "@/assets/GraduationCap.gif";
import { Check, X } from "lucide-react";
import { WarningModal } from "@/components/common"; // ✅ เรียกใช้ Modal แจ้งเตือน
import { useTranslation } from "react-i18next";

interface Section2Props {
  answers: Record<string, any>;
  onAnswer: (id: string, value: any) => void;
  onBackToSection1: () => void;
  onSubmit: () => void;
  onProgressChange?: (percent: number) => void;
}

export function Section2Assessment({
  answers,
  onAnswer,
  onBackToSection1,
  onSubmit,
  onProgressChange,
}: Section2Props) {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false); // ✅ เพิ่ม State Warning
  const { t, i18n } = useTranslation("graduate");

  const currentCategory = assessmentData[currentCategoryIndex];
  const { theme } = currentCategory;
  const isLastCategory = currentCategoryIndex === assessmentData.length - 1;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentCategoryIndex]);

  const isQuestionAnswered = useCallback(
    (qId: string) => answers[qId] !== undefined && answers[qId] !== "",
    [answers],
  );

  const totalQuestions = useMemo(
    () => assessmentData.reduce((acc, cat) => acc + cat.questions.length, 0),
    [],
  );

  const answeredCount = useMemo(() => {
    let count = 0;
    assessmentData.forEach((cat) =>
      cat.questions.forEach((q) => {
        if (isQuestionAnswered(q.id)) count++;
      }),
    );
    return count;
  }, [answers, isQuestionAnswered]);

  const progressPercent =
    totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const isPartComplete = progressPercent === 100;

  useEffect(() => {
    onProgressChange?.(progressPercent);
  }, [progressPercent, onProgressChange]);

  const handleNext = () => {
    if (currentCategoryIndex < assessmentData.length - 1) {
      setCurrentCategoryIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // หน้าสุดท้ายแล้ว
      if (isPartComplete) {
        setShowSuccessModal(true);
      } else {
        // กรณีปุ่ม Next (submit) เปิดใช้งานแต่ยังทำไม่เสร็จ (เผื่อไว้)
        setShowWarningModal(true);
      }
    }
  };

  const handleConfirmSuccess = () => {
    setShowSuccessModal(false);
    onSubmit();
  };

  // ✅ แก้ไข Logic ปุ่มย้อนกลับ
  const handleBack = () => {
    if (currentCategoryIndex > 0) {
      // ถ้าย้อนกลับระหว่าง Category ใน Section 2 -> ย้อนได้ปกติ
      setCurrentCategoryIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // ถ้าอยู่หน้าแรกของ Section 2 และจะย้อนกลับไป Section 1
      if (isPartComplete) {
        // ถ้าทำเสร็จแล้ว ให้ย้อนได้
        onBackToSection1();
      } else {
        // ❌ ถ้ายังทำไม่เสร็จ ให้ขึ้น Warning Popup
        setShowWarningModal(true);
      }
    }
  };

  const isCurrentCategoryComplete = useMemo(() => {
    return currentCategory.questions.every((q) => isQuestionAnswered(q.id));
  }, [currentCategory, isQuestionAnswered]);

  const activeSolidBlue = "bg-[#2F80ED]";
  const inProgressGradient = "from-[#33CCCC] via-[#85EDFD] to-[#2994FF]";
  const completeGradient = "from-[#2995FD] via-[#5CE1E6] to-[#2995FD]";

  // ✅ Helper for LocalizedText
  const getLocalizedText = (obj: { th: string; en: string } | string) => {
    if (typeof obj === "string") return t(obj); // Fallback if it's a key
    return i18n.language === "en" ? obj.en : obj.th;
  };

  return (
    <div className="flex flex-col gap-4 md:gap-6 animate-in fade-in duration-300 font-['Prompt'] relative p-1 md:p-0">
      {/* Header & Progress Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
        <div className="text-left">
          <span className="text-[#1890FF] text-xs md:text-sm font-medium">
            {t("questionnaire.instruction.sections.part_2")}
          </span>
          <h1 className="text-[#1890FF] text-2xl md:text-3xl font-bold mt-1 leading-tight">
            {getLocalizedText(assessmentPageContent.title)}
          </h1>
          <p className="text-[#1890FF] text-sm md:text-base mt-2 opacity-80 leading-relaxed">
            {getLocalizedText(assessmentPageContent.description)}
          </p>
        </div>
        <div className="relative mt-2 md:mt-0 self-start md:self-center shrink-0">
          {isPartComplete ? (
            <div className="relative group overflow-hidden rounded-full min-w-30 md:min-w-35 h-8 md:h-8.5 flex items-center justify-center">
              <div
                className={`absolute inset-0 bg-linear-to-r ${completeGradient} animate-shimmer-ltr`}
              />
              <span className="relative z-10 text-xs md:text-sm text-white pt-0.5 font-bold">
                Complete
              </span>
            </div>
          ) : (
            <div className="relative group h-8 md:h-8.5 min-w-30 md:min-w-35 flex items-center justify-center">
              <div
                className={`absolute inset-0 rounded-full bg-linear-to-r ${inProgressGradient} animate-shimmer-ltr p-[1.5px]`}
              >
                <div className="h-full w-full bg-white rounded-full"></div>
              </div>
              <div className="relative flex items-center justify-center px-4 md:px-8 overflow-hidden h-full">
                <span
                  className={`text-xs md:text-sm font-bold bg-linear-to-r ${inProgressGradient} bg-clip-text text-transparent animate-shimmer-ltr pt-1`}
                >
                  In Progress
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

      <div className="w-full bg-gray-100 h-2 md:h-2.5 rounded-full overflow-hidden mb-2 md:mb-4">
        <div
          className="bg-[#1890FF] h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Category Header */}
      <div className="mt-2 mb-2 md:mb-4">
        <h2
          className="text-xl md:text-3xl font-bold flex flex-wrap items-center gap-2 transition-colors duration-300"
          style={{ color: theme.main }}
        >
          {getLocalizedText(currentCategory.title)}
          <span className="text-lg md:text-xl font-normal opacity-80 text-gray-400">
            {getLocalizedText(currentCategory.subTitle)}
          </span>
        </h2>
      </div>

      {/* Questions List */}
      <div className="flex flex-col gap-6 md:gap-8">
        {currentCategory.questions.map((q, index) => {
          const answered = isQuestionAnswered(q.id);
          return (
            <div
              key={q.id}
              className={`relative rounded-2xl md:rounded-3xl p-0.5 transition-all duration-300 ${
                answered
                  ? "bg-transparent"
                  : `bg-gray-100 hover:bg-linear-to-r hover:${theme.gradientClass}`
              }`}
            >
              <div
                className="relative rounded-[calc(1rem-2px)] md:rounded-[calc(1.5rem-2px)] p-5 md:p-8 h-full transition-colors duration-300"
                style={{
                  backgroundColor: answered ? theme.bgAnswered : "#FFFFFF",
                }}
              >
                <div className="mb-6 md:mb-8">
                  <span
                    className="text-xs md:text-sm font-bold block mb-1 md:mb-2 transition-colors duration-300"
                    style={{ color: theme.main }}
                  >
                    ข้อที่ {index + 1}
                  </span>
                  <h3 className="text-[#18305D] font-medium text-base md:text-xl leading-snug">
                    {getLocalizedText(q.label)}
                  </h3>
                </div>

                {/* 1-5 Rating - Responsive Grid */}
                <div className="grid grid-cols-5 gap-1 md:gap-4 md:px-12 max-w-4xl mx-auto">
                  {ratingOptions.map((opt) => {
                    const isSelected = answers[q.id] === opt.value;
                    return (
                      <div
                        key={opt.value}
                        className="flex flex-col items-center gap-2 md:gap-3 group cursor-pointer"
                      >
                        <button
                          type="button"
                          onClick={() => onAnswer(q.id, opt.value)}
                          style={
                            isSelected
                              ? {
                                  backgroundColor: theme.main,
                                  borderColor: theme.main,
                                  color: "white",
                                  boxShadow:
                                    "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                  transform: "scale(1.05)",
                                }
                              : {}
                          }
                          className={`w-10 h-10 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center text-base md:text-lg font-bold transition-all duration-300 ${
                            !isSelected
                              ? "border-gray-200 text-gray-400 bg-white hover:border-gray-300"
                              : ""
                          }`}
                        >
                          {opt.value}
                        </button>
                        <span
                          className="text-[9px] md:text-xs font-medium text-center leading-tight transition-colors duration-300"
                          style={{ color: isSelected ? theme.main : "#9CA3AF" }}
                        >
                          {getLocalizedText(opt.label)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Navigation Buttons */}
      <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-4 justify-end mt-6 md:mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={handleBack}
          className="w-full md:w-auto px-8 py-3 rounded-xl border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 md:min-w-30 transition-colors bg-white"
        >
          ย้อนกลับ
        </button>

        <button
          onClick={handleNext}
          className={`group relative overflow-hidden w-full md:w-auto px-8 py-3 rounded-xl font-bold transition-all duration-300 md:min-w-30 ${
            isCurrentCategoryComplete
              ? `${activeSolidBlue} text-white shadow-lg`
              : "bg-[#E0E0E0] text-[#A0A0A0] cursor-not-allowed"
          }`}
          disabled={!isCurrentCategoryComplete}
        >
          <span className="relative z-10">
            {isLastCategory ? "บันทึกข้อมูล" : "ถัดไป"}
          </span>
          {isCurrentCategoryComplete && (
            <div className="absolute left-1/2 bottom-0 w-[250%] pt-[250%] bg-[#0041C4] rounded-full -translate-x-1/2 translate-y-full group-hover:translate-y-[10%] transition-transform duration-500 ease-in-out z-0 pointer-events-none"></div>
          )}
        </button>
      </div>

      {/* ✅ เรียกใช้ Warning Modal */}
      <WarningModal
        isOpen={showWarningModal}
        onClose={() => setShowWarningModal(false)}
      />

      {/* Modal Success */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 font-['Prompt'] p-4">
          <div className="relative bg-white rounded-3xl md:rounded-4xl w-full max-w-125 md:max-w-225 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-3 right-3 md:top-4 md:right-4 z-20 bg-black/10 hover:bg-black/20 text-white rounded-full p-1 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="relative h-24 md:h-32 w-full bg-[#4DD0E1] overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-[#26C6DA] to-[#4DD0E1]"></div>
              <div className="absolute -bottom-12 md:-bottom-16 left-[-10%] right-[-10%] h-24 md:h-32 bg-white rounded-[100%]"></div>
            </div>

            <div className="absolute top-10 md:top-14 left-1/2 -translate-x-1/2 z-10">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full p-2 shadow-sm flex items-center justify-center">
                <div className="w-full h-full bg-[#26C6DA] rounded-full flex items-center justify-center">
                  <Check
                    className="w-10 h-10 md:w-12 md:h-12 text-white"
                    strokeWidth={5}
                  />
                </div>
              </div>
            </div>

            <div className="pt-12 md:pt-16 pb-8 md:pb-10 px-6 md:px-16 text-center">
              <h3 className="text-xl md:text-3xl font-bold text-[#1976D2] mb-2 md:mb-3">
                บันทึกข้อมูลสำเร็จ !
              </h3>
              <p className="text-[#1976D2] text-xs md:text-base mb-6 md:mb-8 font-medium">
                มหาวิทยาลัยสงขลานครินทร์
                ขอขอบคุณทุกท่านที่ให้ความร่วมมือเป็นอย่างดี
              </p>

              <p className="text-gray-500 text-xs md:text-sm mb-6 md:mb-8 leading-relaxed whitespace-pre-line px-2">
                คลิกปุ่ม <span className="font-bold text-[#1976D2]">ถัดไป</span>{" "}
                เพื่อไปยังหน้าแสดง
                เอกสารประกอบการรายงานตัวเข้ารับพระราชทานปริญญาบัตร{"\n"}
                หรือ สามารถพิมพ์เอกสารได้ในภายหลัง โดยไปที่หัวข้อ{" "}
                <span className="font-bold text-[#1976D2]">
                  สถานะการตอบแบบสอบถาม
                </span>{" "}
                ในหน้าโปรไฟล์ของบัณฑิต
              </p>

              <button
                onClick={handleConfirmSuccess}
                className={`group relative overflow-hidden w-full md:max-w-50 py-3 ${activeSolidBlue} text-white rounded-xl font-bold text-base md:text-lg shadow-lg transition-all transform active:scale-95 md:hover:scale-105`}
              >
                <span className="relative z-10">ถัดไป</span>
                <div className="absolute left-1/2 bottom-0 w-[250%] pt-[250%] bg-[#0041C4] rounded-full -translate-x-1/2 translate-y-full md:group-hover:translate-y-[10%] transition-transform duration-500 ease-in-out z-0 pointer-events-none"></div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
