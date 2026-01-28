"use client";

import { useCoreQuestionnaire } from "./useCoreQuestionnaire";
import { Question } from "@/data/employerMock";

interface UseEmployerQuestionnaireProps {
  questions: Question[];
  initialAnswers?: Record<string, any>;
  onComplete?: (answers: Record<string, any>) => void;
  onProgressChange?: (percent: number) => void;
  onAnswerChange?: (id: string | number, value: any) => void;
  startPage?: number;
}

export const useEmployerQuestionnaire = (props: UseEmployerQuestionnaireProps) => {
  return useCoreQuestionnaire<Question>(props);
};
