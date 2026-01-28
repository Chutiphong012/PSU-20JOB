"use client";

import { useTranslation } from "react-i18next";
import { Question } from "@/data/employerMock";

// Fields
import { EmployerTextField } from "@/components/ui/employer-fields/EmployerTextField";
import { EmployerTextareaField } from "@/components/ui/employer-fields/EmployerTextareaField";
import { EmployerSelectField } from "@/components/ui/employer-fields/EmployerSelectField";
import { EmployerRadioField } from "@/components/ui/employer-fields/EmployerRadioField";
import { EmployerRatingField } from "@/components/ui/employer-fields/EmployerRatingField";
import { EmployerCheckboxField } from "@/components/ui/employer-fields/EmployerCheckboxField";
import { EmployerAddressGroupField } from "@/components/ui/employer-fields/EmployerAddressGroupField";

interface RendererProps {
  question: Question;
  answer: any;
  otherAnswer?: string;
  onAnswer: (id: number | string, value: any) => void;
}

export function EmployerQuestionRenderer({ question: q, answer, otherAnswer, onAnswer }: RendererProps) {
  // Text / Number
  if (q.type === "text" || q.type === "number") {
    return <EmployerTextField question={q} value={answer} onAnswer={onAnswer} />;
  }

  // Textarea
  if (q.type === "textarea") {
    return <EmployerTextareaField question={q} value={answer} onAnswer={onAnswer} />;
  }

  // Dropdown
  if (q.type === "dropdown") {
    return <EmployerSelectField question={q} value={answer} onAnswer={onAnswer} />;
  }

  // Radio
  if (q.type === "radio") {
     return <EmployerRadioField question={q} value={answer} otherValue={otherAnswer} onAnswer={onAnswer} />;
  }

  // Rating
  if (q.type === "rating") {
    return <EmployerRatingField question={q} value={answer} onAnswer={onAnswer} />;
  }

  // Checkbox
  if (q.type === "checkbox") {
    return <EmployerCheckboxField question={q} value={answer} otherValue={otherAnswer} onAnswer={onAnswer} />;
  }

  // Address Group
  if (q.type === "address_group" || (q.subFields && q.subFields.length > 0)) {
    return <EmployerAddressGroupField question={q} value={answer} onAnswer={onAnswer} />;
  }

  return <div>Unknown Question Type: {q.type}</div>;
}
