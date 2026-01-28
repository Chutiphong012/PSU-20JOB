"use client";

import Image from "next/image";
import PSULogo from "@/assets/psu4.png";
import TickIcon from "@/assets/tick.png";
import { useTranslation } from "react-i18next";

interface SurveySuccessStepProps {
  onBackToInstruction: () => void;
}

export function SurveySuccessStep({
  onBackToInstruction,
}: SurveySuccessStepProps) {
  const { t } = useTranslation('employer');

  const handleClose = () => {
    onBackToInstruction();
  };

  return (
    // 1. เปลี่ยน h-screen เป็น min-h-dvh เพื่อรองรับ Address bar ของมือถือ และให้ scroll ได้ถ้าจอเตี้ย
    <div className="min-h-dvh w-full flex flex-col relative overflow-hidden font-['Prompt']">
      {/* --- BACKGROUND ZONE --- */}
      <div className="absolute inset-0 bg-[#003C71] z-0" />
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 900V0H1440L0 900Z" fill="rgba(255, 255, 255, 0.03)" />
      </svg>

      {/* --- HEADER ZONE (LOGO) --- */}
      <header className="flex-none w-full p-4 md:p-7 z-20">
        <Image
          src={PSULogo}
          alt="PSU Logo"
          width={300}
          height={65}
          className="w-28 md:w-60 h-auto object-contain"
        />
      </header>

      {/* --- CONTENT ZONE (CARD) --- */}
      {/* 2. เพิ่ม padding-bottom ให้มากขึ้นในมือถือ (pb-10) กันตกลงไปชิดขอบล่างเกินไป */}
      <main className="flex-1 flex items-center justify-center p-4 pb-10 md:pb-70 z-10 w-full h-full">
        <div
          className="
          bg-white 
          rounded-3xl md:rounded-4xl /* ลดความโค้งมนในมือถือนิดนึง */
          
          /* 3. Responsive Width: มือถือเอา 90% ของจอ / จอใหญ่ใช้ max-w-250 เท่าเดิม */
          w-[90%] md:w-full md:max-w-250 
          
          flex flex-col items-center justify-center text-center shadow-2xl 
          
          /* 4. Responsive Padding: มือถือลด padding ลง */
          py-8 px-5 md:py-12 md:px-24
        "
        >
          {/* ไอคอน (คง animate-bounce ไว้) */}
          <div className="mb-4">
            <Image
              src={TickIcon}
              alt="Success"
              width={80}
              height={80}
              className="w-14 h-14 md:w-18 md:h-18 object-contain animate-bounce"
            />
          </div>

          {/* หัวข้อ */}
          <h1 className="text-lg md:text-3xl font-bold text-[#0066cc] mb-3">
            {t('success.title')}
          </h1>

          {/* ข้อความรอง */}
          <p className="text-gray-600 text-sm md:text-lg mb-6 leading-relaxed">
            {t('success.thank_you')}
          </p>

          {/* เส้นแบ่ง */}
          <div className="w-20 md:w-25 h-[1.5px] bg-gray-200 mb-6" />

          {/* ข้อมูลติดต่อ */}
          <div className="mb-6 md:mb-8 w-full">
            <p className="text-gray-500 text-xs md:text-base mb-2">
              {t('success.contact_intro')}
            </p>
            <p className="text-gray-800 font-semibold text-sm md:text-lg mb-1">
              {t('success.department')}
            </p>
            <p className="text-gray-500 text-xs md:text-base mb-3">
              {t('success.office')}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 md:w-5 md:h-5 text-gray-600"
              >
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
              <a
                href="mailto:psu-job@psu.ac.th"
                className="text-sm md:text-base text-gray-700 hover:underline hover:text-[#0057D9] break-all"
              >
                psu-job@psu.ac.th
              </a>
            </div>
          </div>

          {/* ปุ่มปิด */}
          <button
            onClick={handleClose}
            className="
              group
              w-full md:w-auto /* มือถือปุ่มเต็มความกว้าง */
              px-10 py-3 md:px-16 md:py-3 rounded-xl 
              bg-white border border-gray-300 text-gray-500 text-sm md:text-base font-medium 
              cursor-pointer transition-all duration-300 ease-in-out
              active:scale-95 /* เพิ่ม effect ตอนกดในมือถือ */
              hover:bg-linear-to-b hover:from-[#8c8c8c] hover:to-[#555555]
              hover:text-white hover:border-transparent hover:shadow-lg
            "
          >
            <span className="block transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-md">
              {t('success.close_button')}
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}

