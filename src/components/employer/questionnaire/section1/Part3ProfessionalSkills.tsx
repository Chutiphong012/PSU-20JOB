"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  employerPart3Categories,
  professionalQuestions,
} from "@/data/employerMock";
import { useTranslation } from "react-i18next";
import { getLocalizedText } from "@/utils/i18nHelper";
import { EmployerQuestionRenderer } from "../EmployerQuestionRenderer";

interface PartProps {
  answers: Record<string, any>;
  onAnswer: (id: number | string, value: any) => void;
  onNextPart: () => void;
  onBackPart: () => void;
  onScrollToTop?: () => void;
}

export function Part3ProfessionalSkills({
  answers,
  onAnswer,
  onNextPart,
  onBackPart,
  onScrollToTop,
}: PartProps) {
  const [step, setStep] = useState(1);
  const { t, i18n } = useTranslation('employer');
  const lang = i18n.language;

  const selectedCategory = answers[employerPart3Categories.id];
  const subQuestions = professionalQuestions[selectedCategory] || [];
  const otherValue = answers[`${employerPart3Categories.id}_other`] || "";

  const isComplete =
    step === 1
      ? selectedCategory !== undefined &&
        selectedCategory !== "" &&
        (selectedCategory === "other" ? otherValue.trim() !== "" : true)
      : subQuestions.every((q) => answers[q.id] !== undefined);

  const handleNext = () => {
    if (step === 1) {
      if (selectedCategory === "other" || subQuestions.length === 0) {
        onNextPart();
      } else {
        setStep(2);
        setTimeout(() => onScrollToTop?.(), 50);
      }
    } else {
      onNextPart();
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setTimeout(() => onScrollToTop?.(), 50);
    } else {
      onBackPart();
    }
  };

  // Get localized category label for header
  const getCategoryLabel = () => {
    const opt = (employerPart3Categories.options as any[]).find(
      (o) => o.value === selectedCategory
    );
    if (!opt) return "";
    return getLocalizedText(opt.label, lang);
  };

  return (
    <div className="flex flex-col h-full font-['Prompt']">
      <div className="flex-1 space-y-10 border border-gray-100 rounded-3xl p-6 md:p-10 bg-white shadow-sm">
        {step === 1 && (
          <div className="animate-in fade-in duration-500">
            <div className="mb-8 mt-4">
              <h2 className="text-[#2994FF] font-semibold text-lg md:text-xl uppercase tracking-wide">
                {getLocalizedText(employerPart3Categories.label, lang)}
              </h2>
            </div>

            <EmployerQuestionRenderer 
              question={employerPart3Categories}
              answer={answers[employerPart3Categories.id]}
              onAnswer={onAnswer}
            />
          </div>
        )}

        {step === 2 && (
          <div className="animate-in slide-in-from-right-4 duration-500">
            <div className="mb-10 mt-4">
              <h2 className="text-[#2994FF] font-semibold text-lg md:text-xl uppercase tracking-wide">
                {/* TODO: Add translation for "Professional Skills" prefix if needed, or if it is part of category label? 
                    For now, assuming "ทักษะทางวิชาชีพ" is hardcoded in Thai design or we can add it to i18n. 
                    Let's just show the Category Label as header.
                */}
                {getCategoryLabel()}
              </h2>
            </div>

            {subQuestions.map((q, index) => (
              <div
                key={q.id}
                className="pb-10 border-b border-gray-50 last:border-0 last:pb-0 mb-10"
              >
                <div className="mb-2">
                  <span className="text-xs md:text-sm text-gray-400 font-light">
                    {t('form.question_prefix')} {index + 1}
                  </span>
                </div>
                <div className="mb-8">
                  <h3 className="font-semibold text-lg md:text-xl text-black leading-relaxed">
                    {getLocalizedText(q.label, lang)} <span className="text-red-500">*</span>
                  </h3>
                </div>

                <EmployerQuestionRenderer 
                  question={q} 
                  answer={answers[q.id]} 
                  onAnswer={onAnswer} 
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-4 mt-12 pt-8 border-t border-gray-100">
        <button
          onClick={handleBack}
          className="w-full sm:w-49 px-10 py-3.5 rounded-xl border border-gray-300 text-gray-600 font-medium bg-white hover:bg-gray-50 transition-all"
        >
          {t('form.buttons.back')}
        </button>
        <button
          onClick={handleNext}
          disabled={!isComplete}
          className={`w-full sm:w-49 px-12 py-3.5 rounded-xl font-semibold text-white transition-all ${isComplete ? "bg-[#1890FF] shadow-lg shadow-blue-200 hover:shadow-blue-300" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
        >
          <span className="flex items-center justify-center gap-2">{t('form.buttons.next')} </span>
        </button>
      </div>
    </div>
  );
}
