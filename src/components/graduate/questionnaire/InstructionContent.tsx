// src/components/graduate/questionnaire/InstructionContent.tsx
'use client';

import { GraduationCap, Edit, Printer } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function InstructionContent() {
  const router = useRouter();

  return (
    // ปรับ Container หลัก: ลบ margin top, ใช้ rounded-b-xl อย่างเดียว หรือปรับตามบริบทหน้าจอ
    // ในที่นี้ปรับให้เต็มความกว้างและจัดการขอบมนให้สวยงาม
    <div className="w-full bg-white shadow-sm border border-gray-100 overflow-hidden font-['Prompt'] flex flex-col min-h-screen md:min-h-0 md:rounded-3xl relative">
      
      {/* 1. Header Blue Banner - ปรับสี Gradient และระยะห่าง */}
      <div className="bg-gradient-to-r from-[#4285F4] to-[#124DC1] px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-center justify-center gap-4 text-center relative z-0">
        {/* Decorative elements could go here */}
        
        <GraduationCap className="text-white w-12 h-12 md:w-14 md:h-14 shrink-0" strokeWidth={1.5} />
        <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-bold leading-snug tracking-wide shadow-black/10 drop-shadow-md">
           แบบสอบถามภาวะการมีงานทำของบัณฑิต ประจำปี 256X
        </h1>
      </div>

      {/* 2. Content Body */}
      <div className="p-4 md:p-8 lg:p-10 flex flex-col gap-8 grow">
        
        {/* --- Section: คำชี้แจง --- */}
        <div>
           <div className="flex items-center gap-3 mb-5 border-l-[6px] border-[#1890FF] pl-3 h-8">
               <h2 className="text-[#1890FF] text-xl md:text-2xl font-bold self-center pt-1">คำชี้แจง</h2>
           </div>

           <div className="flex flex-col gap-4">
               {/* Box 1: การบันทึกข้อมูล (Blue) */}
               <div className="bg-[#F0F5FF] border border-[#ADC6FF] rounded-xl p-5 flex gap-4 items-start shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                   <div className="bg-[#1890FF] p-2.5 rounded-lg shrink-0 text-white shadow-sm mt-0.5">
                        <Edit size={20} />
                   </div>
                   <div>
                       <h3 className="text-[#1D39C4] font-bold text-base md:text-lg mb-1">การบันทึกข้อมูล</h3>
                       <p className="text-[#595959] text-sm md:text-base leading-relaxed">
                           กรุณาตอบข้อมูลให้สมบูรณ์ <span className="bg-[#FFF7E6] text-[#D46B08] px-2 py-0.5 rounded mx-1 border border-[#FFD591] font-medium">กรณีที่ไม่มีข้อมูลในเรื่องนั้น ๆ ให้ใส่เครื่องหมายลบ ( - )</span> อย่าเว้นว่างไว้ เพราะระบบจะไม่สามารถบันทึกและผ่านไปหน้าถัดไปได้
                       </p>
                   </div>
               </div>

               {/* Box 2: การพิมพ์ใบรับรอง (Green) */}
               <div className="bg-[#F6FFED] border border-[#B7EB8F] rounded-xl p-5 flex gap-4 items-start shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                   <div className="bg-[#52C41A] p-2.5 rounded-lg shrink-0 text-white shadow-sm mt-0.5">
                        <Printer size={20} />
                   </div>
                   <div>
                       <h3 className="text-[#135200] font-bold text-base md:text-lg mb-1">การพิมพ์ใบรับรอง</h3>
                       <p className="text-[#595959] text-sm md:text-base leading-relaxed">
                           สามารถพิมพ์หรือบันทึกหน้าจอไว้ในเครื่อง แล้วนำไปแสดง/ส่งให้เจ้าหน้าที่ ที่เกี่ยวข้องได้ <br className="hidden md:block"/>
                           และใน กรณีที่ <span className="text-[#CF1322] font-bold">ไม่สามารถ</span> พิมพ์ใบรับรองได้ทันที บัณฑิตสามารถเข้ามาบันทึกได้ในภายหลัง โดยไปที่หัวข้อ <span className="font-bold text-gray-800">พิมพ์ใบรายงาน</span> โดยไม่ต้องบันทึกข้อมูลใหม่
                       </p>
                   </div>
               </div>
           </div>
        </div>

        {/* --- Divider --- */}
        <div className="flex items-center gap-4 my-2">
            <div className="h-[2px] bg-[#1890FF] grow opacity-30 rounded-full"></div>
            <div className="text-center">
                <div className="text-[#1890FF] font-bold text-lg md:text-xl">แบบสอบถามนี้มี 2 ส่วน</div>
                <div className="text-gray-400 text-sm">“ ต้องตอบให้ครบทุกส่วน ”</div>
            </div>
            <div className="h-[2px] bg-[#1890FF] grow opacity-30 rounded-full"></div>
        </div>

        {/* --- Section: Structure Columns --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Column 1: ส่วนที่ 1 (Purple/Blue) */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="bg-gradient-to-r from-[#722ED1] to-[#9254DE] p-4 px-5 flex justify-between items-center text-white h-[80px]">
                    <div>
                        <div className="text-xs md:text-sm opacity-90 font-light mb-0.5">ส่วนที่ 1</div>
                        <div className="font-bold text-base md:text-lg">ภาวะการมีงานทำของบัณฑิต</div>
                    </div>
                    {/* Circle Number */}
                    <div className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center text-xl font-bold bg-white/10 backdrop-blur-sm">
                        1
                    </div>
                </div>
                <div className="bg-white p-4 flex flex-col gap-1 text-sm">
                    <ListItem 
                        label="ตอนที่ 1 ข้อมูลทั่วไป" 
                        count="12 ข้อ" 
                        textColor="text-[#722ED1]" 
                        badgeBg="bg-[#F9F0FF]" 
                        badgeText="text-[#722ED1]"
                    />
                    <ListItem 
                        label="ตอนที่ 2 การสมัครงานและการทำงาน (สำหรับผู้มีงานทำแล้ว)" 
                        count="11 ข้อ" 
                        textColor="text-[#722ED1]" 
                        badgeBg="bg-[#F9F0FF]" 
                        badgeText="text-[#722ED1]"
                    />
                    <ListItem 
                        label="ตอนที่ 3 การสมัครงานและการทำงาน (สำหรับผู้ที่ยังไม่ได้ทำงาน)" 
                        count="8 ข้อ" 
                        textColor="text-[#722ED1]" 
                        badgeBg="bg-[#F9F0FF]" 
                        badgeText="text-[#722ED1]"
                    />
                    <ListItem 
                        label="ตอนที่ 4 การศึกษาต่อ (สำหรับผู้ที่ศึกษาต่อ/ต้องการศึกษาต่อ)" 
                        count="5 ข้อ" 
                        textColor="text-[#722ED1]" 
                        badgeBg="bg-[#F9F0FF]" 
                        badgeText="text-[#722ED1]"
                    />
                    <ListItem 
                        label="ตอนที่ 5 ข้อเสนอแนะ" 
                        count="7 ข้อ" 
                        textColor="text-[#722ED1]" 
                        badgeBg="bg-[#F9F0FF]" 
                        badgeText="text-[#722ED1]"
                    />
                </div>
            </div>

            {/* Column 2: ส่วนที่ 2 (Teal) */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm h-full hover:shadow-md transition-shadow duration-300">
                <div className="bg-gradient-to-r from-[#006D75] to-[#13C2C2] p-4 px-5 flex justify-between items-center text-white h-[80px]">
                    <div>
                        <div className="text-xs md:text-sm opacity-90 font-light mb-0.5">ส่วนที่ 2</div>
                        <div className="font-bold text-base md:text-lg">การประเมินตนเองของบัณฑิต</div>
                    </div>
                     {/* Circle Number */}
                     <div className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center text-xl font-bold bg-white/10 backdrop-blur-sm">
                        2
                    </div>
                </div>
                <div className="bg-white p-4 flex flex-col gap-1 text-sm h-full">
                    <ListItem 
                        label="1. ทักษะทางสังคม (Basic soft skills)" 
                        count="7 ข้อ" 
                        textColor="text-[#006D75]" 
                        badgeBg="bg-[#E6FFFB]" 
                        badgeText="text-[#006D75]"
                    />
                    <ListItem 
                        label="2. ทักษะด้านเทคโนโลยี (Digital and technical skills)" 
                        count="6 ข้อ" 
                        textColor="text-[#006D75]" 
                        badgeBg="bg-[#E6FFFB]" 
                        badgeText="text-[#006D75]"
                    />
                    <ListItem 
                        label="3. ทักษะด้านการจัดการธุรกิจ (Core marketing skills)" 
                        count="7 ข้อ" 
                        textColor="text-[#006D75]" 
                        badgeBg="bg-[#E6FFFB]" 
                        badgeText="text-[#006D75]"
                    />
                    <ListItem 
                        label="4. ทักษะด้านการวิเคราะห์/สังเคราะห์ (Analytical skills)" 
                        count="6 ข้อ" 
                        textColor="text-[#006D75]" 
                        badgeBg="bg-[#E6FFFB]" 
                        badgeText="text-[#006D75]"
                    />
                    <ListItem 
                        label="5. ทักษะด้านลูกค้า (Customer insights skills)" 
                        count="4 ข้อ" 
                        textColor="text-[#006D75]" 
                        badgeBg="bg-[#E6FFFB]" 
                        badgeText="text-[#006D75]"
                    />
                </div>
            </div>

        </div>

      </div>

      {/* 3. Footer Actions */}
      <div className="bg-[#F8F9FA] px-6 py-6 md:px-10 border-t border-gray-200 mt-auto">
         <div className="text-center text-gray-400 text-xs mb-6">
             ระบบจะเก็บข้อมูลของท่านไว้เป็นความลับตามนโยบายของสถาบัน
         </div>
         
         <div className="flex flex-col-reverse md:flex-row gap-4 justify-between items-center max-w-4xl mx-auto">
             
             {/* ปุ่มย้อนกลับ */}
             <button 
                onClick={() => router.back()}
                className="w-full md:w-48 py-3 rounded-xl border border-gray-300 text-gray-500 font-bold bg-white hover:bg-gray-50 transition-colors"
             >
                 ย้อนกลับ
             </button>

             {/* ปุ่มเริ่มทำแบบสอบถาม */}
             <Link href="/graduate/questionnaire" className="w-full md:w-64 block">
                <button 
                    className="w-full py-3 rounded-xl bg-[#2F54EB] text-white font-bold hover:bg-[#1D39C4] transition-colors shadow-lg shadow-blue-200/50"
                >
                    เริ่มทำแบบสอบถาม
                </button>
             </Link>
         </div>
      </div>

    </div>
  );
}

// Helper Component ปรับปรุงให้รับค่าสีพื้นหลังของ Badge ได้
function ListItem({ 
    label, 
    count, 
    textColor, 
    badgeBg, 
    badgeText 
}: { 
    label: string, 
    count: string, 
    textColor: string,
    badgeBg: string,
    badgeText: string 
}) {
    return (
        <div className="flex justify-between items-start py-3 px-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 rounded-lg transition-colors group">
            <span className={`font-medium ${textColor} text-xs md:text-sm pr-2 leading-tight group-hover:opacity-80 transition-opacity`}>
                {label}
            </span>
            <span className={`${badgeBg} ${badgeText} text-[10px] md:text-xs px-2.5 py-1 rounded-full whitespace-nowrap font-bold`}>
                {count}
            </span>
        </div>
    )
}