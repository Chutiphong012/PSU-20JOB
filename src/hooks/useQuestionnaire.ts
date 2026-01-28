
import { useState, useMemo, useCallback, useEffect } from "react";
import { Question } from "@/data/questionnaireMock";

interface UseQuestionnaireProps {
  questions: Question[];
  initialAnswers?: Record<string, any>;
  onComplete?: (answers: Record<string, any>) => void;
  onProgressChange?: (percent: number) => void;
}

export const useQuestionnaire = ({
  questions,
  initialAnswers = {},
  onComplete,
  onProgressChange,
}: UseQuestionnaireProps) => {
  const [answers, setAnswers] = useState<Record<string, any>>(initialAnswers);
  const [currentPage, setCurrentPage] = useState(1);

  // Helper: Check if a question is disabled
  const isQuestionDisabled = useCallback(
    (question: Question) => {
      if (!question.disabledCondition) return false;
      const { questionId, value } = question.disabledCondition;
      // Check if the dependency matches the value that disables this question
      // Note: Logic logic depends on how disabledCondition is defined.
      // Based on Part1GeneralInfo: if answers[qId] === value -> disabled
      // But commonly it's: if answers[qId] !== value -> disabled (dependent on specific value)
      // Let's re-verify logic from old code:
      // const { questionId, value } = question.disabledCondition;
      // return answers[questionId] === value; 
      // This implies: "If question X has answer Y, then THIS question is DISABLED"
      
      return answers[questionId] === value;
    },
    [answers]
  );

  // Helper: Check if a question is answered
  const isQuestionAnswered = useCallback(
    (q: Question) => {
      // If disabled, we treat it as "not needing answer" but strictly speaking for progress it is "done"
      // But for "is answered" check usually we check if it has value.
      // Let's follow original logic:
      if (isQuestionDisabled(q)) return true; // Disabled questions count as answered/skipped

      if (q.type === "address_group" || (q.subFields && q.subFields.length > 0)) {
        const groupData = answers[q.id];
        if (groupData && typeof groupData === "object") {
           // Original logic: At least ONE field is filled
           // return Object.values(groupData).some(...)
           // Ideally should be ALL required fields, but let's stick to original "some" for now or strict?
           // Original Part1: return Object.values(groupData).some(val => val...)
           return Object.values(groupData).some(
            (val: any) => val !== undefined && val !== null && val.toString().trim() !== ""
          );
        }
        return false;
      }
      return (
        answers[q.id] !== undefined &&
        answers[q.id] !== "" &&
        answers[q.id] !== null &&
        (Array.isArray(answers[q.id]) ? answers[q.id].length > 0 : true)
      );
    },
    [answers, isQuestionDisabled]
  );

  const totalPages = useMemo(() => {
    // Determine total pages from valid questions
    const pages = new Set(questions.map((q) => q.page));
    return pages.size;
  }, [questions]);

  const currentQuestions = useMemo(() => {
    return questions.filter((q) => q.page === currentPage);
  }, [questions, currentPage]);

  const isCurrentPageComplete = useMemo(() => {
    return currentQuestions.every((q) => isQuestionAnswered(q));
  }, [currentQuestions, isQuestionAnswered]);
  
  const progress = useMemo(() => {
      const total = questions.length;
      if (total === 0) return 0;
      const answered = questions.filter(q => isQuestionAnswered(q)).length;
      const percent = Math.round((answered / total) * 100);
      return percent;
  }, [questions, isQuestionAnswered]);

  // ✅ Trigger callback when progress changes
  useEffect(() => {
    onProgressChange?.(progress);
  }, [progress, onProgressChange]);


  const handleAnswer = (id: number | string, value: any) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        if (onComplete) {
            onComplete(answers);
        }
    }
  };

  const handleBackPage = (onBackExit?: () => void) => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (onBackExit) onBackExit();
    }
  };

  return {
    answers,
    handleAnswer,
    currentPage,
    totalPages,
    currentQuestions,
    isCurrentPageComplete,
    handleNextPage,
    handleBackPage,
    progress,
    isQuestionDisabled,
    isQuestionAnswered
  };
};
