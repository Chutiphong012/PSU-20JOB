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

// ✅ แก้ไขตรงนี้: แยก Import ให้ถูกไฟล์
import { assessmentData } from "@/data/assessmentMock";
import { section1Structure } from "@/data/questionnaireMock";

// ✅ Type รองรับ Dynamic Keys
export interface ProgressData {
  [key: string]: number;
}

interface SidebarProps {
  progressData: ProgressData;
  forceOpenSection?: number | null; // ✅ รับค่าเพื่อสั่งเปิด Section
}

// ✅ Helper Function เลือก Icon ตาม ID ของ Part
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
}: SidebarProps) {
  const [activeSection, setActiveSection] = useState<number | null>(1);

  // ✅ Effect: เปิด Section ตามคำสั่งจาก Form (เช่น จบ Sec 1 -> เปิด Sec 2)
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
    const p1 = progressData.part1 || 0;
    const p2 = progressData.part2 || 0;
    const p3 = progressData.part3 || 0;
    const p4 = progressData.part4 || 0;
    const p5 = progressData.part5 || 0;
    return Math.round((p1 + p2 + p3 + p4 + p5) / 5);
  }, [progressData]);

  // 2. Section 2 Progress (Average of Assessment Categories)
  const section2Progress = useMemo(() => {
    if (!assessmentData || assessmentData.length === 0) return 0;
    const total = assessmentData.reduce((acc, cat) => {
      return acc + (progressData[cat.id] || 0); // ดึงค่าตาม ID ของ category (soft_skills, etc.)
    }, 0);
    return Math.round(total / assessmentData.length);
  }, [progressData]);

  // 3. Overall Progress
  const overallProgress = Math.round((section1Progress + section2Progress) / 2);

  return (
    <aside className="w-full lg:w-[320px] shrink-0 flex flex-col gap-2 font-['Prompt']">
      {/* --- Profile Card --- */}
      <div className="bg-[#003870] rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
        <div className="flex items-start gap-3 mb-6 relative z-10">
          <Menu size={24} className="mt-1 shrink-0 text-white/90" />
          <div className="text-sm font-light leading-snug text-white/90">
            แบบสอบถามภาวะการมีงานทำของบัณฑิต ประจำปี 256X
          </div>
        </div>
        <div className="flex flex-col items-center mb-6 relative z-10">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-3 shadow-md">
            <User size={60} className="text-[#002D55]" />
          </div>
          <h3 className="font-bold text-xl tracking-wide">ชื่อ นามสกุล</h3>
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
                ส่วนที่ 1
              </div>
              <div className="font-bold text-base">ภาวะการมีงานทำของบัณฑิต</div>
            </div>
          </div>
          <ProgressRing
            percent={section1Progress}
            active={activeSection === 1}
          />
        </div>

        {activeSection === 1 && (
          <div className="py-2 animate-in slide-in-from-top-2 duration-200">
            {/* ✅ ใช้ Loop render จาก section1Structure แทนการเขียน Hardcode */}
            {section1Structure.map((part) => (
              <SidebarItem
                key={part.id}
                icon={getPartIcon(part.id)}
                text={part.label}
                subText={part.subLabel}
                progress={progressData[`part${part.id}`] || 0}
              />
            ))}
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
                ส่วนที่ 2
              </div>
              <div className="font-bold text-base">
                การประเมินตนเองของบัณฑิต
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
            {assessmentData.map((category) => (
              <SidebarItem
                key={category.id}
                icon={getCategoryIcon(category.id)}
                text={category.title}
                subText={category.subTitle}
                progress={progressData[category.id] || 0} // ดึง Progress ตาม ID
              />
            ))}
          </div>
        )}
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
}: {
  icon: any;
  text: string;
  subText?: string;
  progress: number;
}) {
  const isCompleted = progress === 100;
  return (
    <div
      className={`flex items-start gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 transition-colors cursor-pointer group border-l-4 ${
        isCompleted
          ? "border-[#1890FF] bg-blue-50/50"
          : "border-transparent hover:border-gray-200 hover:bg-gray-50"
      }`}
    >
      <div
        className={`mt-0.5 transition-colors ${
          isCompleted
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
