// src/components/graduate/questionnaire/QuestionnaireForm.tsx
"use client";

import { useState, useEffect } from "react";
import { InfoCheckStep } from "@/components/graduate/questionnaire/steps/InfoCheckStep";
import { Part1GeneralInfo } from "@/components/graduate/questionnaire/parts/Part1GeneralInfo";
import { questionPart1 } from "@/data/questionnaireMock";

// 1. เพิ่ม Interface สำหรับรับ Props จาก Parent
interface FormProps {
  onProgressUpdate?: (percent: number) => void;
  onPartComplete?: (partId: number) => void;
}

// 2. รับ Props เข้ามาในฟังก์ชัน
export function QuestionnaireForm({
  onProgressUpdate,
  onPartComplete,
}: FormProps) {
  const [step, setStep] = useState<"check" | "form">("check");
  const [currentPart, setCurrentPart] = useState(1);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [progress, setProgress] = useState(0);

  // คำนวณ Progress ทุกครั้งที่ answers เปลี่ยน
  useEffect(() => {
    const part1Ids = questionPart1.map((q) => q.id);
    const answeredCount = part1Ids.filter(
      (id) => answers[id] !== undefined && answers[id] !== ""
    ).length;
    const totalCount = part1Ids.length;

    const percent = Math.round((answeredCount / totalCount) * 100);
    setProgress(percent);

    // 3. ส่งค่า percent กลับไปที่ Parent เพื่ออัปเดต Sidebar
    if (onProgressUpdate) {
      onProgressUpdate(percent);
    }
  }, [answers, onProgressUpdate]);

  const handleAnswerChange = (questionId: number, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handlePartComplete = (nextPartIndex: number) => {
    console.log("Moving to part:", nextPartIndex);

    // 4. แจ้ง Parent ว่า Part ปัจจุบันทำเสร็จแล้ว (เพื่อให้ Sidebar ขึ้นติ๊กถูก)
    if (currentPart === 1 && onPartComplete) {
      onPartComplete(1);
    }

    setCurrentPart(nextPartIndex);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="grow bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 h-fit min-h-150 font-['Prompt']">
      {step === "check" ? (
        <InfoCheckStep onNext={() => setStep("form")} />
      ) : (
        <>
          {currentPart === 1 && (
            <Part1GeneralInfo
              answers={answers}
              onAnswer={handleAnswerChange}
              progress={progress}
              onNextPart={handlePartComplete}
            />
          )}

          {/* ... (Parts อื่นๆ เหมือนเดิม) ... */}
          {currentPart === 2 && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-[#1890FF]">
                ส่วนที่ 2: การสมัครงานและการทำงาน
              </h2>
              <p className="text-gray-500 mt-2">(สำหรับผู้มีงานทำแล้ว)</p>
              <button
                onClick={() => setCurrentPart(1)}
                className="mt-4 px-4 py-2 border rounded"
              >
                กลับ
              </button>
            </div>
          )}

          {currentPart === 3 && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-[#1890FF]">
                ส่วนที่ 3: การหางาน
              </h2>
              <p className="text-gray-500 mt-2">(สำหรับผู้ที่ยังไม่ได้ทำงาน)</p>
              <button
                onClick={() => setCurrentPart(1)}
                className="mt-4 px-4 py-2 border rounded"
              >
                กลับ
              </button>
            </div>
          )}

          {currentPart === 4 && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-[#1890FF]">
                ส่วนที่ 4: การศึกษาต่อ
              </h2>
              <button
                onClick={() => setCurrentPart(1)}
                className="mt-4 px-4 py-2 border rounded"
              >
                กลับ
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
