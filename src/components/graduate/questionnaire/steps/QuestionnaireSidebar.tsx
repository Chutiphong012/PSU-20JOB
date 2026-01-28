// src/components/graduate/questionnaire/QuestionnaireSidebar.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Menu,
  User,
  FileText,
  Briefcase,
  FileSearch,
  GraduationCap,
  FilePenLine,
  ChevronDown,
  ChevronUp,
  Users,
  Globe,
  LineChart,
  ShoppingBag,
  HeartHandshake,
  Check,
  Circle,
} from "lucide-react";

import { assessmentStructure } from "@/data/assessmentMock";
import { section1Structure, LocalizedText, studentInfoMock } from "@/data/questionnaireMock";
import { useTranslation } from 'react-i18next';

export interface ProgressData {
  [key: string]: number;
}

interface SidebarProps {
  progressData: ProgressData;
  forceOpenSection?: number | null;
  currentPart?: number;
  onNavigate?: (partId: number) => void;
}

// Helper Function to select Icon based on Part ID
function getPartIcon(id: number) {
  switch (id) {
    case 1:
      return <FileText />;
    case 2:
      return <Briefcase />;
    case 3:
      return <FileSearch />;
    case 4:
      return <GraduationCap />;
    case 5:
      return <FilePenLine />;
    default:
      return <Circle />;
  }
}

export function QuestionnaireSidebar({
  progressData,
  forceOpenSection,
  currentPart,
  onNavigate,
}: SidebarProps) {
  const [activeSection, setActiveSection] = useState<number | null>(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // [NEW State]
  const { t, i18n } = useTranslation('graduate');
  
  // Helper to get text based on current language
  const getLocalizedText = (text: LocalizedText) => text[i18n.language as 'th' | 'en'] || text.th;

  // Effect: Open Section based on command (e.g. finish Sec 1 -> Open Sec 2)
  useEffect(() => {
    if (forceOpenSection) {
      setActiveSection(forceOpenSection);
    }
  }, [forceOpenSection]);

  const toggleSection = (section: number) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // --- Calculations ---
  // 1. Section 1 Progress (Average of Part 1-5)
  const section1Progress = useMemo(() => {
    // Check if progress is 100 for all parts to ensure completion
    const p1 = progressData['part1'] || 0;
    const p2 = progressData['part2'] || 0;
    const p3 = progressData['part3'] || 0;
    const p4 = progressData['part4'] || 0;
    const p5 = progressData['part5'] || 0;
    
    // Note: If some parts are skipped, logic handles them as 100% in QuestionnaireForm
    const total = p1 + p2 + p3 + p4 + p5;
    return Math.round(total / 5);
  }, [progressData]);

  // 2. Section 2 Progress (Average of Assessment Categories)
  const section2Progress = useMemo(() => {
    if (!assessmentStructure || assessmentStructure.length === 0) return 0;
    
    const total = assessmentStructure.reduce((acc, cat) => {
      // ✅ Key in progressData matches cat.id (e.g. 'soft_skills')
      return acc + (progressData[cat.id] || 0); 
    }, 0);
    
    return Math.round(total / assessmentStructure.length);
  }, [progressData]);

  // 3. Overall Progress
  const overallProgress = Math.round((section1Progress + section2Progress) / 2);

  return (
    <aside className="w-full lg:w-[400px] shrink-0 flex flex-col gap-2 font-['Prompt'] transition-all">
      
      {/* Mobile Toggle Header */}
      <div 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="flex lg:hidden bg-white rounded-xl p-4 items-center justify-between shadow-sm cursor-pointer animate-in fade-in zoom-in duration-300"
      >
          <div className="flex items-center gap-3">
               {/* Progress Circle Mini */}
               <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path className="text-gray-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                    <path className="text-[#1890FF]" strokeDasharray={`${overallProgress}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                  <span className="absolute text-[10px] font-bold text-[#18305D]">{overallProgress}%</span>
               </div>
               
               <div className="flex flex-col">
                  <div className="text-[#18305D] font-bold text-sm leading-tight">{t('questionnaire.header_title')}</div>
                  <div className="text-gray-400 text-xs font-light">
                      {isMobileMenuOpen ? t('common:action.collapse_menu', 'ซ่อนเมนู') : t('common:action.expand_menu', 'แสดงเมนูแบบสอบถาม')}
                  </div>
               </div>
          </div>
          <button className="text-gray-400">
             {isMobileMenuOpen ? <ChevronUp size={24}/> : <ChevronDown size={24}/>}
          </button>
      </div>

      {/* Collapsible Content Container */}
      <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} lg:flex flex-col gap-2 animate-in slide-in-from-top-4 duration-300 lg:animate-none`}>
        
        {/* --- Profile Card --- */}
        <div className="bg-[#003870] rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
          <div className="mb-6 relative z-10 w-full">
            <div className="text-sm font-light leading-snug text-white/90 text-center w-full">
              {t('questionnaire.header_title')}
            </div>
          </div>
          <div className="flex flex-row items-center justify-center gap-4 mb-8 relative z-10 w-full px-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
              <User size={24} className="text-[#002D55]" />
            </div>
            <h3 className="font-bold text-lg tracking-wide text-left text-white leading-tight">
              {getLocalizedText(studentInfoMock.name)}
            </h3>
          </div>

          {/* Overall Progress */}
          <div className="space-y-2 relative z-10">
            <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-white/90 h-full rounded-full shadow-sm transition-all duration-500 ease-out"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
            <div className="text-center text-xs text-gray-300 font-light tracking-wider">
              Completed: {overallProgress}%
            </div>
          </div>
        </div>

        {/* --- Section 1: ภาวะการมีงานทำ --- */}
        <div
          className={`rounded-2xl transition-all duration-300 overflow-hidden border border-transparent ${
            activeSection === 1
              ? "shadow-lg bg-white"
              : "shadow-sm bg-white hover:shadow-md"
          }`}
        >
          <div
            onClick={() => toggleSection(1)}
            className={`p-5 flex items-center justify-between cursor-pointer transition-colors duration-300 ${
              activeSection === 1
                ? "bg-[#2B76E5] text-white"
                : "bg-white text-[#002D55]"
            }`}
          >
            <div className="flex items-center gap-4">
              {activeSection === 1 ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} className="text-gray-400" />
              )}
              <div className="text-left">
                <div
                  className={`text-xs ${
                    activeSection === 1 ? "opacity-90" : "text-gray-400"
                  }`}
                >
                  {t('questionnaire.instruction.sections.part_1')}
                </div>
                <div className="font-bold text-base">{t('questionnaire.instruction.sections.part_1_title')}</div>
              </div>
            </div>
            <ProgressRing
              percent={section1Progress}
              active={activeSection === 1}
            />
          </div>

          {activeSection === 1 && (
            <div className="py-2 animate-in slide-in-from-top-2 duration-200">
              {section1Structure.map((part, index) => {
                // Check if locked: Enabled only if previous part is completed
                // Part 1 is always unlocked. Part N requires Part N-1 to be 100%.
                const previousPartId = index > 0 ? section1Structure[index - 1].id : null;
                const isLocked =
                  index > 0 && (progressData[`part${previousPartId}`] || 0) < 100;

                return (
                  <SidebarItem
                    key={part.id}
                    icon={getPartIcon(part.id)}
                    text={getLocalizedText(part.label)}
                    subText={getLocalizedText(part.subLabel)}
                    progress={progressData[`part${part.id}`] || 0}
                    isActive={currentPart === part.id} // ✅ Highlight Active
                    onClick={() => {
                        onNavigate?.(part.id);
                        // Optional: Close mobile menu after clicking items on mobile
                        if (window.innerWidth < 1024) setIsMobileMenuOpen(false);
                    }} 
                    isLocked={isLocked}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* --- Section 2: การประเมินตนเอง (Dynamic List) --- */}
        <div
          className={`rounded-2xl transition-all duration-300 overflow-hidden border border-transparent ${
            activeSection === 2
              ? "shadow-lg bg-white"
              : "shadow-sm bg-white hover:shadow-md"
          }`}
        >
          <div
            onClick={() => toggleSection(2)}
            className={`p-5 flex items-center justify-between cursor-pointer transition-colors duration-300 ${
              activeSection === 2
                ? "bg-[#2B76E5] text-white"
                : "bg-white text-[#002D55]"
            }`}
          >
            <div className="flex items-center gap-4">
              {activeSection === 2 ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} className="text-gray-400" />
              )}
              <div className="text-left">
                <div
                  className={`text-xs ${
                    activeSection === 2 ? "opacity-90" : "text-gray-400"
                  }`}
                >
                  {t('questionnaire.instruction.sections.part_2')}
                </div>
                <div className="font-bold text-base">
                  {t('questionnaire.instruction.sections.part_2_title')}
                </div>
              </div>
            </div>
            <ProgressRing
              percent={section2Progress}
              active={activeSection === 2}
            />
          </div>

          {activeSection === 2 && (
            <div className="py-2 animate-in slide-in-from-top-2 duration-200">
              {/* ✅ Loop render ตาม Mock Data */}
              {assessmentStructure.map((category, index) => {
                // Check if locked
                let isLocked = false;
                if (index === 0) {
                  // First part of Sec 2 requires Sec 1 to be done
                  isLocked = section1Progress < 100;
                } else {
                  // Subsequent parts require previous part to be done
                  const prevId = assessmentStructure[index - 1].id;
                  isLocked = (progressData[prevId] || 0) < 100;
                }

                return (
                  <SidebarItem
                    key={category.id}
                    icon={getCategoryIcon(category.id as string)}
                    text={getLocalizedText(category.label)} // [Updated]
                    subText={getLocalizedText(category.subLabel)} // [Updated]
                    progress={progressData[category.id] || 0} // ดึง Progress ตาม ID
                    isActive={activeSection === 2} // Highlight section
                    isLocked={isLocked}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

// --- Helper Functions ---
function getCategoryIcon(id: string) {
  switch (id) {
    case "soft_skills":
      return <Users />;
    case "digital_skills":
      return <Globe />;
    case "marketing_skills":
      return <ShoppingBag />;
    case "analytical_skills":
      return <LineChart />;
    case "customer_skills":
      return <HeartHandshake />;
    default:
      return <Users />;
  }
}

function ProgressRing({
  percent,
  active,
}: {
  percent: number;
  active: boolean;
}) {
  return (
    <div className="relative w-9 h-9 flex items-center justify-center">
      {active ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-white/20"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="text-white transition-all duration-500 ease-out"
              strokeDasharray={`${percent}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
          <span className="absolute text-[9px] font-bold">{percent}%</span>
        </div>
      ) : (
        <div className="relative w-9 h-9 flex items-center justify-center rounded-full border-2 border-gray-200">
          {percent > 0 && (
            <span className="text-[9px] font-bold text-gray-400">
              {percent}%
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function SidebarItem({
  icon,
  text,
  subText,
  progress,
  isActive,
  onClick,
  isLocked,
}: {
  icon: any;
  text: string;
  subText?: string;
  progress: number;
  isActive?: boolean;
  onClick?: () => void;
  isLocked?: boolean;
}) {
  const isCompleted = progress === 100;
  return (
    <div
      onClick={isLocked ? undefined : onClick} // ✅ Handle Click (Disabled if locked)
      className={`flex items-start gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 transition-colors group border-l-4 ${
        isLocked
          ? "cursor-not-allowed opacity-50 bg-gray-50 border-transparent"
          : "cursor-pointer"
      } ${
        isActive
          ? "border-[#1890FF] bg-blue-50" // ✅ Active Style
          : isCompleted
          ? "border-transparent bg-blue-50/30"
          : isLocked
          ? ""
          : "border-transparent hover:border-gray-200 hover:bg-gray-50"
      }`}
    >
      <div
        className={`mt-0.5 transition-colors ${
          isActive || isCompleted
            ? "text-[#1890FF]"
            : "text-gray-400 group-hover:text-gray-600"
        }`}
      >
        <div className="w-5 h-5 [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-[1.5]">
          {icon}
        </div>
      </div>
      <div className="flex flex-col grow min-w-0">
        <span
          className={`text-sm font-medium leading-tight truncate transition-colors ${
            isCompleted
              ? "text-[#18305D]"
              : "text-gray-500 group-hover:text-gray-700"
          }`}
        >
          {text}
        </span>
        {subText && (
          <span className="text-[10px] md:text-[11px] text-gray-400 mt-0.5 font-light truncate">
            {subText}
          </span>
        )}
      </div>
      <div className="shrink-0 mt-0.5">
        {isCompleted ? (
          <Check size={24} className="text-[#1890FF]" />
        ) : progress > 0 ? (
          <div className="relative w-6 h-6 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 24 24">
              <circle
                className="text-gray-200"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                r="10"
                cx="12"
                cy="12"
              />
              <circle
                className="text-[#1890FF] transition-all"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                r="10"
                cx="12"
                cy="12"
                strokeDasharray={2 * Math.PI * 10}
                strokeDashoffset={2 * Math.PI * 10 * ((100 - progress) / 100)}
                strokeLinecap="round"
              />
            </svg>
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full border-2 border-gray-200"></div>
        )}
      </div>
    </div>
  );
}
