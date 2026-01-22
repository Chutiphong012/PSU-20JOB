// src/components/employer/questionnaire/steps/InstructionStep.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { FileText, Phone, Mail } from "lucide-react";

// ✅ Import Assets
import PsuLogo from "@/assets/psu4.png";
import EmployerCover from "@/assets/employer-cover.png";

interface InstructionStepProps {
  onNext: () => void;
}

export function InstructionStep({ onNext }: InstructionStepProps) {
  const [lang, setLang] = useState<"th" | "en">("th");

  const content = {
    th: {
      title: "แบบสอบถามความพึงพอใจของนายจ้าง\nหรือผู้ใช้บัณฑิต มหาวิทยาลัยสงขลานครินทร์",
      year: "รุ่นปีการศึกษา 256X",
      structureTitle: "โครงสร้างแบบสอบถาม",
      structureSubtitle: "ทั้งหมด 4 ตอน",
      structureDesc: "ข้อมูลทั่วไปเกี่ยวกับหน่วยงานและผู้ตอบแบบสอบถาม",
      quote: "ขอขอบคุณที่ท่านสละเวลาให้ข้อคิดเห็นตามความเป็นจริง",
      btnStart: "เริ่มทำแบบสอบถาม",
      contactLabel: "ช่องทางติดต่อเรา",
      email: "psu-job@psu.ac.th",
      phone: "074-282068-9",
    },
    en: {
      title: "Questionnaire on Satisfaction of\nEmployers or Users of Graduates of PSU",
      year: "202X",
      structureTitle: "Questionnaire Structure",
      structureSubtitle: "The questionnaire consists of 4 sections.",
      structureDesc: "General information about the agency and the respondent",
      quote: "Thank you for taking the time to provide your honest feedback.",
      btnStart: "Start the Questionnaire",
      contactLabel: "Contact us",
      email: "psu-job@psu.ac.th",
      phone: "074-282068-9",
    },
  };

  const t = content[lang];

  return (
    <div className="min-h-screen w-full bg-[#F4F9FF] flex items-center justify-center p-4 font-['Prompt']">
      
      {/* Main Card Container */}
      <div className="bg-white w-full max-w-300 h-auto lg:h-full lg:max-h-[90vh] lg:aspect-video rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* --- Left Column (Dark Blue) --- */}
        <div className="w-full lg:w-[45%] bg-[#303F6C] relative flex flex-col p-6 lg:p-10 shrink-0 lg:rounded-br-[100px] z-10">
          
          {/* Logo */}
          <div className="relative z-20 shrink-0 lg:mb-0 flex justify-start">
            <Image
              src={PsuLogo}
              alt="PSU Logo"
              width={140}
              height={45}
              className="object-contain"
            />
          </div>

          {/* Illustration (ซ่อนใน mobile/tablet) */}
          <div className="hidden lg:flex relative z-10 w-full h-full items-center justify-center">
             <div className="relative w-full h-full flex items-center justify-center">
                 <Image
                    src={EmployerCover}
                    alt="Employer Cover"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
            </div>
          </div>

          {/* Decorations Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />
        </div>

        {/* --- Right Column (White) --- */}
        <div className="w-full lg:w-[55%] bg-white relative flex flex-col justify-between p-6 lg:p-10 xl:p-12">
          
          {/* Language Switcher */}
          <div className="absolute top-6 right-6 lg:top-8 lg:right-8 z-20">
            <div className="bg-gray-100 rounded-lg p-1 inline-flex">
              <button
                onClick={() => setLang("th")}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  lang === "th" ? "bg-white text-[#303F6C] shadow-sm" : "text-gray-400"
                }`}
              >
                TH
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  lang === "en" ? "bg-white text-[#303F6C] shadow-sm" : "text-gray-400"
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Header */}
          <div className="mt-8 lg:mt-2 mb-4">
            <h1 className="text-xl lg:text-[1.75rem] font-bold text-[#303F6C] leading-tight whitespace-pre-line">
              {t.title}
            </h1>
            
            {/* ✅ จุดที่แก้ไข: ลบ | ใน text ออก เหลือแค่ div เส้นกราฟิก */}
            <div className="flex items-center gap-2 mt-2">
              <div className="w-1 h-6 bg-[#1890FF] rounded-full"></div>
              <span className="text-[#1890FF] text-lg font-semibold">
                 {t.year}
              </span>
            </div>
            
          </div>

          {/* Center Content Group */}
          <div className="flex flex-col justify-center grow py-2 mb-6">
            
            {/* Info Box */}
            <div className="bg-[#F0F8FF] border border-blue-50 rounded-4xl p-6 lg:p-8 relative">
              
              {/* ส่วนข้อมูลด้านบน */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#1890FF] border border-blue-100 shrink-0">
                  <FileText size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-[#1890FF] text-sm font-bold mb-1">{t.structureTitle}</p>
                  <h3 className="text-gray-800 text-xl font-bold mb-2">{t.structureSubtitle}</h3>
                  {/* Dots */}
                  <div className="flex gap-2 mb-2">
                    <span className="w-6 h-2 bg-[#1890FF] rounded-full"></span>
                    <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                    <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                    <span className="w-2 h-2 bg-gray-300 rounded-full hidden sm:block"></span> 
                  </div>
                  <p className="text-gray-500 text-sm">{t.structureDesc}</p>
                </div>
              </div>

              {/* Quote */}
              <div className="flex items-center gap-4 mb-8">
                 <div className="h-px flex-1 bg-blue-200"></div>
                 <p className="text-center text-gray-500 italic text-xs lg:text-sm shrink-0 px-2 font-medium">
                   “ {t.quote} ”
                 </p>
                 <div className="h-px flex-1 bg-blue-200"></div>
              </div>

              {/* ปุ่ม Start (ลอยทับเส้น) */}
              <div className="absolute left-0 right-0 -bottom-7 flex justify-center z-10">
                <button
                    onClick={onNext}
                    className="w-3/4 max-w-sm bg-[#1890FF] hover:bg-[#1580E3] text-white text-lg font-bold py-4 rounded-2xl shadow-xl shadow-blue-200 transition-all transform active:scale-[0.98]"
                >
                    {t.btnStart}
                </button>
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="pt-2 mt-6 lg:mt-4">
            <p className="text-gray-400 text-[10px] lg:text-xs mb-3 font-medium">{t.contactLabel}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={`mailto:${t.email}`} className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 text-xs lg:text-sm hover:border-[#1890FF] hover:text-[#1890FF] bg-white transition-all group">
                <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-blue-50 group-hover:text-[#1890FF] transition-colors">
                    <Mail size={16} />
                </div>
                <span className="truncate font-medium">{t.email}</span>
              </a>
              <a href={`tel:${t.phone}`} className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 text-xs lg:text-sm hover:border-[#1890FF] hover:text-[#1890FF] bg-white transition-all group">
                <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-blue-50 group-hover:text-[#1890FF] transition-colors">
                    <Phone size={16} />
                </div>
                <span className="truncate font-medium">{t.phone}</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}