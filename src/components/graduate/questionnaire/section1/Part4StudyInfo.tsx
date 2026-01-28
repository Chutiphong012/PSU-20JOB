
"use client";

import { useCallback } from "react";
import {
  questionPart4,
  section1Structure,
} from "@/data/questionnaireMock";
import { QuestionnaireRenderer } from "@/components/graduate/questionnaire/QuestionnaireRenderer";

interface Part4Props {
  answers: Record<string, any>;
  onAnswer: (id: number, value: any) => void;
  onNextPart: (nextPart: number) => void;
  onBackPart: () => void;
  onProgressChange?: (percent: number) => void;
}

export function Part4StudyInfo({
  answers,
  onAnswer,
  onNextPart,
  onBackPart,
  onProgressChange,
}: Part4Props) {
  // Part 4 is Index 3
  const partInfo = section1Structure[3];

  const handleComplete = useCallback(
    (finalAnswers: Record<string, any>) => {
        // Part 4 usually goes to Part 5
        // Check if there is any skip logic in Part 4 (Question 34)
        const answer34 = finalAnswers[34];
        const question34 = questionPart4.find(q => q.id === 34);

        if (question34 && answer34) {
             const selectedOption = question34.options?.find((opt: any) => 
                typeof opt === "string" ? opt === answer34 : opt.value === answer34
             );
            if (selectedOption && typeof selectedOption === 'object' && 'skipToPart' in selectedOption && selectedOption.skipToPart) {
                onNextPart(selectedOption.skipToPart);
                return;
            }
        }
        
      onNextPart(5);
    },
    [onNextPart]
  );

  return (
    <QuestionnaireRenderer
      partInfo={partInfo}
      questions={questionPart4}
      initialAnswers={answers}
      onComplete={handleComplete}
      onBack={onBackPart}
      onProgressChange={onProgressChange}
    />
  );
}
