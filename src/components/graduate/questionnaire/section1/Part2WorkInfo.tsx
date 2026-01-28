
"use client";

import { useCallback } from "react";
import {
  questionPart2,
  section1Structure,
} from "@/data/questionnaireMock";
import { QuestionnaireRenderer } from "@/components/graduate/questionnaire/QuestionnaireRenderer";

interface Part2Props {
  answers: Record<string, any>;
  onAnswer: (id: number, value: any) => void;
  onNextPart: (nextPart: number) => void;
  onBackPart: () => void;
  onProgressChange?: (percent: number) => void;
}

export function Part2WorkInfo({
  answers,
  onAnswer,
  onNextPart,
  onBackPart,
  onProgressChange,
}: Part2Props) {
  // Part 2 is Index 1
  const partInfo = section1Structure[1];

  const handleComplete = useCallback(
    (finalAnswers: Record<string, any>) => {
       // Logic for skipping parts based on Question 21
       const answer21 = finalAnswers[21];
       const question21 = questionPart2.find((q) => q.id === 21);

       if (question21 && answer21) {
         const selectedOption = question21.options?.find((opt: any) => 
            typeof opt === "string" ? opt === answer21 : opt.value === answer21
         );

         if (selectedOption && typeof selectedOption === 'object' && 'skipToPart' in selectedOption && selectedOption.skipToPart) {
             onNextPart(selectedOption.skipToPart);
             return;
         }
       }

       // Default next
       onNextPart(3);
    },
    [onNextPart]
  );

  return (
    <QuestionnaireRenderer
      partInfo={partInfo}
      questions={questionPart2}
      initialAnswers={answers}
      onComplete={handleComplete}
      onBack={onBackPart}
      onProgressChange={onProgressChange}
    />
  );
}
