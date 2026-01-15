// src/components/graduate/questionnaire/parts/Part1GeneralInfo.tsx
"use client";

import { useState, useMemo } from "react";
import { ChevronDown, GraduationCap } from "lucide-react";
import { questionPart1 } from "@/data/questionnaireMock";

interface Part1Props {
  answers: Record<string, any>;
  onAnswer: (id: number, value: any) => void;
  progress: number;
  onNextPart: (nextPart: number) => void;
}

export function Part1GeneralInfo({
  answers,
  onAnswer,
  progress,
  onNextPart,
}: Part1Props) {
  const [currentPage, setCurrentPage] = useState(0);

  // จัดกลุ่มคำถาม
  const questionPages = useMemo(() => {
    const p1 = questionPart1.filter((q) => [4, 5, 6].includes(q.id));
    const p2 = questionPart1.filter((q) => q.id === 7);
    const p3 = questionPart1.filter((q) => [8, 9].includes(q.id));
    const p4 = questionPart1.filter((q) => [10, 11].includes(q.id));
    const p5 = questionPart1.filter((q) => q.id === 12);
    return [p1, p2, p3, p4, p5];
  }, []);

  const currentQuestions = questionPages[currentPage];
  const isLastPage = currentPage === questionPages.length - 1;

  // Logic ตรวจสอบว่าตอบครบหรือยัง (ใช้สำหรับเปลี่ยนสีปุ่มเท่านั้น)
  const isCurrentPageComplete = useMemo(() => {
    return currentQuestions.every((q) => {
      if (q.type === "address_group") {
        const addrData = answers[q.id];
        if (addrData && typeof addrData === "object") {
          return Object.values(addrData).some(
            (val: any) => val && val.toString().trim() !== ""
          );
        }
        return false;
      }
      return answers[q.id] && answers[q.id] !== "";
    });
  }, [currentQuestions, answers]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNext = () => {
    // --- เอา Alert ออกแล้ว เพื่อให้กดผ่านได้เลย ---

    if (currentPage < questionPages.length - 1) {
      setCurrentPage((prev) => prev + 1);
      scrollToTop();
    } else {
      // Skip Logic ข้อ 12 (ถ้าไม่ได้ตอบ จะ Default ไปส่วนที่ 2)
      const employmentAnswer = answers[12];
      const question12 = questionPart1.find((q) => q.id === 12);

      if (question12 && typeof employmentAnswer === "string") {
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
        // กรณีไม่ได้ตอบข้อ 12 ให้ไปส่วนที่ 2 เลย
        onNextPart(2);
      }
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      scrollToTop();
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[#1890FF] text-sm font-medium">
            ส่วนที่ 1 ภาวะการมีงานทำของบัณฑิต
          </span>
          <h1 className="text-[#1890FF] text-3xl font-bold mt-1">
            ตอนที่ 1 ข้อมูลทั่วไป
          </h1>
        </div>
        <div className="flex items-center gap-2 bg-white text-[#1890FF] px-4 py-1.5 rounded-full text-xs font-bold border border-[#1890FF] shadow-sm self-start md:self-center">
          <GraduationCap size={16} />
          In Progress
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-4">
        <div
          className="bg-[#1890FF] h-full rounded-full shadow-sm transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* --- Render Questions --- */}
      <div className="flex flex-col gap-6">
        {currentQuestions.map((question) => (
          <div
            key={question.id}
            className="border border-gray-100 rounded-2xl p-6 md:p-8 hover:shadow-sm transition-shadow bg-white"
          >
            <div className="mb-6">
              <span className="text-[#1890FF] text-sm font-bold block mb-1">
                ข้อที่ {question.id}
              </span>
              <h3 className="text-[#18305D] font-medium text-lg md:text-xl">
                {question.label}
              </h3>
            </div>

            {/* Case 1: Dropdown */}
            {question.type === "dropdown" && (
              <div className="relative max-w-full md:max-w-2xl">
                <select
                  className="w-full appearance-none border border-gray-200 rounded-xl px-4 py-3 text-gray-700 bg-white focus:outline-none focus:border-[#1890FF] focus:ring-4 focus:ring-[#1890FF]/10 cursor-pointer transition-all"
                  value={answers[question.id] || ""}
                  onChange={(e) => onAnswer(question.id, e.target.value)}
                >
                  <option className="text-gray-400" value="" disabled>
                    {question.placeholder}
                  </option>
                  {question.options?.map((opt: any) => {
                    const label = typeof opt === "string" ? opt : opt.label;
                    const val = typeof opt === "string" ? opt : opt.value;
                    return (
                      <option key={val} value={val}>
                        {label}
                      </option>
                    );
                  })}
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={20}
                />
              </div>
            )}

            {/* Case 2: Radio */}
            {question.type === "radio" && (
              <div
                className={`grid gap-4 ${
                  (question.options && question.options.length > 3) ||
                  question.id >= 8
                    ? "grid-cols-1"
                    : "grid-cols-1 md:grid-cols-3"
                }`}
              >
                {question.options?.map((opt: any, idx) => {
                  const label = typeof opt === "string" ? opt : opt.label;
                  const val = typeof opt === "string" ? opt : opt.value;
                  const isSelected = answers[question.id] === val;
                  const header = typeof opt === "object" ? opt.header : null;
                  const headerStyle =
                    typeof opt === "object" ? opt.headerStyle : "text-gray-500";

                  return (
                    <div key={idx} className="w-full">
                      {header && (
                        <div
                          className={`text-sm font-medium mb-3 mt-2 ${headerStyle}`}
                        >
                          {header}
                        </div>
                      )}
                      <label
                        className={`flex items-start md:items-center gap-4 border rounded-xl p-4 cursor-pointer transition-all group min-h-16
                                                ${
                                                  isSelected
                                                    ? "border-[#1890FF] bg-[#E6F7FF] shadow-[0_0_0_1px_#1890FF]"
                                                    : "border-gray-200 bg-white hover:border-[#1890FF] hover:bg-gray-50"
                                                }
                                            `}
                        onClick={() => onAnswer(question.id, val)}
                      >
                        <div
                          className={`mt-1 md:mt-0 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                                                ${
                                                  isSelected
                                                    ? "border-[#1890FF]"
                                                    : "border-gray-300 group-hover:border-[#1890FF]"
                                                }
                                            `}
                        >
                          <div
                            className={`w-2.5 h-2.5 bg-[#1890FF] rounded-full transition-transform duration-200 ${
                              isSelected ? "scale-100" : "scale-0"
                            }`}
                          ></div>
                        </div>
                        <span
                          className={`text-sm md:text-base font-medium transition-colors leading-snug ${
                            isSelected ? "text-[#1890FF]" : "text-gray-700"
                          }`}
                        >
                          {label}
                        </span>
                      </label>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Case 3: Address Group */}
            {question.type === "address_group" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-6 gap-y-6">
                {question.subFields?.map((field: any, idx) => {
                  const currentGroupData = answers[question.id] || {};
                  const currentValue = currentGroupData[field.name] || "";

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
                      <label className="block text-[#18305D] font-medium mb-2 text-sm">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-[#1890FF] transition-all"
                        placeholder={field.placeholder}
                        value={currentValue}
                        onChange={(e) => {
                          const newData = {
                            ...currentGroupData,
                            [field.name]: e.target.value,
                          };
                          onAnswer(question.id, newData);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="flex gap-4 justify-end mt-8 pt-6 border-t border-gray-100">
        <button
          onClick={handleBack}
          disabled={currentPage === 0}
          className={`px-8 py-3 rounded-xl border font-medium transition-colors min-w-30
                    ${
                      currentPage === 0
                        ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50"
                        : "border-gray-300 text-gray-600 hover:bg-gray-50 bg-white"
                    }`}
        >
          ย้อนกลับ
        </button>

        {/* ปุ่มถัดไป: 
                 - กดได้ตลอด (ไม่มี disabled) 
                 - สีเทา ถ้ายังตอบไม่ครบ 
                 - สีฟ้า ถ้าตอบครบ
             */}
        <button
          onClick={handleNext}
          className={`
                    relative overflow-hidden px-8 py-3 rounded-xl font-bold transition-all duration-300 group min-w-30 cursor-pointer
                    ${
                      isCurrentPageComplete
                        ? "bg-[#2F80ED] text-white shadow-lg shadow-blue-200"
                        : "bg-[#E0E0E0] text-[#A0A0A0] hover:bg-gray-300"
                    }
                `}
        >
          <span className="relative z-10">
            {isLastPage ? "ถัดไป" : "ถัดไป"}
          </span>

          {/* Animation: ขยายวงกลมเฉพาะเมื่อสีฟ้า (ตอบครบ) */}
          {isCurrentPageComplete && (
            <div
              className="absolute left-1/2 bottom-0 w-[250%] pt-[250%] bg-[#0041C4] rounded-full
                        -translate-x-1/2 translate-y-full group-hover:translate-y-[10%]
                        transition-transform duration-500 ease-in-out z-0 pointer-events-none"
            ></div>
          )}
        </button>
      </div>
    </div>
  );
}
