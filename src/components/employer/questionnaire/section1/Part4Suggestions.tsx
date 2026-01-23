"use client";

import { ChevronRight, ChevronDown } from "lucide-react";
import { employerPart4, Question } from "@/data/employerMock";

interface PartProps {
  answers: Record<string, any>;
  onAnswer: (id: number | string, value: any) => void;
  onBackPart: () => void;
  onComplete: () => void;
  onScrollToTop?: () => void;
}

export function Part4Suggestions({
  answers,
  onAnswer,
  onBackPart,
  onComplete,
}: PartProps) {
  const activeSolidBlue = "bg-[#1890FF]";

  const isAllFilled = employerPart4.every((q) => {
    if (!q.required) return true;
    const val = answers[q.id.toString()];
    return val !== undefined && val !== "" && val !== null;
  });

  const renderInput = (q: Question) => {
    const value = answers[q.id.toString()] || "";
    const isFilled = value.trim().length > 0;

    if (q.type === "textarea") {
      return (
        <div
          className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
            isFilled
              ? `border-[#1890FF] ${activeSolidBlue} shadow-md`
              : "border-gray-200 bg-white"
          }`}
        >
          <textarea
            rows={5}
            placeholder={q.placeholder}
            value={value}
            onChange={(e) => onAnswer(q.id.toString(), e.target.value)}
            className={`w-full p-6 outline-none text-lg resize-none transition-all duration-300 bg-transparent ${
              isFilled
                ? "text-white placeholder:text-white/60 font-medium"
                : "text-gray-700 placeholder:text-gray-300"
            }`}
          />
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
                      ? `${activeSolidBlue} border-[#1890FF] text-white shadow-sm`
                      : "bg-white border-gray-200 hover:border-blue-300 text-gray-700"
                  }`}
                  onClick={() => onAnswer(q.id.toString(), val)}
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? "border-white" : "border-gray-300"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-3 h-3 bg-white rounded-full animate-in zoom-in duration-300" />
                    )}
                  </div>
                  <span className="text-base font-medium">{label}</span>
                </label>

                {withInput && isSelected && (
                  <div className="mt-3 ml-2 md:ml-4 pl-4 border-l-2 border-blue-200 animate-in slide-in-from-top-2 duration-300">
                    <div
                      className={`rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                        answers[`${q.id}_other`]
                          ? `border-[#1890FF] ${activeSolidBlue}`
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <input
                        type="text"
                        placeholder={opt.placeholder || "โปรดระบุรายละเอียด"}
                        value={answers[`${q.id}_other`] || ""}
                        onChange={(e) =>
                          onAnswer(`${q.id}_other`, e.target.value)
                        }
                        className={`w-full px-4 py-3 outline-none bg-transparent ${
                          answers[`${q.id}_other`]
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
      );
    }
  };

  return (
    <div className="flex flex-col h-full font-['Prompt']">
      <div className="flex-1 space-y-10 border border-gray-100 rounded-3xl p-6 md:p-10 bg-white shadow-sm">
        <div className="animate-in fade-in duration-500">
          <div className="mb-8 mt-4">
            <h2 className="text-[#2994FF] font-semibold text-lg md:text-xl mb-2">
              ตอนที่ 4 ความคิดเห็น และข้อเสนอแนะ
            </h2>
            <p className="text-[#2B76E5] text-sm font-semibold italic">
              **กรุณากรอกข้อมูลให้ครบทุกข้อก่อนส่งแบบสอบถาม**
            </p>
          </div>

          <div className="space-y-12">
            {employerPart4.map((q, index) => (
              <div
                key={q.id}
                className="animate-in slide-in-from-bottom-4 duration-500"
              >
                <div className="mb-2">
                  <span className="text-xs md:text-sm text-gray-400 font-light">
                    ข้อที่ {index + 1}
                  </span>
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold text-lg md:text-xl text-black leading-snug">
                    {q.label}{" "}
                    {q.required && <span className="text-red-500">*</span>}
                  </h3>
                </div>
                {renderInput(q)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 mt-12 pt-8 border-t border-gray-100">
        <button
          onClick={onBackPart}
          className="w-full sm:w-49 px-10 py-3.5 rounded-xl border border-gray-300 text-gray-600 font-medium bg-white hover:bg-gray-50 transition-all"
        >
          ย้อนกลับ
        </button>
        <button
          onClick={onComplete}
          disabled={!isAllFilled}
          className={`w-full sm:w-49 group relative overflow-hidden px-12 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 ${
            !isAllFilled
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#1890FF] shadow-lg shadow-blue-200 hover:shadow-blue-300"
          }`}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            ส่งคำตอบ{" "}
          </span>
          {isAllFilled && (
            <span className="absolute left-1/2 bottom-0 w-100 h-100 bg-[#0060C0] rounded-full -translate-x-1/2 translate-y-1/2 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out z-0"></span>
          )}
        </button>
      </div>
    </div>
  );
}
