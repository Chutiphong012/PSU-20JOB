"use client";

import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { Question } from "@/data/employerMock";
import { getLocalizedText } from "@/utils/i18nHelper";

interface FieldProps {
  question: Question;
  value: any;
  onAnswer: (id: number | string, value: any) => void;
}

export function EmployerAddressGroupField({ question: q, value, onAnswer }: FieldProps) {
  const { i18n } = useTranslation(["employer"]);
  const lang = i18n.language;

  const groupValue = (typeof value === "object" && value !== null) ? value : {};
  const subFields = q.subFields || [];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {subFields.map((sf: any) => {
        const sfValue = groupValue[sf.id] || "";
        const sfFilled = sfValue !== "";
        
        if (sf.type === "dropdown") {
          return (
            <div
              key={sf.id}
              className={`rounded-xl border-2 transition-all duration-200 overflow-hidden relative ${
                sfFilled ? "border-[#1890FF] bg-[#1890FF]" : "border-gray-200 bg-white"
              }`}
            >
              <select
                value={sfValue}
                onChange={(e) => onAnswer(q.id, { ...groupValue, [sf.id]: e.target.value })}
                className={`w-full appearance-none px-4 py-3.5 outline-none transition-all text-base cursor-pointer bg-transparent ${
                  sfFilled ? "text-white font-medium" : "text-gray-700"
                }`}
              >
                <option value="" disabled className="text-gray-400 bg-white">
                  {getLocalizedText(sf.placeholder || sf.label, lang)}
                </option>
                {sf.options?.map((opt: any, idx: number) => {
                  const optLabel = typeof opt === "string" ? opt : getLocalizedText(opt.label, lang);
                  const optValue = typeof opt === "string" ? opt : opt.value;
                  return (
                    <option key={idx} value={optValue} className="text-gray-700 bg-white">
                      {optLabel}
                    </option>
                  );
                })}
              </select>
              <ChevronDown
                className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${
                  sfFilled ? "text-white" : "text-gray-400"
                }`}
                size={20}
              />
            </div>
          );
        }
        
        // Default to text input
        return (
          <div
            key={sf.id}
            className={`rounded-xl border-2 transition-all duration-200 overflow-hidden ${
              sfFilled ? "border-[#1890FF] bg-[#1890FF]" : "border-gray-200 bg-white"
            }`}
          >
            <input
              type={sf.type || "text"}
              placeholder={getLocalizedText(sf.placeholder || sf.label, lang)}
              value={sfValue}
              onChange={(e) => onAnswer(q.id, { ...groupValue, [sf.id]: e.target.value })}
              className={`w-full px-4 py-3.5 outline-none transition-all text-base bg-transparent ${
                sfFilled ? "text-white placeholder:text-white/60" : "text-gray-700"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}
