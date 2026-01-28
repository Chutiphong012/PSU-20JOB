"use client";

import { employerPart2, employerStructure } from "@/data/employerMock";
import { EmployerQuestionnaireRenderer } from "../EmployerQuestionnaireRenderer";

interface PartProps {
  answers: Record<string, any>;
  onAnswer: (id: number | string, value: any) => void;
  onNextPart: () => void;
  onBackPart: () => void;
  onScrollToTop?: () => void;
}

export function Part2Satisfaction({
  answers,
  onAnswer,
  onNextPart,
  onBackPart,
}: PartProps) {
  return (
    <EmployerQuestionnaireRenderer
      partInfo={employerStructure[1]}
      questions={employerPart2}
      initialAnswers={answers}
      onComplete={onNextPart}
      onBack={onBackPart}
      onAnswerChange={onAnswer}
      startPage={4}
    />
  );
}
