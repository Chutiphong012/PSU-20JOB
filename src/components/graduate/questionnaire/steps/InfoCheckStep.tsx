"use client";

import { AlertTriangle } from "lucide-react";
import { studentInfoMock } from "@/data/questionnaireMock";

export function InfoCheckStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col gap-6 font-['Prompt'] animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <span className="text-[#1890FF] text-sm font-medium">
          ส่วนที่ 1 ภาวะการมีงานทำของบัณฑิต
        </span>
        <h1 className="text-[#18305D] text-3xl font-bold mt-2">
          ตอนที่ 1 ข้อมูลทั่วไป
        </h1>
      </div>

      {/* Warning Box */}
      <div className="bg-[#FFFBE6] border-l-4 border-[#FAAD14] rounded-r-lg p-4 flex gap-3 items-start bg-opacity-60">
        <AlertTriangle className="text-[#FAAD14] shrink-0 mt-0.5" size={24} />
        <div>
          <h3 className="text-[#D46B08] font-bold text-base">
            โปรดตรวจสอบความถูกต้องของข้อมูล
          </h3>
          <p className="text-[#D46B08] text-sm opacity-90">
            ข้อมูลส่วนนี้ดึงมาจากฐานข้อมูลของระบบ หากข้อมูลไม่ถูกต้อง
            กรุณาติดต่อหน่วยงานที่รับผิดชอบเพื่อดำเนินการแก้ไข
          </p>
        </div>
      </div>

      {/* Info Card Container */}
      <div className="bg-[#F8FAFC] rounded-2xl rounded-tr-[80px] p-8 border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#1890FF]"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 text-sm md:text-base relative z-10">
          {/* Row 1 */}
          <div className="grid grid-cols-[100px_1fr] gap-4">
            <span className="text-gray-500">1. ชื่อสถาบัน</span>
            <span className="text-[#18305D] font-medium">
              {studentInfoMock.institute}
            </span>
          </div>
          <div className="grid grid-cols-[100px_1fr] gap-4">
            <span className="text-gray-500">ระดับการศึกษา</span>
            <span className="text-[#18305D] font-medium">
              {studentInfoMock.degree}
            </span>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-[100px_1fr] gap-4">
            <span className="text-gray-500">คณะ</span>
            <span className="text-[#18305D] font-medium">
              {studentInfoMock.faculty}
            </span>
          </div>
          <div className="grid grid-cols-[100px_1fr] gap-4">
            <span className="text-gray-500">ภาควิชา</span>
            <span className="text-[#18305D] font-medium">
              {studentInfoMock.department}
            </span>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-[100px_1fr] gap-4">
            <span className="text-gray-500">สาขาวิชา</span>
            <span className="text-[#18305D] font-medium">
              {studentInfoMock.major}
            </span>
          </div>
          <div className="grid grid-cols-[100px_1fr] gap-4">
            <span className="text-gray-500">หลักสูตร</span>
            <span className="text-[#18305D] font-medium">
              {studentInfoMock.curriculum}
            </span>
          </div>

          <div className="col-span-1 md:col-span-2 border-t border-gray-200/50 my-2"></div>

          {/* Row 4 */}
          <div className="grid grid-cols-[100px_1fr] gap-4">
            <span className="text-gray-500">2. ชื่อ (ไทย)</span>
            <span className="text-[#18305D] font-medium">
              {studentInfoMock.nameTH}
            </span>
          </div>
          <div className="grid grid-cols-[100px_1fr] gap-4">
            <span className="text-gray-500">นามสกุล</span>
            <span className="text-[#18305D] font-medium">
              {studentInfoMock.nameTH.split(" ")[2] || "xxxxxxx"}
            </span>
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-[100px_1fr] gap-4">
            <span className="text-gray-500">(อังกฤษ)</span>
            <span className="text-[#18305D] font-medium">
              {studentInfoMock.nameEN}
            </span>
          </div>
          <div className="grid grid-cols-[100px_1fr] gap-4">
            <span className="text-gray-500"></span>
            <span className="text-[#18305D] font-medium">
              {studentInfoMock.nameEN.split(" ").slice(2).join(" ") ||
                "xxxxxxx"}
            </span>
          </div>

          <div className="col-span-1 md:col-span-2 border-t border-gray-200/50 my-2"></div>

          {/* Row 6 */}
          <div className="grid grid-cols-[140px_1fr] gap-4 md:col-span-1">
            <span className="text-gray-500">3. เลขที่บัตรประชาชน</span>
            <span className="text-[#18305D] font-medium tracking-wide">
              {studentInfoMock.nationalID}
            </span>
          </div>
          <div className="grid grid-cols-[100px_1fr] gap-4 md:col-span-1">
            <span className="text-gray-500">รหัสนักศึกษา</span>
            <span className="text-[#18305D] font-medium">
              {studentInfoMock.studentID}
            </span>
          </div>
        </div>
      </div>

      {/* Actions Buttons */}
      <div className="flex flex-col-reverse md:flex-row gap-4 justify-end mt-4">
        <button className="px-6 py-3 rounded-xl border border-gray-300 text-gray-500 font-medium hover:bg-gray-50 transition-colors w-full md:w-auto">
          ข้อมูลไม่ถูกต้อง ติดต่อแอดมิน
        </button>
        <button
          onClick={onNext}
          className="px-6 py-3 rounded-xl bg-[#2F80ED] text-white font-bold hover:bg-[#256ac2] transition-colors shadow-lg shadow-blue-200 w-full md:w-auto"
        >
          ข้อมูลถูกต้อง เริ่มทำแบบสอบถาม
        </button>
      </div>
    </div>
  );
}
