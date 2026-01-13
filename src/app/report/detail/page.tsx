'use client';

import Link from 'next/link';
import { ChevronLeft, Calendar, Facebook, MessageCircle, Copy, Share2 } from 'lucide-react';

export default function ReportDetailPage() {
  return (
    <div className="font-['Prompt'] bg-[#F2F4F6] min-h-screen flex flex-col">
      {/* Header/Footer อยู่ใน layout.tsx แล้ว */}

      <main className="grow container mx-auto px-4 py-8 md:py-12 max-w-250">
        
        {/* Main Card Container */}
        <article className="bg-white rounded-[40px] shadow-sm overflow-hidden pb-8 animate-in fade-in zoom-in-95 duration-300">
            
            {/* 1. Header Image (ธีมสีม่วง) */}
            <div className="bg-linear-to-r from-[#93278F] to-[#D4145A] h-60 md:h-80 relative flex items-center justify-center p-6 mx-2 mt-2 rounded-t-[36px]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -ml-10 -mb-10"></div>

                {/* การ์ด PSU News เอียงๆ */}
                <div className="w-40 h-24 md:w-56 md:h-36 bg-white/20 backdrop-blur-md rounded-2xl transform -rotate-3 shadow-lg border border-white/20 flex items-center justify-center z-10">
                     <span className="text-white text-lg md:text-2xl font-light tracking-wide">PSU News</span>
                </div>
            </div>

            {/* 2. เนื้อหาข่าว */}
            <div className="px-6 md:px-16 py-10">
                
                {/* วันที่ */}
                <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm mb-4 font-medium">
                    <Calendar size={16} />
                    <span>15 ธันวาคม 2567</span>
                </div>

                {/* หัวข้อใหญ่ */}
                <h1 className="text-[#18305D] text-2xl md:text-3xl font-bold leading-snug mb-8">
                    ข้อปฏิบัติการรายงานตัวเพื่อเข้ารับพระราชทานปริญญาบัตร ผ่าน Web ของนักศึกษาที่สำเร็จการศึกษา ปีการศึกษา 2567
                </h1>

                {/* กล่องข้อความ Intro */}
                <div className="bg-[#EBF3FA] border-l-[6px] border-[#2C62C7] py-6 px-6 rounded-r-xl mb-8 shadow-sm">
                    <p className="text-[#556B8B] text-sm md:text-base font-light leading-relaxed">
                        ก่อนที่บัณฑิตจะยืนยันเพื่อรายงานตัวเข้ารับพระราชทานปริญญาบัตร ทางมหาวิทยาลัยขอความร่วมมือบัณฑิตทุกท่าน กรอกแบบสอบถามภาวะการมีงานทำของบัณฑิต ให้สมบูรณ์ถูกต้องตามความเป็นจริง
                    </p>
                </div>

                {/* เนื้อหาหลัก */}
                <div className="space-y-6 text-[#333] font-light text-sm md:text-base leading-relaxed">
                    <p>
                        เพื่อประโยชน์สำหรับท่าน และมหาวิทยาลัย โดยขอความร่วมมือจากบัณฑิตทุกท่าน กรอกแบบสอบถามภาวะการมีงานทำของบัณฑิตผ่าน Website ของมหาวิทยาลัยสงขลานครินทร์ ที่ <span className="text-[#00AA00] font-medium">http://www.job.psu.ac.th</span> โดยมีข้อมูลพอสังเขป ดังต่อไปนี้
                    </p>

                    <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <p className="font-medium text-[#18305D]">
                            1. ให้บัณฑิตเข้าไปที่เว็บไซต์ http://www.job.psu.ac.th แล้วเข้าสู่ระบบโดยระบุ
                        </p>
                        <ul className="list-disc list-inside pl-4 space-y-2 text-gray-600">
                            <li>รหัสผู้ใช้ (Login) ด้วยรหัสนักศึกษา 10 หลัก</li>
                            <li>
                                รหัสผ่าน (Password) ด้วย วัน-เดือน-ปีเกิด รูปแบบ ddmmyyyy (เช่น เกิดวันที่ 1 มกราคม 2539 ให้กรอกเป็น 01012539 กรอกเฉพาะตัวเลขเท่านั้นห้ามเว้นวรรคหรือมีช่องว่าง)
                            </li>
                        </ul>
                        <p className="text-gray-600 pl-4 border-l-4 border-red-200 ml-2">
                            แล้วเลือกเมนู เข้าสู่ระบบ เพื่อทำการกรอกข้อมูลให้ครบถ้วนสมบูรณ์ <span className="text-red-500 font-medium">ก่อนวันรายงานตัวตามที่มหาวิทยาลัยกำหนด</span>
                        </p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <p className="font-medium text-[#18305D]">
                            2. ให้พิมพ์เอกสารการรายงานตัวเพื่อเข้ารับพระราชทานปริญญาบัตร (ใบ QR Code)
                        </p>
                        <p className="text-gray-600 mt-2">
                            แล้วนำเอกสารใบนั้นมายื่นในวันซ้อมย่อยและวันซ้อมใหญ่ ซึ่งเป็นเอกสารประกอบการรับใบปริญญาบัตร (ในกรณีที่ไม่ได้มากรอกรายงานตัว จะไม่สามารถรับใบปริญญาบัตรได้)
                        </p>
                    </div>
                </div>

                {/* กล่องข้อความเตือน (สีแดงอ่อน) */}
                <div className="bg-[#FFEAEA] border border-red-100 rounded-xl p-6 mt-10 mb-8 text-center md:text-left">
                    <p className="text-[#D32F2F] font-medium text-sm md:text-base leading-relaxed">
                        ดังนั้น เพื่อให้การปฏิบัติเป็นไปตามระเบียบ สะดวกและไม่ล่าช้าในการรายงานตัว ขอให้บัณฑิตที่สำเร็จการศึกษา ประจำปี 2567 ทุกท่านกรอกแบบสอบถามล่วงหน้า ก่อนวันรายงานตัวเข้ารับพระราชทานปริญญาบัตร
                    </p>
                </div>

                {/* คำลงท้าย */}
                <div className="text-right mt-8 text-gray-500 text-sm font-light space-y-1">
                    <p className="font-medium text-gray-700">ด้วยความขอบพระคุณเป็นอย่างยิ่ง</p>
                    <p>มหาวิทยาลัยสงขลานครินทร์</p>
                </div>

            </div>

            {/* 3. Footer Action Bar */}
            <div className="mt-4 mx-6 md:mx-12 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                
                {/* ปุ่มย้อนกลับ (ลิ้งก์กลับไปที่หน้ารวมข่าว หมวดรายงาน) */}
                <Link 
                    href="/news?category=รายงาน" 
                    className="flex items-center gap-2 text-gray-500 hover:text-[#93278F] text-[12px] font-medium border border-gray-200 px-5 py-2.5 rounded-full hover:border-[#93278F] hover:bg-purple-50 transition-all self-start md:self-auto shadow-sm"
                >
                    <ChevronLeft size={16} />
                    ย้อนกลับ
                </Link>
                
                {/* Social Share */}
                <div className="flex items-center gap-3 self-end md:self-auto bg-gray-50 px-5 py-2 rounded-full">
                    <span className="text-gray-400 text-[11px] font-light mr-1 flex items-center gap-1">
                        <Share2 size={12} /> แชร์ข่าวนี้:
                    </span>
                    
                    <button className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md">
                        <Facebook size={16} fill="white" />
                    </button>
                    
                    <button className="w-8 h-8 rounded-full bg-[#06C755] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md">
                        <MessageCircle size={16} fill="white" />
                    </button>

                    <button className="w-8 h-8 rounded-full bg-[#2AB6C9] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md">
                        <Copy size={16} />
                    </button>
                </div>
            </div>

        </article>
      </main>
    </div>
  );
}