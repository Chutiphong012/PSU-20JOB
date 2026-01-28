
"use client";

import { Question, SubField } from "@/data/questionnaireMock";
import { getLocalizedText } from "@/utils/i18nHelper";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

interface AddressGroupFieldProps {
  question: Question;
  value: any; // Object
  onChange: (value: any) => void;
  isDisabled: boolean;
}

export function AddressGroupField({
  question,
  value,
  onChange,
  isDisabled,
}: AddressGroupFieldProps) {
  const { i18n } = useTranslation("graduate");
  const lang = i18n.language;
  const activeSolidBlue = "bg-[#2F80ED]";
  const groupData = value || {};

  const handleSubFieldChange = (fieldName: string, fieldValue: any) => {
    onChange({
      ...groupData,
      [fieldName]: fieldValue,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-4 md:gap-x-6 md:gap-y-6">
      {question.subFields?.map((field: SubField, idx: number) => {
        const fieldVal = groupData[field.name] || "";
        const isFilled = fieldVal.toString().trim() !== "";
        
        // Responsive Size Classes
        let spanClass = "col-span-1 md:col-span-2 lg:col-span-6"; // Default full
        if (field.size === "half") spanClass = "col-span-1 md:col-span-1 lg:col-span-3";
        if (field.size === "third") spanClass = "col-span-1 md:col-span-1 lg:col-span-2";
        if (field.size === "full") spanClass = "col-span-1 md:col-span-2 lg:col-span-6";


        return (
          <div key={idx} className={spanClass}>
            {field.label && (
              <label
                className={`block font-medium mb-1.5 md:mb-2 text-xs md:text-sm ${
                  isDisabled ? "text-gray-400" : "text-[#18305D]"
                }`}
              >
                {getLocalizedText(field.label, lang)}
              </label>
            )}
            <div
              className={`rounded-xl p-px transition-all duration-200 ${
                isDisabled
                  ? "bg-gray-200"
                  : isFilled
                  ? "bg-transparent"
                  : "bg-gray-200 hover:bg-linear-to-r hover:from-[#267FD8] hover:to-[#2994FF]"
              }`}
            >
              <div className="relative rounded-[calc(0.75rem-1px)] bg-white overflow-hidden">
                {field.type === "dropdown" ? (
                  <>
                    <select
                      disabled={isDisabled}
                      className={`w-full px-4 py-3 border-none outline-none appearance-none cursor-pointer text-sm md:text-base transition-all ${
                        isDisabled
                          ? "bg-gray-100 text-gray-400"
                          : isFilled
                          ? `${activeSolidBlue} text-white font-medium`
                          : "text-gray-700"
                      }`}
                      value={fieldVal}
                      onChange={(e) =>
                        handleSubFieldChange(field.name, e.target.value)
                      }
                    >
                      <option
                        value=""
                        disabled
                        className={isFilled ? "text-white/70" : "text-gray-400"}
                      >
                        {field.placeholder
                          ? getLocalizedText(field.placeholder, lang)
                          : ""}
                      </option>
                      {/* TODO: Add Options if available in SubField definition in future */}
                      <option value="opt1" className="text-gray-700 bg-white">
                         Mock Option (Edit Data)
                      </option>
                    </select>
                    <ChevronDown
                      className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${
                        isDisabled
                          ? "text-gray-300"
                          : isFilled
                          ? "text-white"
                          : "text-gray-400"
                      }`}
                      size={18}
                    />
                  </>
                ) : (
                  <input
                    type="text"
                    disabled={isDisabled}
                    className={`w-full px-4 py-3 border-none outline-none transition-all text-sm md:text-base ${
                      isDisabled
                        ? "bg-gray-100 text-gray-400"
                        : isFilled
                        ? `${activeSolidBlue} text-white placeholder:text-white/60`
                        : "bg-white text-gray-700 placeholder:text-gray-300"
                    }`}
                    placeholder={
                      field.placeholder
                        ? getLocalizedText(field.placeholder, lang)
                        : ""
                    }
                    value={fieldVal}
                    onChange={(e) =>
                      handleSubFieldChange(field.name, e.target.value)
                    }
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
