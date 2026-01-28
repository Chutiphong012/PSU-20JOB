// src/components/graduate/questionnaire/steps/SurveyStatusContent.tsx
"use client";

import { FileText, X, Check, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // Import Image
import { useState } from "react";
import { useTranslation, Trans } from 'react-i18next';
import graduationCapImg from "@/assets/image 98.png"; // Import assets
import studentImg from "@/assets/image 99.png";

export default function SurveyStatusContent() {
  const { t } = useTranslation('graduate');
  // สถานะการกรอก (ในระบบจริงค่านี้ควรมาจาก API)
  const [isCompleted, setIsCompleted] = useState(false); //ture,false เพื่อtest

  return (
    <main className="grow w-full font-['Prompt']">
      <div className="flex flex-col gap-5">
        <div className="bg-[#15158A] px-8 py-5 rounded-[20px] shadow-sm flex items-center">
          <h1 className="text-white text-xl md:text-2xl font-bold">
            {t('survey.title')}
          </h1>
        </div>

        <div className="bg-white px-8 py-10 rounded-[20px] shadow-sm h-full border border-gray-100 min-h-125">
          {/* Banner */}
          {!isCompleted ? (
            <div className="bg-[#A50000] rounded-[30px] md:rounded-full p-6 md:p-3 md:pl-4 md:pr-3 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 mb-8 shadow-sm transition-all duration-500">
              <div className="flex flex-col md:flex-row items-center gap-4 pl-0 md:pl-2 text-center md:text-left">
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                  <X className="text-[#A50000]" size={30} strokeWidth={3} />
                </div>
                <div className="flex flex-col text-white">
                    <span className="text-xl font-bold tracking-wide leading-none">{t('survey.status.incomplete')}</span>
                    <span className="text-sm font-light opacity-90 mt-1">{t('survey.status.incomplete_sub')}</span>
                </div>
              </div>

              <Link href="/graduate/instructions" className="w-full md:w-auto">
                <button className="w-full md:w-auto group bg-[#F4F4F4] text-black px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white hover:scale-105 transition-all duration-300 shadow-md border border-gray-200 cursor-pointer font-medium">
                  {t('survey.buttons.start_survey')}
                  <FileText
                    size={20}
                    className="text-black group-hover:scale-110 transition-transform"
                  />
                </button>
              </Link>
            </div>
          ) : (
            <div className="bg-[#27AE60] rounded-[30px] md:rounded-full p-6 md:p-3 md:pl-4 md:pr-3 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 mb-8 shadow-sm transition-all duration-500">
               <div className="flex flex-col md:flex-row items-center gap-4 pl-0 md:pl-2 text-center md:text-left">
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                   <Check className="text-[#2E7D32]" size={30} strokeWidth={3} />
                </div>
                <span className="text-white text-xl font-bold tracking-wide">
                    {t('survey.status.completed')}
                </span>
              </div>
               {/* ส่ง mode=success เพื่อให้หน้า QuestionnaireForm ข้ามไปหน้า QR Code ทันที */ }
              <Link href="/graduate/questionnaire?mode=success" className="w-full md:w-auto">
                <button className="w-full md:w-auto group bg-[#F4F4F4] text-[#2E7D32] px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white hover:scale-105 transition-all duration-300 shadow-md border border-gray-200 cursor-pointer font-medium">
                  {t('survey.buttons.download_cert')}
                  <Download size={20} />
                </button>
              </Link>
            </div>
          )}

          {/* Instruction Card */}
          <div className="bg-[#F8F9FA] rounded-[30px] p-8 md:p-12 border border-blue-50/50 shadow-inner relative overflow-hidden">
             
             {/* Header */}
             <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8 relative z-10 mx-auto">
                <div className="shrink-0">
                     {/* Image 98: Graduation Cap */}
                     <Image src={graduationCapImg} alt="Graduation Cap" width={100} height={100} className="w-16 h-16 md:w-20 md:h-20 object-contain opacity-90" />
                </div>
                <div className="text-center md:text-left">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed">
                        {t('survey.instruction.title')}
                    </h2>
                    <p className="text-gray-500 text-base md:text-lg mt-1 font-light">
                        {t('survey.instruction.subtitle')}
                    </p>
                    <div className="w-24 h-1 bg-gray-200 rounded-full mt-4 mx-auto md:mx-0"></div>
                </div>
             </div>

             {/* Yellow Bar Note container with relative positioning for the icon */}
             <div className="relative w-full mb-10 z-10">
                 {/* Yellow Bar Note */}
                 <div className="flex border-l-4 border-[#F5A623] bg-white rounded-r-xl p-6 md:p-8 shadow-sm relative z-0">
                     <p className="text-gray-600 leading-relaxed text-sm md:text-base pr-4 md:pr-16 text-left w-full">
                        <span dangerouslySetInnerHTML={{ __html: t('survey.instruction.intro').replace('http://www.job.psu.ac.th', '<a href="http://www.job.psu.ac.th" class="text-blue-500 underline hover:text-blue-700 font-medium" target="_blank">http://www.job.psu.ac.th</a>') }}></span>
                     </p>
                 </div>
                 
                 {/* Image 99: Student Icon - Absolute positioned */}
                 <div className="absolute -bottom-2 -right-2 md:-right-4 z-10 hidden md:block">
                     <Image src={studentImg} alt="Student" width={100} height={100} className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-sm" />
                 </div>
             </div>

             {/* Timeline Steps */}
             <div className="w-full space-y-6 relative z-10 pl-4 md:pl-0">
                {/* Step 1 */}
                <div className="flex gap-6 relative">
                    {/* Line connector */}
                    <div className="absolute left-[19px] top-10 bottom-[-40px] w-[2px] bg-blue-200"></div>
                    
                    <div className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center shrink-0 bg-white text-blue-600 font-bold z-10">
                        1
                    </div>
                    <div className="pt-2">
                        <p className="text-gray-800 font-medium text-lg leading-snug">
                             <Trans i18nKey="graduate:survey.instruction.step_1">
                                กรอกข้อมูลให้ครบถ้วนสมบูรณ์ <span className="text-red-500">ก่อนวันรายงานตัวตามที่มหาวิทยาลัยกำหนด</span>
                             </Trans>
                        </p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-6 relative">
                    <div className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center shrink-0 bg-white text-blue-600 font-bold z-10">
                        2
                    </div>
                    <div className="pt-2">
                         <p className="text-gray-800 font-medium text-lg leading-snug">
                             <Trans i18nKey="graduate:survey.instruction.step_2">
                                ให้พิมพ์เอกสารรายงานตัว... <span className="text-red-500">(ในกรณีที่ไม่มีเอกสารรายงานตัวจะไม่สามารถรับเข็มวิทยฐานะได้)</span>
                             </Trans>
                        </p>
                    </div>
                </div>
             </div>

             {/* Warning */}
             <div className="w-full mt-12 flex items-start gap-3 justify-center text-center md:text-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#F5A623] shrink-0 mt-0.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                <p className="text-[#E67E22] font-bold text-base md:text-lg">
                    {t('survey.instruction.warning')}
                </p>
             </div>
             
             {/* Background Decoration */}
             <div className="absolute -right-20 -top-20 opacity-5 pointer-events-none">
                 <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
