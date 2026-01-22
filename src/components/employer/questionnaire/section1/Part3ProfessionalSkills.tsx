"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  employerPart3Categories,
  professionalQuestions,
} from "@/data/employerMock";

interface PartProps {
  answers: Record<string, any>;
  onAnswer: (id: number | string, value: any) => void;
  onNextPart: () => void;
  onBackPart: () => void;
  onScrollToTop?: () => void;
}

export function Part3ProfessionalSkills({
  answers,
  onAnswer,
  onNextPart,
  onBackPart,
  onScrollToTop,
}: PartProps) {
  const [step, setStep] = useState(1);

  const selectedCategory = answers[employerPart3Categories.id];
  const subQuestions = professionalQuestions[selectedCategory] || [];
  const otherValue = answers[`${employerPart3Categories.id}_other`] || "";

  const labels = ["น้อยที่สุด", "น้อย", "ปานกลาง", "มาก", "มากที่สุด"];
  const activeSolidBlue = "bg-[#1890FF]";

  // ✅ ปรับ logic การเช็คความครบถ้วน: ถ้าเลือก "อื่น ๆ" ต้องกรอกช่อง text ด้วย
  const isComplete =
    step === 1
      ? selectedCategory !== undefined &&
        selectedCategory !== "" &&
        (selectedCategory === "other" ? otherValue.trim() !== "" : true)
      : subQuestions.every((q) => answers[q.id] !== undefined);

  const handleNext = () => {
    if (step === 1) {
      if (selectedCategory === "other" || subQuestions.length === 0) {
        onNextPart();
      } else {
        setStep(2);
        setTimeout(() => onScrollToTop?.(), 50);
      }
    } else {
      onNextPart();
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setTimeout(() => onScrollToTop?.(), 50);
    } else {
      onBackPart();
    }
  };

  return (
    <div className="flex flex-col h-full font-['Prompt']">
      <div className="flex-1 space-y-10 border border-gray-100 rounded-3xl p-6 md:p-10 bg-white shadow-sm">
        {/* --- Step 1: หน้าเลือกวิชาชีพ --- */}
        {step === 1 && (
          <div className="animate-in fade-in duration-500">
            {/* ✅ หัวข้อ Section สีฟ้า #2994FF */}
            <div className="mb-8 mt-4">
              <h2 className="text-[#2994FF] font-bold text-lg md:text-xl uppercase tracking-wide">
                {employerPart3Categories.label}
              </h2>
            </div>

            <div className="space-y-3">
              {(employerPart3Categories.options as any[]).map((opt) => {
                const isSelected = selectedCategory === opt.value;
                return (
                  <div key={opt.value} className="space-y-3">
                    <label
                      className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border-2 ${
                        isSelected
                          ? `${activeSolidBlue} border-[#1890FF] text-white shadow-md`
                          : "bg-white border-gray-200 hover:border-blue-300 text-gray-700"
                      }`}
                      onClick={() =>
                        onAnswer(employerPart3Categories.id, opt.value)
                      }
                    >
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? "border-white" : "border-gray-300"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-3 h-3 bg-white rounded-full animate-in zoom-in duration-300" />
                        )}
                      </div>
                      <span className="font-medium text-base">{opt.label}</span>
                    </label>

                    {/* ✅ ส่วน Input "อื่น ๆ": สไตล์ Solid Blue เมื่อมีข้อมูล และไม่มีเส้นซ้อน */}
                    {opt.withInput && isSelected && (
                      <div className="mt-3 ml-2 md:ml-4 pl-4 border-l-2 border-blue-200 animate-in slide-in-from-top-2 fade-in duration-300">
                        <div
                          className={`rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                            otherValue.trim() !== ""
                              ? "border-[#1890FF] bg-[#1890FF]"
                              : "border-gray-200 bg-white"
                          }`}
                        >
                          <input
                            type="text"
                            placeholder={
                              opt.placeholder || "โปรดระบุรายละเอียด"
                            }
                            value={otherValue}
                            onChange={(e) =>
                              onAnswer(
                                `${employerPart3Categories.id}_other`,
                                e.target.value,
                              )
                            }
                            className={`w-full px-4 py-3 outline-none text-base transition-all bg-transparent ${
                              otherValue.trim() !== ""
                                ? "text-white placeholder:text-white/60"
                                : "text-gray-700"
                            }`}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* --- Step 2: หน้าคำถามเฉพาะวิชาชีพ --- */}
        {step === 2 && (
          <div className="animate-in slide-in-from-right-4 duration-500">
            {/* ✅ หัวข้อ Section สีฟ้า #2994FF */}
            <div className="mb-10 mt-4">
              <h2 className="text-[#2994FF] font-bold text-lg md:text-xl uppercase tracking-wide">
                ทักษะทางวิชาชีพ:{" "}
                {
                  (employerPart3Categories.options as any[]).find(
                    (o) => o.value === selectedCategory,
                  )?.label
                }
              </h2>
            </div>

            {subQuestions.map((q, index) => (
              <div
                key={q.id}
                className="pb-10 border-b border-gray-50 last:border-0 last:pb-0 mb-10"
              >
                <div className="mb-2">
                  <span className="text-xs md:text-sm text-gray-400 font-light">
                    ข้อที่ {index + 1}
                  </span>
                </div>
                <div className="mb-8">
                  {/* ✅ หัวข้อคำถามสีดำล้วน */}
                  <h3 className="font-semibold text-lg md:text-xl text-black leading-relaxed">
                    {q.label} <span className="text-red-500">*</span>
                  </h3>
                </div>

                {/* ✅ เรทติ้งวงกลม Solid Blue ไม่มีจุดขาว */}
                <div className="grid grid-cols-5 gap-2 max-w-3xl mx-auto md:mx-0">
                  {[1, 2, 3, 4, 5].map((val, idx) => {
                    const sVal = val.toString();
                    const isSelected = answers[q.id] === sVal;
                    return (
                      <div
                        key={val}
                        className="flex flex-col items-center gap-3"
                      >
                        <button
                          onClick={() => onAnswer(q.id, sVal)}
                          className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            isSelected
                              ? `${activeSolidBlue} border-[#1890FF] text-white shadow-lg scale-110`
                              : "bg-white border-gray-100 text-gray-400 hover:border-blue-200"
                          }`}
                        >
                          <span className="text-lg md:text-2xl font-bold">
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
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 mt-12 pt-8 border-t border-gray-100">
        <button
          onClick={handleBack}
          className="w-full sm:w-auto px-10 py-3.5 rounded-xl border border-gray-300 text-gray-600 font-medium bg-white hover:bg-gray-50 transition-all"
        >
          ย้อนกลับ
        </button>
        <button
          onClick={handleNext}
          disabled={!isComplete}
          className={`w-full sm:w-auto px-12 py-3.5 rounded-xl font-bold text-white transition-all ${isComplete ? "bg-[#1890FF] shadow-lg shadow-blue-200 hover:shadow-blue-300" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
        >
          <span className="flex items-center justify-center gap-2">
            ถัดไป{" "}
            <ChevronRight
              size={20}
              className={!isComplete ? "opacity-50" : ""}
            />
          </span>
        </button>
      </div>
    </div>
  );
}
