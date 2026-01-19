  // src/components/graduate/questionnaire/QuestionnaireForm.tsx
  "use client";

  import { useState, useCallback } from "react";
  import { InfoCheckStep } from "@/components/graduate/questionnaire/steps/InfoCheckStep";
  import { SurveySuccessStep } from "@/components/graduate/questionnaire/steps/SurveySuccessStep";

  import { Part1GeneralInfo } from "@/components/graduate/questionnaire/section1/Part1GeneralInfo";
  import { Part2WorkInfo } from "@/components/graduate/questionnaire/section1/Part2WorkInfo";
  import { Part3SearchJob } from "@/components/graduate/questionnaire/section1/Part3SearchJob";
  import { Part4StudyInfo } from "@/components/graduate/questionnaire/section1/Part4StudyInfo";
  import { Part5Suggestions } from "@/components/graduate/questionnaire/section1/Part5Suggestions";
  import { Section2Assessment } from "@/components/graduate/questionnaire/section2/Section2Assessment";

  interface FormProps {
    onProgressUpdate?: (partId: number, percent: number) => void;
    onPartComplete?: (partId: number) => void;
    onComplete?: () => void;
    initialStep?: "check" | "form" | "success"; // รับค่าหน้าเริ่มต้น
  }

  export function QuestionnaireForm({
    onProgressUpdate,
    onPartComplete,
    onComplete,
    initialStep = "check",
  }: FormProps) {
    // กำหนด Step ตามค่าที่ไฟล์แม่ส่งมา
    const [step, setStep] = useState<"check" | "form" | "success">(initialStep);
    const [currentPart, setCurrentPart] = useState(1);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [partHistory, setPartHistory] = useState<number[]>([]);

    const handleAnswerChange = (questionId: number | string, value: any) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    };

    const handleNextPart = (nextPartIndex: number) => {
      setPartHistory((prev) => [...prev, currentPart]);
      if (onPartComplete) onPartComplete(currentPart);
      setCurrentPart(nextPartIndex);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBackPart = () => {
      if (partHistory.length > 0) {
        const newHistory = [...partHistory];
        const prevPart = newHistory.pop();
        setPartHistory(newHistory);
        if (prevPart) {
          setCurrentPart(prevPart);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        if (currentPart > 1) setCurrentPart(currentPart - 1);
      }
    };

    const handleFinalSubmit = () => {
      setStep("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (onComplete) {
        onComplete(); // บอกไฟล์แม่ให้ซ่อน Sidebar
      }
    };

    const handlePart1Progress = useCallback(
      (p: number) => onProgressUpdate?.(1, p),
      [onProgressUpdate]
    );
    const handlePart2Progress = useCallback(
      (p: number) => onProgressUpdate?.(2, p),
      [onProgressUpdate]
    );
    const handlePart3Progress = useCallback(
      (p: number) => onProgressUpdate?.(3, p),
      [onProgressUpdate]
    );
    const handlePart4Progress = useCallback(
      (p: number) => onProgressUpdate?.(4, p),
      [onProgressUpdate]
    );
    const handlePart5Progress = useCallback(
      (p: number) => onProgressUpdate?.(5, p),
      [onProgressUpdate]
    );

    return (
      <div className="w-full grow bg-white rounded-none md:rounded-3xl shadow-sm border border-gray-100 p-4 md:p-8 h-fit min-h-150 font-['Prompt']">
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
                onProgressChange={(percent) => onProgressUpdate?.(6, percent)}
              />
            )}
          </>
        )}

        {step === "success" && <SurveySuccessStep />}
      </div>
    );
  }
