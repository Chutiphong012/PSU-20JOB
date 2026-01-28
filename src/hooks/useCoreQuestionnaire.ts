"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
// We can use a generic Question interface or the one from employerMock/questionnaireMock
// Since both are similar, we'll define a compatible interface or use 'any' for the generic hook to be flexible, 
// but better to allow passing the Question type.

export interface BaseQuestion {
  id: string | number;
  page: number;
  required?: boolean;
  type?: string;
  disabledCondition?: {
    questionId: string | number;
    value: any;
  };
  subFields?: any[];
  [key: string]: any;
}

interface UseCoreQuestionnaireProps<T extends BaseQuestion> {
  questions: T[];
  initialAnswers?: Record<string, any>;
  onComplete?: (answers: Record<string, any>) => void;
  onProgressChange?: (percent: number) => void;
  onAnswerChange?: (id: string | number, value: any) => void;
  startPage?: number;
}

export const useCoreQuestionnaire = <T extends BaseQuestion>({
  questions,
  initialAnswers = {},
  onComplete,
  onProgressChange,
  onAnswerChange,
  startPage = 1,
}: UseCoreQuestionnaireProps<T>) => {
  const [answers, setAnswers] = useState<Record<string, any>>(initialAnswers);
  const [currentPage, setCurrentPage] = useState(startPage);

  // Get unique pages from questions (Sorted)
  const uniquePages = useMemo(() => {
    // Determine uniqueness and sort
    const pages = Array.from(new Set(questions.map((q) => q.page))).sort((a, b) => a - b);
    return pages;
  }, [questions]);

  const totalPages = uniquePages.length;
  const isFirstPage = currentPage === uniquePages[0];
  const isLastPage = currentPage === uniquePages[uniquePages.length - 1];

  // Get questions for current page
  const currentQuestions = useMemo(() => {
    return questions.filter((q) => q.page === currentPage);
  }, [questions, currentPage]);

  // Check if a question is disabled based on condition
  const isQuestionDisabled = useCallback(
    (question: T) => {
      if (!question.disabledCondition) return false;
      const { questionId, value } = question.disabledCondition;
      return answers[questionId] === value;
    },
    [answers]
  );

  // Check if a question is answered
  const isQuestionAnswered = useCallback(
    (q: T) => {
      if (isQuestionDisabled(q)) return true;

      // Address Group / Subfields
      if (q.type === "address_group" || (q.subFields && q.subFields.length > 0)) {
        const groupData = answers[q.id];
        if (groupData && typeof groupData === "object") {
           return Object.values(groupData).some(
            (val: any) => val !== undefined && val !== null && val.toString().trim() !== ""
          );
        }
        return false;
      }

      // Checkbox (Array)
      if (q.type === "checkbox") {
        return Array.isArray(answers[q.id]) && answers[q.id].length > 0;
      }

      // Standard types
      const val = answers[q.id];
      return val !== undefined && val !== "" && val !== null && (Array.isArray(val) ? val.length > 0 : true);
    },
    [answers, isQuestionDisabled]
  );

  // Check if current page is complete
  const isCurrentPageComplete = useMemo(() => {
    return currentQuestions.every((q) => {
      if (!q.required) return true;
      return isQuestionAnswered(q);
    });
  }, [currentQuestions, isQuestionAnswered]);

  // Calculate progress percentage
  const progress = useMemo(() => {
    const possibleQuestions = questions.filter(q => q.required !== false);
    const total = possibleQuestions.length;
    if (total === 0) return 100;

    const answered = possibleQuestions.filter((q) => isQuestionAnswered(q)).length;
    return Math.round((answered / total) * 100);
  }, [questions, isQuestionAnswered]);

  // Notify progress change
  useEffect(() => {
    onProgressChange?.(progress);
  }, [progress, onProgressChange]);

  // Handle answer change
  const handleAnswer = useCallback(
    (id: number | string, value: any) => {
      setAnswers((prev) => ({
        ...prev,
        [id]: value,
      }));
      onAnswerChange?.(id, value);
    },
    [onAnswerChange]
  );

  // Handle next page
  const handleNextPage = useCallback(() => {
    if (isLastPage) {
      onComplete?.(answers);
    } else {
      const currentIndex = uniquePages.indexOf(currentPage);
      if (currentIndex < uniquePages.length - 1) {
        setCurrentPage(uniquePages[currentIndex + 1]);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [isLastPage, currentPage, uniquePages, answers, onComplete]);

  // Handle back page
  const handleBackPage = useCallback(
    (onBackExit?: () => void) => {
      if (isFirstPage) {
        onBackExit?.();
      } else {
        const currentIndex = uniquePages.indexOf(currentPage);
        if (currentIndex > 0) {
          setCurrentPage(uniquePages[currentIndex - 1]);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    },
    [isFirstPage, currentPage, uniquePages]
  );

  return {
    answers,
    setAnswers, // Exposed in case needed
    handleAnswer,
    currentPage,
    setCurrentPage,
    totalPages,
    uniquePages,
    currentQuestions,
    isCurrentPageComplete,
    isFirstPage,
    isLastPage,
    handleNextPage,
    handleBackPage,
    progress,
    isQuestionDisabled,
    isQuestionAnswered,
  };
};
