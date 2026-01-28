"use client";

import {
  FileText,
  Briefcase,
  Award,
  MessageSquare,
  Building2,
  Check,
} from "lucide-react";
import { SectionStructure } from "@/data/employerMock";

interface SidebarProps {
  structure: SectionStructure[];
  currentPart: number;
  totalProgress: number;
  progressData: Record<number, number>;
  answers: Record<string, any>;
  onPartChange?: (partId: number) => void;
}

function getPartIcon(id: number) {
  switch (id) {
    case 1:
      return <FileText />;
    case 2:
      return <Award />;
    case 3:
      return <Briefcase />;
    case 4:
      return <MessageSquare />;
    default:
      return <FileText />;
  }
}

import { useTranslation } from "react-i18next";
import { getLocalizedText } from "@/utils/i18nHelper";

// ... imports remain the same ...

export function EmployerSidebar({
  structure,
  currentPart,
  totalProgress,
  progressData,
}: SidebarProps) {
  const { t, i18n } = useTranslation('employer');
  const lang = i18n.language;

  return (
    <div className="h-auto lg:h-full flex flex-col p-5 md:p-8 text-white font-['Prompt']">
      {/* 1. Header Section */}
      <div className="mb-4 lg:mb-10 pt-0 lg:pt-2">
        <div className="flex items-center lg:items-start gap-4 mb-4 lg:mb-6">
          <div className="p-2 lg:p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 shrink-0 shadow-sm">
            <FileText size={24} className="text-white lg:w-7 lg:h-7" />
          </div>
          <div className="pt-0 lg:pt-1">
            {/* ✅ เปลี่ยน font-bold เป็น font-semibold ที่นี่ */}
            <h2 className="text-sm lg:text-base font-semibold leading-snug text-white drop-shadow-sm whitespace-pre-line">
              {t('instruction.title')}
            </h2>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-end text-xs font-medium mb-1.5 px-1">
            <span className="text-white/80">{t('form.progress_label')}</span>
            <span className="text-white">{totalProgress}%</span>
          </div>
          <div className="w-full bg-black/20 h-1.5 lg:h-2 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="bg-white h-full rounded-full shadow-[0_0_12px_rgba(255,255,255,0.6)] transition-all duration-700 ease-out"
              style={{ width: `${totalProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 2. Menu Navigation List */}
      <div className="hidden lg:flex flex-col gap-4">
        {structure.map((part) => {
          const percent = progressData[part.id] || 0;
          const isActive = currentPart === part.id;
          const isCompleted = percent === 100;

          return (
            <div
              key={part.id}
              className={`group relative flex items-center justify-between py-3 px-2 transition-all duration-300 rounded-xl ${
                isActive
                  ? "bg-white/10 translate-x-1" 
                  : "opacity-70" 
              }`}
            >
              <div className="flex items-start gap-4 pr-4">
                <div
                  className={`mt-0.5 transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-60" 
                  }`}
                >
                  {getPartIcon(part.id)}
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-sm font-semibold leading-tight transition-colors ${
                      isActive ? "text-white" : "text-white/70" // ลบ group-hover:text-white ออก
                    }`}
                  >
                    {getLocalizedText(part.label, lang)}
                  </span>
                  <span className="text-[10px] text-blue-200/70 mt-1 font-light leading-relaxed max-w-35 truncate">
                    {getLocalizedText(part.subLabel, lang)}
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <div className="relative w-6 h-6 flex items-center justify-center">
                  {isCompleted ? (
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center animate-in zoom-in duration-300 shadow-md">
                      <Check
                        size={14}
                        className="text-[#0057D9] stroke-[3px]"
                      />
                    </div>
                  ) : (
                    <>
                      <svg
                        className="w-full h-full -rotate-90 transform"
                        viewBox="0 0 36 36"
                      >
                        <path
                          className="text-white/20"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        {percent > 0 && (
                          <path
                            className="text-white transition-all duration-500 ease-out drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]"
                            strokeDasharray={`${percent}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                        )}
                      </svg>
                      {percent === 0 && isActive && (
                        <div className="absolute w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
