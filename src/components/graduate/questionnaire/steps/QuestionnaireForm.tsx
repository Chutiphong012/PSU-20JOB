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
import { assessmentStructure, questionsAssessment } from "@/data/assessmentMock";

interface FormProps {
  onProgressUpdate?: (key: string, percent: number) => void;
  onPartComplete?: (partId: number) => void;
  onComplete?: () => void;
  initialStep?: "check" | "form" | "success";
  onRequestOpenSidebarSection?: (section: number) => void;
  externalCurrentPart?: number;
  onPartChange?: (part: number) => void;
}

export function QuestionnaireForm({
  onProgressUpdate,
  onPartComplete,
  onComplete,
  initialStep = "check",
  onRequestOpenSidebarSection,
  externalCurrentPart,
  onPartChange,
}: FormProps) {
  const [step, setStep] = useState<"check" | "form" | "success">(initialStep);
  const [currentPart, setCurrentPart] = useState(1);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [partHistory, setPartHistory] = useState<number[]>([]);

  // Sync External State -> Internal State
  useEffect(() => {
    if (externalCurrentPart !== undefined && externalCurrentPart !== currentPart) {
        setCurrentPart(externalCurrentPart);
    }
  }, [externalCurrentPart]);

  const changePart = (newPart: number) => {
      setCurrentPart(newPart);
      onPartChange?.(newPart);
  };

  const handleAnswerChange = (questionId: number | string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNextPart = (nextPartIndex: number) => {
    // Skip Logic: If skipping parts, mark them as 100% progress
    if (nextPartIndex > currentPart + 1) {
      for (let i = currentPart + 1; i < nextPartIndex; i++) {
        onProgressUpdate?.(`part${i}`, 100);
      }
    }

    setPartHistory((prev) => [...prev, currentPart]);
    if (onPartComplete) onPartComplete(currentPart);

    if (currentPart === 5 && nextPartIndex === 6) {
      onRequestOpenSidebarSection?.(2);
    }

    changePart(nextPartIndex);
  };

  const handleBackPart = () => {
    if (partHistory.length > 0) {
      const newHistory = [...partHistory];
      const prevPart = newHistory.pop();
      setPartHistory(newHistory);
      if (prevPart) {
        // Back Logic: If going back from Part 6 (Sec 2) to Part 5, reopen Sidebar Section 1
        if (currentPart === 6 && prevPart === 5) {
          onRequestOpenSidebarSection?.(1);
        }
        changePart(prevPart);
      }
    } else {
      if (currentPart > 1) changePart(currentPart - 1);
    }
  };

  const handleFinalSubmit = () => {
    setStep("success");
    if (onComplete) {
      onComplete();
    }
  };

  // Wrapper Functions
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

  // 3. Effect: Calculate Section 2 Progress by Category
  useEffect(() => {
    if (currentPart === 6) {
      assessmentStructure.forEach((category, index) => {
        const page = index + 1;
        const categoryQuestions = questionsAssessment.filter((q) => q.page === page);
        const totalQ = categoryQuestions.length;
        const answeredQ = categoryQuestions.filter(
          (q) => {
             // Check if answer exists and is not empty (loose check for string/number)
             const val = answers[q.id as string]; 
             return val !== undefined && val !== "" && val !== null;
          }
        ).length;
        const percent =
          totalQ === 0 ? 0 : Math.round((answeredQ / totalQ) * 100);

        // ส่งค่า update ตาม id ของ category (เช่น soft_skills)
        onProgressUpdate?.(category.id as string, percent);
      });
    }
  }, [answers, currentPart, onProgressUpdate]);

  // Ref to scroll to top when Part or Step changes
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
