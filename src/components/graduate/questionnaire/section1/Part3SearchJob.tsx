
"use client";

import { useCallback } from "react";
import {
  questionPart3,
  section1Structure,
} from "@/data/questionnaireMock";
import { QuestionnaireRenderer } from "@/components/graduate/questionnaire/QuestionnaireRenderer";

interface Part3Props {
  answers: Record<string, any>;
  onAnswer: (id: number, value: any) => void;
  onNextPart: (nextPart: number) => void;
  onBackPart: () => void;
  onProgressChange?: (percent: number) => void;
}

export function Part3SearchJob({
  answers,
  onAnswer,
  onNextPart,
  onBackPart,
  onProgressChange,
}: Part3Props) {
  // Part 3 is Index 2
  const partInfo = section1Structure[2];

  const handleComplete = useCallback(
    (finalAnswers: Record<string, any>) => {
        // Check for skip logic in Part 3 (Question 29)
        const answer29 = finalAnswers[29];
        const question29 = questionPart3.find(q => q.id === 29);
        
        if (question29 && answer29) {
            const selectedOption = question29.options?.find((opt: any) => 
                typeof opt === "string" ? opt === answer29 : opt.value === answer29
             );
            if (selectedOption && typeof selectedOption === 'object' && 'skipToPart' in selectedOption && selectedOption.skipToPart) {
                onNextPart(selectedOption.skipToPart);
                return;
            }
        }
      onNextPart(4);
    },
    [onNextPart]
  );

  return (
    <QuestionnaireRenderer
      partInfo={partInfo}
      questions={questionPart3}
      initialAnswers={answers}
      onComplete={handleComplete}
      onBack={onBackPart}
      onProgressChange={onProgressChange}
    />
  );
}
