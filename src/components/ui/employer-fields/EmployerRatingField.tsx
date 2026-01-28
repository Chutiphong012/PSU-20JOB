"use client";

import { useTranslation } from "react-i18next";
import { Question } from "@/data/employerMock";

interface FieldProps {
  question: Question;
  value: any;
  onAnswer: (id: number | string, value: any) => void;
}

export function EmployerRatingField({ question: q, value, onAnswer }: FieldProps) {
  const { t } = useTranslation(["employer"]);
  const activeSolidBlue = "bg-[#1890FF]";
  const ratingLabels = t("form.rating_labels", { returnObjects: true }) as string[];
  const maxRating = q.options?.length || 5;

  return (
    <div className={`grid grid-cols-${maxRating} gap-2 max-w-3xl`}>
      {Array.from({ length: maxRating }, (_, i) => i + 1).map((val, idx) => {
        const sVal = val.toString();
        const isSelected = value === sVal;
        return (
          <div key={val} className="flex flex-col items-center gap-3">
            <button
              onClick={() => onAnswer(q.id, sVal)}
              className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                isSelected
                  ? `${activeSolidBlue} border-[#1890FF] text-white shadow-lg scale-110`
                  : "bg-white border-gray-100 text-gray-400"
              }`}
            >
              <span className="text-lg md:text-2xl font-semibold">{val}</span>
            </button>
            <span
              className={`text-[10px] md:text-xs text-center ${
                isSelected ? "text-[#1890FF] font-medium" : "text-gray-400 font-light"
              }`}
            >
              {ratingLabels?.[idx] || ""}
            </span>
          </div>
        );
      })}
    </div>
  );
}
