"use client";

import { employerPart1, employerStructure } from "@/data/employerMock";
import { EmployerQuestionnaireRenderer } from "../EmployerQuestionnaireRenderer";

interface PartProps {
  answers: Record<string, any>;
  onAnswer: (id: number | string, value: any) => void;
  onNextPart: () => void;
  onScrollToTop?: () => void;
}

export function Part1GeneralInfo({
  answers,
  onAnswer,
  onNextPart,
}: PartProps) {
  return (
    <EmployerQuestionnaireRenderer
      partInfo={employerStructure[0]}
      questions={employerPart1}
      initialAnswers={answers}
      onComplete={onNextPart}
      onBack={() => {}} // Part 1 has no back
      onAnswerChange={onAnswer}
      startPage={1}
    />
  );
}
