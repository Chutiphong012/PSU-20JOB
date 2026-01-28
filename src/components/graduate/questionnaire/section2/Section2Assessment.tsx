// src/components/graduate/questionnaire/section2/Section2Assessment.tsx
"use client";

import { useState, useCallback } from "react";
import { assessmentStructure, questionsAssessment, assessmentPageContent } from "@/data/assessmentMock";
import { QuestionnaireRenderer } from "../QuestionnaireRenderer";
import { useTranslation } from "react-i18next";
import { getLocalizedText } from "@/utils/i18nHelper";

interface Section2Props {
  answers: Record<string, any>;
  onAnswer: (id: string, value: any) => void;
  onBackToSection1: () => void;
  onSubmit: () => void;
}

export function Section2Assessment({
  answers,
  onAnswer,
  onBackToSection1,
  onSubmit,
}: Section2Props) {
  const { t, i18n } = useTranslation('graduate');
  const lang = i18n.language;
  
  // Use local state to track which "Category" (Page) we are on (0-indexed)
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  // Derive current structure and questions based on index
  const currentStructure = assessmentStructure[currentCategoryIndex];
  
  // Filter questions for the current page and normalize 'page' to 1
  // (QuestionnaireRenderer expects page 1 for each fresh instance)
  const currentQuestions = questionsAssessment
    .filter(q => q.page === currentCategoryIndex + 1)
    .map(q => ({ ...q, page: 1 }));

  const handleNext = () => {
    if (currentCategoryIndex < assessmentStructure.length - 1) {
      setCurrentCategoryIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onSubmit();
    }
  };

  const handleBack = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onBackToSection1();
    }
  };

  return (
    <QuestionnaireRenderer
      key={currentCategoryIndex}
      partInfo={currentStructure}
      questions={currentQuestions}
      initialAnswers={answers}
      onComplete={(newAnswers) => {
         handleNext();
      }}
      onBack={handleBack}
      onAnswerChange={(id, val) => onAnswer(String(id), val)}
      saveButtonLabel={currentCategoryIndex === assessmentStructure.length - 1 ? t("questionnaire.buttons.submit") : t("questionnaire.buttons.next")}
      preTitle={`${t("questionnaire.instruction.sections.part_2")} ${getLocalizedText(assessmentPageContent.title, lang)}`}
    />
  );
}
