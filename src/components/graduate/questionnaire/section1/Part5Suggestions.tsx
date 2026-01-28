
"use client";

import { useState, useCallback } from "react";
import {
  questionPart5,
  section1Structure,
} from "@/data/questionnaireMock";
import { useTranslation } from "react-i18next";
import { QuestionnaireRenderer } from "@/components/graduate/questionnaire/QuestionnaireRenderer";

interface Part5Props {
  answers: Record<string, any>;
  onAnswer: (id: number, value: any) => void;
  onNextPart: (nextPart: number) => void;
  onBackPart: () => void;
  onProgressChange: (percent: number) => void;
}

export function Part5Suggestions({
  answers,
  onAnswer,
  onNextPart,
  onBackPart,
  onProgressChange,
}: Part5Props) {
  const { t } = useTranslation("graduate");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Part 5 is Index 4 in the structure array
  const partInfo = section1Structure[4];

  const handleComplete = useCallback(
    (finalAnswers: Record<string, any>) => {
      // In this specific part, we want to show a success modal before moving on
      setShowSuccessModal(true);
    },
    []
  );

  const handleConfirmNext = () => {
    setShowSuccessModal(false);
    onNextPart(6);
  };

  return (
    <QuestionnaireRenderer
      partInfo={partInfo}
      questions={questionPart5}
      initialAnswers={answers}
      onComplete={handleComplete}
      onBack={onBackPart}
      onProgressChange={onProgressChange}
      saveButtonLabel={t("questionnaire.buttons.save_section_1")} // "Save Section 1"
      showSuccessModal={showSuccessModal}
      onSuccessModalConfirm={handleConfirmNext}
    />
  );
}
