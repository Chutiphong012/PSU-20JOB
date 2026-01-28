"use client";

import { useCoreQuestionnaire } from "./useCoreQuestionnaire";
import { Question } from "@/data/questionnaireMock";

interface UseQuestionnaireProps {
  questions: Question[];
  initialAnswers?: Record<string, any>;
  onComplete?: (answers: Record<string, any>) => void;
  onProgressChange?: (percent: number) => void;
}

export const useQuestionnaire = (props: UseQuestionnaireProps) => {
  return useCoreQuestionnaire<Question>({
    ...props,
    startPage: 1
  });
};
