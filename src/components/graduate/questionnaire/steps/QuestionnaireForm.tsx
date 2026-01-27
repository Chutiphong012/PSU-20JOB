// src/components/graduate/questionnaire/QuestionnaireForm.tsx
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { InfoCheckStep } from "@/components/graduate/questionnaire/steps/InfoCheckStep";
import { SurveySuccessStep } from "@/components/graduate/questionnaire/steps/SurveySuccessStep";

import { Part1GeneralInfo } from "@/components/graduate/questionnaire/section1/Part1GeneralInfo";
import { Part2WorkInfo } from "@/components/graduate/questionnaire/section1/Part2WorkInfo";
import { Part3SearchJob } from "@/components/graduate/questionnaire/section1/Part3SearchJob";
import { Part4StudyInfo } from "@/components/graduate/questionnaire/section1/Part4StudyInfo";
import { Part5Suggestions } from "@/components/graduate/questionnaire/section1/Part5Suggestions";
import { Section2Assessment } from "@/components/graduate/questionnaire/section2/Section2Assessment";
import { assessmentData } from "@/data/assessmentMock"; // ✅ Import Mock Data

interface FormProps {
  onProgressUpdate?: (key: string, percent: number) => void;
  onPartComplete?: (partId: number) => void;
  onComplete?: () => void;
  initialStep?: "check" | "form" | "success";
  // ✅ เพิ่ม Callback สั่งเปิด Sidebar Section
  onRequestOpenSidebarSection?: (section: number) => void;
}

export function QuestionnaireForm({
  onProgressUpdate,
  onPartComplete,
  onComplete,
  initialStep = "check",
  onRequestOpenSidebarSection, // ✅ รับ Prop มาใช้
}: FormProps) {
  const [step, setStep] = useState<"check" | "form" | "success">(initialStep);
  const [currentPart, setCurrentPart] = useState(1);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [partHistory, setPartHistory] = useState<number[]>([]);

  const handleAnswerChange = (questionId: number | string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNextPart = (nextPartIndex: number) => {
    // ✅ 1. Logic จัดการ Skip Part: ถ้าข้าม Part ไหน ให้ Part นั้น Progress 100%
    if (nextPartIndex > currentPart + 1) {
      for (let i = currentPart + 1; i < nextPartIndex; i++) {
        // ส่ง update ว่า part ที่ถูกข้าม (เช่น part 3) เสร็จสมบูรณ์แล้ว
        onProgressUpdate?.(`part${i}`, 100);
      }
    }

    setPartHistory((prev) => [...prev, currentPart]);
    if (onPartComplete) onPartComplete(currentPart);

    // ✅ 2. Logic สั่งเปิด Sidebar Section 2: ถ้าจบ Part 5 แล้วไป Part 6
    if (currentPart === 5 && nextPartIndex === 6) {
      onRequestOpenSidebarSection?.(2);
    }

    setCurrentPart(nextPartIndex);
  };

  const handleBackPart = () => {
    if (partHistory.length > 0) {
      const newHistory = [...partHistory];
      const prevPart = newHistory.pop();
      setPartHistory(newHistory);
      if (prevPart) {
        // ✅ Logic ย้อนกลับ: ถ้ากลับไป Part 5 ให้เปิด Sidebar Section 1 คืน
        if (currentPart === 6 && prevPart === 5) {
          onRequestOpenSidebarSection?.(1);
        }
        setCurrentPart(prevPart);
      }
    } else {
      if (currentPart > 1) setCurrentPart(currentPart - 1);
    }
  };

  const handleFinalSubmit = () => {
    setStep("success");
    if (onComplete) {
      onComplete();
    }
  };

  // ✅ Wrapper Functions
  const handlePart1Progress = useCallback(
    (p: number) => onProgressUpdate?.("part1", p),
    [onProgressUpdate],
  );
  const handlePart2Progress = useCallback(
    (p: number) => onProgressUpdate?.("part2", p),
    [onProgressUpdate],
  );
  const handlePart3Progress = useCallback(
    (p: number) => onProgressUpdate?.("part3", p),
    [onProgressUpdate],
  );
  const handlePart4Progress = useCallback(
    (p: number) => onProgressUpdate?.("part4", p),
    [onProgressUpdate],
  );
  const handlePart5Progress = useCallback(
    (p: number) => onProgressUpdate?.("part5", p),
    [onProgressUpdate],
  );

  // ✅ 3. Effect คำนวณ Progress Section 2 แยกตาม Category
  useEffect(() => {
    if (currentPart === 6) {
      assessmentData.forEach((category) => {
        const totalQ = category.questions.length;
        const answeredQ = category.questions.filter(
          (q) => answers[q.id] !== undefined && answers[q.id] !== "",
        ).length;
        const percent =
          totalQ === 0 ? 0 : Math.round((answeredQ / totalQ) * 100);

        // ส่งค่า update ตาม id ของ category (เช่น soft_skills)
        onProgressUpdate?.(category.id, percent);
      });
    }
  }, [answers, currentPart, onProgressUpdate]);

  // ✅ Ref เพื่อ Scroll ขึ้นบนสุดเมื่อเปลี่ยน Part หรือ Step
  const formTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ใช้ setTimeout เพื่อให้แน่ใจว่า DOM ถูก Render เรียบร้อยแล้ว
    const timer = setTimeout(() => {
      // 1. Force Scroll ที่ Window ก่อน
      window.scrollTo({ top: 0, behavior: "smooth" });
      
      // 2. ถ้ามี Ref และ Window Scroll ไม่ทำงาน (เช่น อยู่ใน Container แยก) ให้ใช้ scrollIntoView
      if (formTopRef.current) {
         formTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50); // Delay เล็กน้อย

    return () => clearTimeout(timer);
  }, [currentPart, step]);

  return (
    <div 
      ref={formTopRef} 
      className="w-full grow bg-white rounded-none md:rounded-3xl shadow-sm border border-gray-100 p-4 md:p-8 h-fit min-h-150 font-['Prompt'] scroll-mt-24"
    >
      {step === "check" && <InfoCheckStep onNext={() => setStep("form")} />}

      {step === "form" && (
        <>
          {currentPart === 1 && (
            <Part1GeneralInfo
              answers={answers}
              onAnswer={handleAnswerChange}
              progress={0}
              onNextPart={handleNextPart}
              onProgressChange={handlePart1Progress}
            />
          )}
          {currentPart === 2 && (
            <Part2WorkInfo
              answers={answers}
              onAnswer={handleAnswerChange}
              onNextPart={handleNextPart}
              onBackPart={handleBackPart}
              onProgressChange={handlePart2Progress}
            />
          )}
          {currentPart === 3 && (
            <Part3SearchJob
              answers={answers}
              onAnswer={handleAnswerChange}
              onNextPart={handleNextPart}
              onBackPart={handleBackPart}
              onProgressChange={handlePart3Progress}
            />
          )}
          {currentPart === 4 && (
            <Part4StudyInfo
              answers={answers}
              onAnswer={handleAnswerChange}
              onNextPart={handleNextPart}
              onBackPart={handleBackPart}
              onProgressChange={handlePart4Progress}
            />
          )}
          {currentPart === 5 && (
            <Part5Suggestions
              answers={answers}
              onAnswer={handleAnswerChange}
              onNextPart={handleNextPart}
              onBackPart={handleBackPart}
              onProgressChange={handlePart5Progress}
            />
          )}
          {currentPart === 6 && (
            <Section2Assessment
              answers={answers}
              onAnswer={handleAnswerChange}
              onBackToSection1={handleBackPart}
              onSubmit={handleFinalSubmit}
              // ไม่ต้องส่ง onProgressChange แล้วเพราะคำนวณใน useEffect ด้านบน
            />
          )}
        </>
      )}

      {step === "success" && <SurveySuccessStep />}
    </div>
  );
}
