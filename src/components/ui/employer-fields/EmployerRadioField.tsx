"use client";

import { useTranslation } from "react-i18next";
import { Question, QuestionOption } from "@/data/employerMock";
import { getLocalizedText } from "@/utils/i18nHelper";

interface FieldProps {
  question: Question;
  value: any;
  otherValue?: string;
  onAnswer: (id: number | string, value: any) => void;
}

export function EmployerRadioField({ question: q, value, otherValue, onAnswer }: FieldProps) {
  const { t, i18n } = useTranslation(["employer"]);
  const lang = i18n.language;

  // Check for implicit rating (1-5)
  const isRatingType =
    Array.isArray(q.options) &&
    q.options.length === 5 &&
    q.options.every(
      (opt) =>
        opt === "1" || (typeof opt === "string" && !isNaN(Number(opt)))
    );

  if (isRatingType) {
    const activeSolidBlue = "bg-[#1890FF]";
    const ratingLabels = t("form.rating_labels", { returnObjects: true }) as string[];

    return (
      <div className="grid grid-cols-5 gap-2 max-w-3xl">
        {[1, 2, 3, 4, 5].map((val, idx) => {
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

  // Standard Radio
  return (
    <div className="space-y-3">
      {(q.options as (string | QuestionOption)[])?.map((opt, idx) => {
        const label = typeof opt === "string" ? opt : getLocalizedText(opt.label, lang);
        const val = typeof opt === "string" ? opt : opt.value;
        const isSelected = value === val;
        const withInput = typeof opt === "object" && opt.withInput;
        const placeholder = typeof opt === "object"
          ? getLocalizedText(opt.placeholder, lang)
          : t("form.other_placeholder");

        return (
          <div key={idx} className="space-y-3">
            <label
              className={`group flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border-2 ${
                isSelected
                  ? "bg-[#1890FF] border-[#1890FF] text-white shadow-sm"
                  : "bg-white border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => onAnswer(q.id, val)}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isSelected ? "border-white" : "border-gray-300"
                }`}
              >
                {isSelected && (
                  <div className="w-3 h-3 bg-white rounded-full animate-in zoom-in duration-300" />
                )}
              </div>
              <span className="text-base font-medium">{label}</span>
            </label>

            {withInput && isSelected && (
              <div className="mt-3 ml-2 md:ml-4 pl-4 border-l-2 border-blue-200 animate-in slide-in-from-top-2 fade-in duration-300">
                <input
                  type="text"
                  placeholder={placeholder}
                  value={otherValue || ""}
                  onChange={(e) => onAnswer(`${q.id}_other`, e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base outline-none focus:border-[#1890FF] transition-all bg-white text-gray-700"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
