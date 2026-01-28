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

export function EmployerCheckboxField({ question: q, value, otherValue, onAnswer }: FieldProps) {
  const { t, i18n } = useTranslation(["employer"]);
  const lang = i18n.language;

  const selectedValues = Array.isArray(value) ? value : [];

  return (
    <div className="space-y-3">
      {(q.options as (string | QuestionOption)[])?.map((opt, idx) => {
        const label = typeof opt === "string" ? opt : getLocalizedText(opt.label, lang);
        const val = typeof opt === "string" ? opt : opt.value;
        const isSelected = selectedValues.includes(val);
        const withInput = typeof opt === "object" && opt.withInput;
        const placeholder = typeof opt === "object"
          ? getLocalizedText(opt.placeholder, lang)
          : t("form.other_placeholder");

        const handleToggle = () => {
          const newValues = isSelected
            ? selectedValues.filter((v: string) => v !== val)
            : [...selectedValues, val];
          onAnswer(q.id, newValues);
        };

        return (
          <div key={idx} className="space-y-3">
            <label
              className={`group flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border-2 ${
                isSelected
                  ? "bg-[#1890FF] border-[#1890FF] text-white shadow-sm"
                  : "bg-white border-gray-200 hover:border-blue-300"
              }`}
              onClick={handleToggle}
            >
              <div
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 ${
                  isSelected ? "border-white bg-white" : "border-gray-300"
                }`}
              >
                {isSelected && (
                  <svg className="w-4 h-4 text-[#1890FF]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
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
