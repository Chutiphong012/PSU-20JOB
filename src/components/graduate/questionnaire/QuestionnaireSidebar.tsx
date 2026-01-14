// src/components/graduate/questionnaire/QuestionnaireSidebar.tsx
'use client';

import { User, FileText, Briefcase, GraduationCap, ChevronDown, CheckCircle, Circle } from 'lucide-react';

export function QuestionnaireSidebar() {
  return (
    <aside className="w-full lg:w-[320px] shrink-0 flex flex-col gap-4">
            
      {/* 1. Profile Card (สีน้ำเงินเข้ม) */}
      <div className="bg-[#15158A] rounded-3xl p-6 text-white relative overflow-hidden shadow-md">
          <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-3">
                  <User size={44} className="text-[#15158A]" />
              </div>
              <h3 className="font-bold text-xl">ชื่อ นามสกุล</h3>
          </div>
          
          {/* Progress */}
          <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium opacity-90">
                  <span>Completed: 30%</span>
                  <span>30%</span>
              </div>
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                  <div className="bg-white h-full w-[30%] rounded-full"></div>
              </div>
          </div>
      </div>

      {/* 2. Navigation Menu */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col gap-2">
          
          {/* Header ส่วนที่ 1 (Active สีฟ้าสดใส) */}
          <div className="bg-[#1890FF] text-white rounded-xl p-4 flex justify-between items-center cursor-pointer shadow-sm">
              <div>
                  <div className="text-xs opacity-90 mb-0.5">ส่วนที่ 1</div>
                  <div className="font-bold text-sm">ภาวะการมีงานทำของบัณฑิต</div>
              </div>
              <div className="relative w-9 h-9 flex items-center justify-center">
                   {/* Circular Progress Mockup */}
                   <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path className="text-white/30" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                      <path className="text-white" strokeDasharray="30, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                   </svg>
                   <span className="absolute text-[10px] font-bold">30%</span>
              </div>
          </div>

          {/* List รายการ (Steps) */}
          <div className="pl-2 pr-1 py-2 flex flex-col gap-2">
              
              {/* Step 1: Active */}
              <div className="flex items-center gap-3 bg-[#E6F7FF] text-[#1890FF] p-3 rounded-lg border-l-4 border-[#1890FF]">
                  <FileText size={18} />
                  <span className="text-sm font-bold">ตอนที่ 1 ข้อมูลทั่วไป</span>
                  <div className="ml-auto w-3 h-3 rounded-full border-2 border-[#1890FF]"></div>
              </div>

              {/* Step 2 */}
              <div className="flex items-center gap-3 text-gray-400 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <Briefcase size={18} />
                  <span className="text-sm">ตอนที่ 2 การสมัครงาน...</span>
                  <div className="ml-auto w-3 h-3 rounded-full border-2 border-gray-300 border-t-[#1890FF] animate-spin"></div>
              </div>

              {/* Step 3 */}
              <div className="flex items-center gap-3 text-gray-400 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <Briefcase size={18} />
                  <span className="text-sm">ตอนที่ 3 การทำงาน...</span>
                  <div className="ml-auto w-3 h-3 rounded-full border-2 border-gray-300"></div>
              </div>

               {/* Step 4 */}
               <div className="flex items-center gap-3 text-gray-400 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <GraduationCap size={18} />
                  <span className="text-sm">ตอนที่ 4 การศึกษาต่อ...</span>
                  <div className="ml-auto w-3 h-3 rounded-full border-2 border-gray-300"></div>
              </div>

               {/* Step 5 */}
               <div className="flex items-center gap-3 text-gray-400 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <FileText size={18} />
                  <span className="text-sm">ตอนที่ 5 ข้อเสนอแนะ</span>
                  <div className="ml-auto w-3 h-3 rounded-full border-2 border-gray-300"></div>
              </div>

          </div>

          <div className="border-t border-gray-100 pt-3">
              <div className="flex items-center justify-between text-gray-500 p-3 text-sm font-medium">
                   <div>
                        <div className="text-xs text-gray-400">ส่วนที่ 2</div>
                        <div>การประเมินตนเอง...</div>
                   </div>
                   <Circle size={18} className="text-gray-300" />
              </div>
          </div>

      </div>
    </aside>
  );
}