// src/components/graduate/questionnaire/QuestionnaireSidebar.tsx
"use client";

import { useState } from "react";
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
  Circle,
  CheckCircle2,
} from "lucide-react";

// 1. แก้ไข Interface ให้ชื่อตรงกับที่ส่งมาจาก page.tsx
interface SidebarProps {
  overallProgress?: number; // รับค่า % รวม
  part1Progress?: number; // รับค่า % ของส่วนที่ 1
  completedSections?: number[]; // รับ Array รายการที่ทำเสร็จ
}

export function QuestionnaireSidebar({
  overallProgress = 0,
  part1Progress = 0,
  completedSections = [],
}: SidebarProps) {
  const [activeSection, setActiveSection] = useState<number | null>(1);

  const toggleSection = (section: number) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <aside className="w-full  lg:w-[320px] shrink-0 flex flex-col gap-2 font-['Prompt'] ">
      {/* 1. Profile Card */}
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

        {/* Progress Bar (ใช้ overallProgress) */}
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

      {/* 2. Section 1 */}
      <div
        className={`rounded-2xl transition-all duration-300 overflow-hidden border border-transparent ${
          activeSection === 1
            ? "shadow-lg bg-white"
            : "shadow-sm bg-white hover:shadow-md"
        }`}
      >
        {/* Header */}
        <div
          onClick={() => toggleSection(1)}
          className={`p-5 flex  items-center justify-between cursor-pointer transition-colors duration-300 ${
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

          {/* Circular Progress (ใช้ part1Progress) */}
          <div className="relative w-9 h-9 flex items-center justify-center">
            {activeSection === 1 ? (
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
                    strokeDasharray={`${part1Progress}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </svg>
                <span className="absolute text-[9px] font-bold">
                  {part1Progress}%
                </span>
              </div>
            ) : (
              <Circle size={28} strokeWidth={2} className="text-gray-200" />
            )}
          </div>
        </div>

        {/* List Items (ใช้ completedSections) */}
        {activeSection === 1 && (
          <div className="py-2 animate-in slide-in-from-top-2 duration-200">
            <SidebarItem
              icon={<FileText />}
              text="ตอนที่ 1 ข้อมูลทั่วไป"
              isCompleted={completedSections.includes(1)}
            />
            <SidebarItem
              icon={<Briefcase />}
              text="ตอนที่ 2 การสมัครงานและการทำงาน"
              subText="(สำหรับผู้มีงานทำแล้ว)"
              isCompleted={completedSections.includes(2)}
            />
            <SidebarItem
              icon={<FileSearch />}
              text="ตอนที่ 3 การสมัครงานและการทำงาน"
              subText="(สำหรับผู้ที่ยังไม่ได้ทำงาน)"
              isCompleted={completedSections.includes(3)}
            />
            <SidebarItem
              icon={<GraduationCap />}
              text="ตอนที่ 4 การศึกษาต่อ"
              subText="(สำหรับผู้ศึกษาต่อ/ต้องการศึกษาต่อ)"
              isCompleted={completedSections.includes(4)}
            />
            <SidebarItem
              icon={<FilePenLine />}
              text="ตอนที่ 5 ข้อเสนอแนะ"
              isCompleted={completedSections.includes(5)}
            />
          </div>
        )}
      </div>

      {/* 3. Section 2 */}
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
          <Circle
            size={28}
            strokeWidth={2}
            className={`${
              activeSection === 2 ? "text-white/40" : "text-gray-200"
            }`}
          />
        </div>
        {activeSection === 2 && (
          <div className="py-2 animate-in slide-in-from-top-2 duration-200">
            <SidebarItem
              icon={<Users />}
              text="ทักษะทางสังคม (Basic soft skills)"
            />
            <SidebarItem
              icon={<Globe />}
              text="ทักษะด้านเทคโนโลยี/Digital"
              subText="(Digital & technical skills)"
            />
            <SidebarItem
              icon={<Briefcase />}
              text="ทักษะด้านการจัดการธุรกิจ"
              subText="(Core marketing skills)"
            />
            <SidebarItem
              icon={<LineChart />}
              text="ทักษะด้านการวิเคราะห์/สังเคราะห์"
              subText="(Analytical skills)"
            />
            <SidebarItem
              icon={<Users />}
              text="ทักษะด้านลูกค้า"
              subText="(Customer insights skills)"
            />
          </div>
        )}
      </div>
    </aside>
  );
}

// Helper Component
function SidebarItem({
  icon,
  text,
  subText,
  isCompleted = false,
}: {
  icon: any;
  text: string;
  subText?: string;
  isCompleted?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-4 px-5 py-4 transition-colors cursor-pointer group border-l-4 
            ${
              isCompleted
                ? "border-transparent bg-white"
                : "border-transparent hover:border-gray-200 hover:bg-gray-50"
            }
        `}
    >
      <div
        className={`mt-0.5 transition-colors ${
          isCompleted
            ? "text-gray-600"
            : "text-gray-400 group-hover:text-gray-600"
        }`}
      >
        <div className="w-5 h-5 [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-[1.5]">
          {icon}
        </div>
      </div>

      <div className="flex flex-col grow">
        <span
          className={`text-sm font-medium leading-tight transition-colors ${
            isCompleted
              ? "text-[#18305D]"
              : "text-gray-500 group-hover:text-gray-700"
          }`}
        >
          {text}
        </span>
        {subText && (
          <span className="text-[11px] text-gray-400 mt-0.5 font-light">
            {subText}
          </span>
        )}
      </div>

      <div className="shrink-0 mt-0.5">
        {isCompleted ? (
          <CheckCircle2 size={24} className="fill-[#1890FF] text-white" />
        ) : (
          <Circle
            size={24}
            className="text-gray-200 group-hover:text-gray-300 transition-colors"
          />
        )}
      </div>
    </div>
  );
}
