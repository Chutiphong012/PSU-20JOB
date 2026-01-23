// src/components/graduate/SurveyStatusContent.tsx
"use client";

import { FileText, X, Check, Download } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SurveyStatusContent() {
  // สถานะการกรอก (ในระบบจริงค่านี้ควรมาจาก API)
  const [isCompleted, setIsCompleted] = useState(false); //ture,false เพื่อtest

  return (
    <main className="grow w-full font-['Prompt']">
      <div className="flex flex-col gap-5">
        <div className="bg-[#15158A] px-8 py-5 rounded-[20px] shadow-sm flex items-center">
          <h1 className="text-white text-xl md:text-2xl font-bold">
            สถานะการตอบแบบสอบถาม
          </h1>
        </div>

        <div className="bg-white px-8 py-8 rounded-[20px] shadow-sm h-full border border-gray-100 min-h-125">
          {/* Banner */}
          <div
            className={`rounded-full p-2 pl-3 pr-2 flex flex-col md:flex-row items-center justify-between gap-4 mb-8 shadow-sm transition-colors duration-500 ${
              isCompleted ? "bg-[#27AE60]" : "bg-[#A50000]"
            }`}
          >
            <div className="flex items-center gap-4 pl-2">
              <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                {isCompleted ? (
                  <Check className="text-[#2E7D32]" size={26} strokeWidth={3} />
                ) : (
                  <X className="text-[#A50000]" size={26} strokeWidth={3} />
                )}
              </div>
              <span className="text-white text-xl font-bold tracking-wide">
                {isCompleted ? "กรอกแบบสอบถามเสร็จสิ้น" : "ยังไม่กรอกแบบสอบถาม"}
              </span>
            </div>

            {isCompleted ? (
              /* ส่ง mode=success เพื่อให้หน้า QuestionnaireForm ข้ามไปหน้า QR Code ทันที */
              <Link href="/graduate/questionnaire?mode=success">
                <button className="group bg-[#2E7D32] border border-white/30 text-white px-6 py-2.5 rounded-full flex items-center gap-2 hover:bg-white hover:text-[#2E7D32] hover:scale-105 transition-all duration-300 shadow-md cursor-pointer">
                  ดาวน์โหลดใบรับรอง
                  <Download size={20} />
                </button>
              </Link>
            ) : (
              <Link href="/graduate/instructions">
                <button className="group bg-white text-black px-6 py-2.5 rounded-full flex items-center gap-2 hover:bg-[#333333] hover:text-white hover:scale-105 transition-all duration-300 shadow-md border border-gray-100 cursor-pointer">
                  เริ่มกรอกแบบสอบถาม
                  <FileText
                    size={20}
                    className="text-[#18305D] group-hover:text-white"
                  />
                </button>
              </Link>
            )}
          </div>

          <div className="text-center mb-6 text-gray-600">
            <p>
              สามารถดาวน์โหลดใบรับรอง หรือบันทึกหน้าจอไว้ในเครื่อง
              แล้วนำไปแสดง/ส่งให้เจ้าหน้าที่ที่เกี่ยวข้อง
            </p>
          </div>

          <div className="bg-[#F8F9FA] rounded-xl p-8 border border-gray-200 shadow-inner leading-relaxed">
            <h3 className="text-[#18305D] font-bold text-lg mb-4 text-center border-b pb-4">
              ข้อปฏิบัติการรายงานตัวเพื่อเข้ารับพระราชทานปริญญาบัตร ผ่าน Web
              ของนักศึกษาที่สำเร็จการศึกษา ปีการศึกษา 2567
            </h3>
            <div className="text-sm text-gray-700 space-y-4 max-w-4xl mx-auto">
              <p>
                ก่อนที่บัณฑิตจะยืนยันเพื่อรายงานตัวเข้ารับพระราชทานปริญญาบัตร
                ทางมหาวิทยาลัยขอความร่วมมือบัณฑิตทุกคนกรอกแบบสอบถามภาวะการมีงานทำของบัณฑิตให้สมบูรณ์ถูกต้องตามความเป็นจริง...
              </p>
              <div className="pl-5 space-y-2">
                <p>
                  1. ให้บัณฑิตเข้าไปที่เว็บไซต์{" "}
                  <span className="text-blue-600 underline">
                    http://www.job.psu.ac.th
                  </span>
                </p>
                <p>
                  2.
                  ให้พิมพ์เอกสารการรายงานตัวเพื่อเข้ารับพระราชทานปริญญาบัตรจากข้อที่
                  1
                </p>
              </div>
              <p className="text-red-600 font-bold text-center mt-6 italic">
                อย่าลืม!!! พิมพ์เอกสารเพื่อยืนยันการบันทึกข้อมูล
                และนำมาเป็นเอกสารประกอบการรายงานตัว
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
