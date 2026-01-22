// src/components/graduate/questionnaire/InstructionContent.tsx
"use client";

import { GraduationCap, Edit, Printer } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { section1Structure } from "@/data/questionnaireMock";
import { assessmentData } from "@/data/assessmentMock";

export function InstructionContent() {
  const router = useRouter();

  return (
    <div className="w-full bg-white shadow-xl rounded-b-4xl rounded-t-none overflow-hidden font-['Prompt'] flex flex-col relative border border-gray-100 min-h-[calc(100vh-2rem)]">
      {/* 1. Header Banner (ปรับแก้ตาม Figma) */}
      <div className="bg-linear-to-br from-[#4285F4] to-[#124DC1] py-8 md:py-10 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-5 text-center md:text-left relative z-10 rounded-b-[60px] shadow-sm min-h-40.25">
        {/* Icon: หมวกกระโดด (animate-bounce), เอียงนิดหน่อย (-rotate-12), ไม่มีวงกลมพื้นหลัง */}
        <GraduationCap
          className="text-white w-12 h-12 md:w-16 md:h-16 shrink-0 animate-bounce -rotate-12 drop-shadow-lg"
          strokeWidth={1.5}
        />

        <h1 className="text-white text-lg md:text-2xl font-bold leading-snug tracking-wide drop-shadow-md max-w-4xl px-4">
          แบบสอบถามภาวะการมีงานทำของบัณฑิต ประจำปี 256X
        </h1>
      </div>

      {/* 2. Content Body */}
      <div className="px-6 py-8 md:px-10 md:py-10 flex flex-col gap-8 grow bg-white">
        {/* --- Section: คำชี้แจง --- */}
        <div>
          <div className="flex items-center gap-3 mb-5 border-l-[6px] border-[#1890FF] pl-4 h-8">
            <h2 className="text-[#1890FF] text-xl md:text-2xl font-bold self-center pt-1">
              คำชี้แจง
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {/* Box 1 */}
            <div className="bg-[#F0F5FF] border border-[#ADC6FF] rounded-2xl p-5 md:p-6 flex gap-4 items-start shadow-sm">
              <div className="bg-[#1890FF] p-2.5 rounded-xl shrink-0 text-white shadow-md shadow-blue-200 mt-1">
                <Edit size={24} />
              </div>
              <div>
                <h3 className="text-[#1D39C4] font-bold text-lg mb-1">
                  การบันทึกข้อมูล
                </h3>
                <p className="text-[#595959] text-sm md:text-base leading-relaxed">
                  กรุณาตอบข้อมูลให้สมบูรณ์{" "}
                  <span className="inline-block bg-[#FFF7E6] text-[#D46B08] px-2 py-0.5 rounded border border-[#FFD591] font-medium text-xs md:text-sm mx-1">
                    กรณีที่ไม่มีข้อมูลในเรื่องนั้น ๆ ให้ใส่เครื่องหมายลบ ( - )
                  </span>{" "}
                  อย่าเว้นว่างไว้
                  เพราะระบบจะไม่สามารถบันทึกและผ่านไปหน้าถัดไปได้
                </p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-[#F6FFED] border border-[#B7EB8F] rounded-2xl p-5 md:p-6 flex gap-4 items-start shadow-sm">
              <div className="bg-[#52C41A] p-2.5 rounded-xl shrink-0 text-white shadow-md shadow-green-200 mt-1">
                <Printer size={24} />
              </div>
              <div>
                <h3 className="text-[#135200] font-bold text-lg mb-1">
                  การพิมพ์ใบรับรอง
                </h3>
                <p className="text-[#595959] text-sm md:text-base leading-relaxed">
                  สามารถพิมพ์หรือบันทึกหน้าจอไว้ในเครื่อง
                  แล้วนำไปแสดง/ส่งให้เจ้าหน้าที่ ที่เกี่ยวข้องได้
                  <span className="hidden lg:inline"> </span>
                  และใน กรณีที่{" "}
                  <span className="text-[#CF1322] font-bold">
                    ไม่สามารถ
                  </span>{" "}
                  พิมพ์ใบรับรองได้ทันที บัณฑิตสามารถเข้ามาบันทึกได้ในภายหลัง
                  โดยไปที่หัวข้อ{" "}
                  <span className="font-bold text-gray-800">พิมพ์ใบรายงาน</span>{" "}
                  โดยไม่ต้องบันทึกข้อมูลใหม่
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Divider --- */}
        <div className="relative py-4">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t-4 border-[#1890FF]/20 rounded-full"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-white px-6 text-center">
              <span className="block text-[#1890FF] font-bold text-2xl md:text-2xl">
                แบบสอบถามนี้มี 2 ส่วน
              </span>
              <span className="block text-[#1890FF]  text-xl mt-1 ">
                “ ต้องตอบให้ครบทุกส่วน ”
              </span>
            </div>
          </div>
        </div>

        {/* --- Section Structure Columns --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {/* Column 1: ส่วนที่ 1 (Purple) */}
          <div className="flex flex-col relative group">
            <div className="relative z-20 w-full bg-linear-to-r from-[#722ED1] to-[#9254DE] p-5 rounded-2xl shadow-md transform transition-transform group-hover:-translate-y-1">
              <div className="flex justify-between items-center text-white">
                <div>
                  <div className="text-xs font-medium opacity-90 mb-1 uppercase tracking-wider">
                    ส่วนที่ 1
                  </div>
                  <div className="font-bold text-lg md:text-xl">
                    ภาวะการมีงานทำของบัณฑิต
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center text-xl font-bold bg-white/10">
                  1
                </div>
              </div>
            </div>

            <div className="relative z-10 -mt-6 ml-4 pt-9 pb-4 pr-4 pl-5 bg-white border-l-[6px] border-[#722ED1] rounded-r-2xl rounded-bl-2xl shadow-sm border-t-0   ">
              <div className="flex flex-col gap-2">
                {section1Structure.map((part, index) => (
                  <ListItem
                    key={index}
                    label={part.label}
                    count={`${part.count} ข้อ`}
                    theme="purple"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: ส่วนที่ 2 (Teal/Green) */}
          <div className="flex flex-col relative group">
            <div className="relative z-20 w-full bg-linear-to-r from-[#006D75] to-[#13C2C2] p-5 rounded-2xl shadow-md transform transition-transform group-hover:-translate-y-1">
              <div className="flex justify-between items-center text-white">
                <div>
                  <div className="text-xs font-medium opacity-90 mb-1 uppercase tracking-wider">
                    ส่วนที่ 2
                  </div>
                  <div className="font-bold text-lg md:text-xl">
                    การประเมินตนเองของบัณฑิต
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center text-xl font-bold bg-white/10">
                  2
                </div>
              </div>
            </div>

            <div className="relative z-10 -mt-6 ml-4 pt-9 pb-4 pr-4 pl-5 bg-white border-l-[6px] border-[#006D75] rounded-r-2xl rounded-bl-2xl shadow-sm border-t-0 ">
              <div className="flex flex-col gap-2">
                {assessmentData.map((category, index) => (
                  <ListItem
                    key={category.id}
                    label={`${index + 1}. ${category.title} ${category.subTitle}`}
                    count={`${category.questions.length} ข้อ`}
                    theme="teal"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Footer Actions (ปรับปุ่มให้เล็กกระชับตามที่เคยขอ) */}
      <div className="bg-[#F9FAFB] px-6 py-8 md:px-10 border-t border-gray-200 mt-auto">
        <div className="text-center text-gray-400 text-xs mb-6 font-light">
          ระบบจะเก็บข้อมูลของท่านไว้เป็นความลับตามนโยบายของสถาบัน
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-4 items-center w-full max-w-xl mx-auto">
          <button
            onClick={() => router.back()}
            className="w-full md:flex-1 py-3 rounded-xl border border-gray-300 text-gray-500 font-bold bg-white hover:bg-gray-50 transition-all active:scale-95 shadow-sm"
          >
            ย้อนกลับ
          </button>

          <Link
            href="/graduate/questionnaire?mode=check"
            className="w-full md:flex-1 block"
          >
            <button className="w-full py-3 rounded-xl bg-[#2F54EB] text-white font-bold text-lg hover:bg-[#1D39C4] transition-all shadow-lg shadow-blue-200/50 hover:shadow-blue-300/50 active:scale-95">
              เริ่มทำแบบสอบถาม
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ListItem({
  label,
  count,
  theme,
}: {
  label: string;
  count: string;
  theme: "purple" | "teal";
}) {
  const badgeStyles =
    theme === "purple"
      ? { bg: "bg-[#F9F0FF]", text: "text-[#722ED1]" }
      : { bg: "bg-[#E6FFFB]", text: "text-[#006D75]" };

  return (
    <div className="flex justify-between items-start py-2.5 px-2 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors cursor-default">
      <span className="font-medium text-gray-700 text-sm pr-2 leading-snug">
        {label}
      </span>
      <span
        className={`${badgeStyles.bg} ${badgeStyles.text} text-[10px] md:text-xs px-2.5 py-1 rounded-md whitespace-nowrap font-bold self-center shrink-0`}
      >
        {count}
      </span>
    </div>
  );
}
