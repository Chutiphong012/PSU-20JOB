// src/components/graduate/questionnaire/QuestionnaireForm.tsx
"use client";

import { useState, useCallback } from "react"; 
import { InfoCheckStep } from "@/components/graduate/questionnaire/steps/InfoCheckStep";
import { Part1GeneralInfo } from "@/components/graduate/questionnaire/parts/Part1GeneralInfo";
import { Part2WorkInfo } from "@/components/graduate/questionnaire/parts/Part2WorkInfo";
import { Part3SearchJob } from "@/components/graduate/questionnaire/parts/Part3SearchJob"; 

interface FormProps {
  onProgressUpdate?: (partId: number, percent: number) => void;
  onPartComplete?: (partId: number) => void;
}

export function QuestionnaireForm({
  onProgressUpdate,
  onPartComplete,
}: FormProps) {
  const [step, setStep] = useState<"check" | "form">("check");
  const [currentPart, setCurrentPart] = useState(1);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const handleAnswerChange = (questionId: number, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handlePartComplete = (nextPartIndex: number) => {
    console.log("Moving to part:", nextPartIndex);
    if (onPartComplete) {
      onPartComplete(currentPart);
    }
    setCurrentPart(nextPartIndex);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Wrapper Functions ที่เสถียร (Stable Handlers)
  const handlePart1Progress = useCallback((percent: number) => {
      onProgressUpdate?.(1, percent);
  }, [onProgressUpdate]);

  const handlePart2Progress = useCallback((percent: number) => {
      onProgressUpdate?.(2, percent);
  }, [onProgressUpdate]);

  const handlePart3Progress = useCallback((percent: number) => {
      onProgressUpdate?.(3, percent);
  }, [onProgressUpdate]);

  return (
    <div className="w-full grow bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 h-fit min-h-150 font-['Prompt']">
      {step === "check" ? (
        <InfoCheckStep onNext={() => setStep("form")} />
      ) : (
        <>
          {/* --- Part 1 --- */}
          {currentPart === 1 && (
            <Part1GeneralInfo
              answers={answers}
              onAnswer={handleAnswerChange}
              progress={0} 
              onNextPart={handlePartComplete}
              // ✅✅✅ ใส่ Props ตรงนี้ครับ (ของเดิมหายไป)
              onProgressChange={handlePart1Progress} 
            />
          )}

          {/* --- Part 2 --- */}
          {currentPart === 2 && (
            <Part2WorkInfo
              answers={answers}
              onAnswer={handleAnswerChange}
              onNextPart={handlePartComplete}
              onBackPart={() => setCurrentPart(1)}
              // ✅✅✅ ใส่ Props ตรงนี้
              onProgressChange={handlePart2Progress}
            />
          )}

          {/* --- Part 3 --- */}
          {currentPart === 3 && (
            <Part3SearchJob
              answers={answers}
              onAnswer={handleAnswerChange}
              onNextPart={handlePartComplete}
              onBackPart={() => setCurrentPart(2)} 
              // ✅✅✅ ใส่ Props ตรงนี้
              onProgressChange={handlePart3Progress}
            />
          )}

          {/* --- Part 4 --- */}
          {currentPart === 4 && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-[#1890FF]">ส่วนที่ 4: การศึกษาต่อ</h2>
              <p className="text-gray-500 mt-2">(สำหรับผู้ที่ต้องการศึกษาต่อ)</p>
              <button onClick={() => setCurrentPart(3)} className="mt-4 px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200">ย้อนกลับ</button>
            </div>
          )}

          {/* --- Part 5 --- */}
          {currentPart === 5 && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-[#1890FF]">ส่วนที่ 5: ข้อเสนอแนะ</h2>
              <p className="text-gray-500 mt-2">(สิ้นสุดแบบสอบถาม)</p>
              <button onClick={() => setCurrentPart(3)} className="mt-4 px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200">ย้อนกลับ</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}