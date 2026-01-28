"use client";

import { employerPart4, employerStructure } from "@/data/employerMock";
import { EmployerQuestionnaireRenderer } from "../EmployerQuestionnaireRenderer";

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
  return (
    <EmployerQuestionnaireRenderer
      partInfo={employerStructure[3]}
      questions={employerPart4}
      initialAnswers={answers}
      onComplete={onComplete}
      onBack={onBackPart}
      onAnswerChange={onAnswer}
      isLastPart={true}
      startPage={9}
    />
  );
}
