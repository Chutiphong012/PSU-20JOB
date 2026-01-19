// src/components/graduate/questionnaire/steps/SurveySuccessStep.tsx
"use client";

import Link from "next/link";
import { Check, Download, AlertTriangle, Home } from "lucide-react";
import { studentInfoMock } from "@/data/questionnaireMock";

export function SurveySuccessStep() {
  return (
    /* ✅ ใช้ fixed inset-0 z-[100] เพื่อให้พื้นหลังเขียวเต็มหน้าจอ ไม่เห็นขอบขาวจาก Container เดิม */
    <div className="fixed inset-0 z-100 bg-[#E6F7F0] overflow-y-auto font-['Prompt'] animate-in fade-in duration-500">
      <div className="flex flex-col items-center py-12 px-4 min-h-screen">
        {/* ส่วนหัว: ไอคอนถูก และหัวข้อ */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-[#27AE60] rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Check className="w-10 h-10 text-white" strokeWidth={4} />
          </div>
          <h1 className="text-3xl font-bold text-[#1E4620] mb-3 text-center">
            การตอบแบบสอบถามเสร็จสมบูรณ์ !
          </h1>
          <p className="text-gray-600 text-center text-sm md:text-base">
            ขอบคุณสำหรับความร่วมมือ คุณสามารถดาวน์โหลดหรือพิมพ์ใบรับรองได้
          </p>
        </div>

        {/* กล่องขาว (Card) แสดงข้อมูลและ QR Code */}
        <div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-sm w-full max-w-5xl mb-10">
          <div className="flex flex-col md:flex-row justify-between gap-12">
            {/* ฝั่งซ้าย: ข้อมูลผู้ตอบแบบสอบถาม */}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800 mb-8 border-l-4 border-gray-800 pl-4">
                ข้อมูลผู้ตอบแบบสอบถาม
              </h2>
              <div className="space-y-6">
                <InfoRow label="ชื่อ-สกุล" value={studentInfoMock.nameTH} />
                <InfoRow
                  label="เลขประจำตัวนักศึกษา"
                  value={studentInfoMock.studentID}
                />
                <InfoRow label="คณะ" value={studentInfoMock.faculty} />
                <InfoRow label="สาขา" value={studentInfoMock.department} />
                <InfoRow label="หลักสูตร" value={studentInfoMock.curriculum} />
                <InfoRow label="ระดับการศึกษา" value={studentInfoMock.degree} />
              </div>
            </div>

            {/* ฝั่งขวา: QR Code */}
            <div className="flex flex-col items-center justify-center shrink-0">
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm mb-4 w-64 h-64 flex items-center justify-center">
                {/* จำลอง QR Code ตามรูป */}
                <div className="grid grid-cols-4 gap-2 opacity-80">
                  {[...Array(16)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded-sm ${
                        [0, 2, 5, 7, 8, 10, 13, 15].includes(i)
                          ? "bg-gray-800"
                          : "bg-gray-100"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
              <span className="text-[11px] text-gray-400 text-center leading-relaxed">
                เอกสารประกอบการรายงานตัว
                <br />
                เข้ารับพระราชทานปริญญาบัตร
              </span>
            </div>
          </div>

          {/* เส้นคั่นและปุ่มกด */}
          <div className="h-px bg-gray-100 w-full my-12"></div>

          <div className="flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <Link
              href="/graduate"
              className="flex-1 py-4 px-8 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all text-center flex items-center justify-center gap-2"
            >
              <Home size={18} />
              กลับหน้าหลัก
            </Link>
            <button className="flex-1 py-4 px-8 rounded-xl bg-[#2962FF] text-white font-bold hover:bg-blue-700 shadow-md shadow-blue-100 transition-all flex items-center justify-center gap-2">
              <Download size={18} />
              ดาวน์โหลดใบรับรอง
            </button>
          </div>
        </div>

        {/* หมายเหตุ ด้านล่างกล่องขาว */}
        <div className="max-w-5xl w-full px-4">
          <div className="bg-[#FFF9E6] border-l-4 border-[#FAAD14] p-6 rounded-r-xl flex gap-4 items-start">
            <AlertTriangle
              className="text-[#FAAD14] shrink-0 mt-0.5"
              size={24}
            />
            <div>
              <h3 className="text-[#856404] font-bold text-base mb-1">
                หมายเหตุ
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-[#856404] opacity-90">
                <li>
                  กรุณาเก็บรักษา QR Code
                  นี้ไว้เพื่อใช้เป็นหลักฐานในการรายงานตัวเข้ารับพระราชทานปริญญาบัตร
                </li>
                <li>
                  คุณสามารถกลับมาพิมพ์ใบรับรองได้ในภายหลัง โดยไปที่หัวข้อ{" "}
                  <strong className="underline">พิมพ์ใบรายงาน</strong>{" "}
                  โดยไม่ต้องบันทึกข้อมูลใหม่
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component ย่อยสำหรับจัดแถวข้อมูล
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[180px_1fr] items-baseline gap-4">
      <span className="text-gray-500 font-medium text-sm md:text-base">
        {label}
      </span>
      <span className="text-[#18305D] font-bold text-base md:text-lg">
        {value}
      </span>
    </div>
  );
}
