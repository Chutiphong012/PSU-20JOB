
"use client";

import { useCallback } from "react";
import {
  questionPart1,
  section1Structure,
} from "@/data/questionnaireMock";
import { QuestionnaireRenderer } from "@/components/graduate/questionnaire/QuestionnaireRenderer";

interface Part1Props {
  answers: Record<string, any>;
  onAnswer: (id: number, value: any) => void;
  onNextPart: (nextPart: number) => void;
  progress: number; // Not used in Renderer but kept for interface compatibility if needed
  onProgressChange?: (percent: number) => void;
}

export function Part1GeneralInfo({
  answers,
  onAnswer,
  onNextPart,
  onProgressChange,
}: Part1Props) {
  // Part 1 is Index 0
  const partInfo = section1Structure[0];

  const handleComplete = useCallback(
    (finalAnswers: Record<string, any>) => {
      // Logic for skipping parts based on Question 12 (Employment Status)
      const employmentAnswer = finalAnswers[12];
      const question12 = questionPart1.find((q) => q.id === 12);

      if (question12 && employmentAnswer) {
        const selectedOption = question12.options?.find((opt: any) =>
          typeof opt === "string"
            ? opt === employmentAnswer
            : opt.value === employmentAnswer
        );
        
        // If option is found and has skipToPart, use it
        if (selectedOption && typeof selectedOption === 'object' && 'skipToPart' in selectedOption && selectedOption.skipToPart) {
           onNextPart(selectedOption.skipToPart);
           return;
        }
      }
      
      // Default next part
      onNextPart(2);
    },
    [onNextPart]
  );

  return (
    <QuestionnaireRenderer
      partInfo={partInfo}
      questions={questionPart1}
      initialAnswers={answers}
      onComplete={handleComplete}
      onBack={() => {}} // No back from Part 1 (handled by parent usually disabling back button or doing nothing)
      onProgressChange={onProgressChange}
    />
  );
}
