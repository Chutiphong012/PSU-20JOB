
import { LocalizedText } from "@/data/questionnaireMock";

export const getLocalizedText = (text: LocalizedText | string | undefined, lang: string): string => {
  if (!text) return "";
  if (typeof text === "string") return text;
  return text[lang as 'th' | 'en'] || text.th;
};
