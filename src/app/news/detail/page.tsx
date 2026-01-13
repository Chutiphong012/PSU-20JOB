'use client';

import Link from 'next/link';
import { ChevronLeft, Calendar, Facebook, MessageCircle, Copy, Share2 } from 'lucide-react';

export default function NewsDetailPage() {
  return (
    <div className="font-['Prompt'] bg-[#F2F4F6] min-h-screen flex flex-col">
      
      <main className="grow container mx-auto px-4 py-8 md:py-12 max-w-250">
        
        {/* Main Card Container */}
        <article className="bg-white rounded-[40px] shadow-sm overflow-hidden pb-8 animate-in fade-in zoom-in-95 duration-300">
            
            {/* 1. Header Image Section (รูปปก) */}
            <div className="bg-linear-to-r from-[#2C62C7] to-[#18305D] h-60 md:h-80 relative flex items-center justify-center p-6 mx-2 mt-2 rounded-t-[36px]">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -ml-10 -mb-10"></div>
                
                {/* การ์ด PSU News เอียงๆ */}
                <div className="w-40 h-24 md:w-56 md:h-36 bg-white/20 backdrop-blur-md rounded-2xl transform -rotate-3 shadow-lg border border-white/20 flex items-center justify-center z-10">
                     <span className="text-white text-lg md:text-2xl font-light tracking-wide">PSU News</span>
                </div>
            </div>

            {/* 2. เนื้อหาข่าว */}
            <div className="px-6 md:px-16 py-10">
                
                {/* วันที่ และ Badge */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="bg-[#E6F0FF] text-[#2541B2] px-3 py-1 rounded-full font-medium text-xs">ประกาศ</span>
                    <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm font-medium">
                        <Calendar size={16} />
                        <span>15 ธันวาคม 2567</span>
                    </div>
                </div>

                {/* หัวข้อใหญ่ */}
                <h1 className="text-[#18305D] text-2xl md:text-3xl font-bold leading-snug mb-8">
                    เปิดระบบแบบสอบถามสำหรับบัณฑิตประจำปี 2567
                </h1>

                {/* กล่องข้อความ Highlight สีฟ้าอ่อน */}
                <div className="bg-[#EBF3FA] border-l-[6px] border-[#18305D] py-5 px-6 rounded-r-xl mb-12 shadow-sm">
                    <p className="text-[#334D7E] text-sm md:text-base font-light leading-relaxed">
                        มหาวิทยาลัยเปิดให้บัณฑิตที่สำเร็จการศึกษาในปี 2567 กรอกแบบสอบถามเกี่ยวกับภาวะการมีงานทำและความพึงพอใจในการศึกษา เพื่อนำข้อมูลไปพัฒนาหลักสูตรและการจัดการเรียนการสอน
                    </p>
                </div>

                {/* เนื้อหา Grid (2 คอลัมน์) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    
                    {/* Item 1: วัตถุประสงค์ */}
                    <div className="flex gap-4 items-start">
                        <div className="w-1.5 bg-[#4A90E2] rounded-full h-10 shrink-0 mt-1"></div>
                        <div>
                            <h3 className="text-[#2C4B85] text-lg font-semibold mb-2">วัตถุประสงค์</h3>
                            <ul className="text-gray-600 text-sm font-light space-y-2 list-disc list-inside marker:text-gray-300">
                                <li>เพื่อวิจัยสถานะและประเมินผลการจัดการศึกษา</li>
                                <li>เพื่อนำข้อมูลที่ได้มาวิเคราะห์สู่การวางแผนพัฒนาหลักสูตร</li>
                                <li>เพื่อวิเคราะห์ความพึงพอใจต่อการเรียนการสอน</li>
                            </ul>
                        </div>
                    </div>

                    {/* Item 2: ระยะเวลา */}
                    <div className="flex gap-4 items-start">
                        <div className="w-1.5 bg-[#4A90E2] rounded-full h-10 shrink-0 mt-1"></div>
                        <div>
                            <h3 className="text-[#2C4B85] text-lg font-semibold mb-2">ระยะเวลาการเปิดระบบ</h3>
                            <p className="text-gray-600 text-sm font-light leading-relaxed">
                                เปิดให้กรอกข้อมูลตั้งแต่วันที่ <span className="font-medium text-[#18305D]">15 ธันวาคม 2567</span> ถึง <span className="font-medium text-[#18305D]">31 มกราคม 2568</span>
                            </p>
                        </div>
                    </div>

                     {/* Item 3: ความสำคัญ */}
                     <div className="flex gap-4 items-start md:col-span-2">
                        <div className="w-1.5 bg-[#4A90E2] rounded-full h-10 shrink-0 mt-1"></div>
                        <div>
                            <h3 className="text-[#2C4B85] text-lg font-semibold mb-2">ความสำคัญของข้อมูล</h3>
                            <p className="text-gray-600 text-sm font-light leading-relaxed">
                                ข้อมูลที่ได้รับจะถูกนำไปวิเคราะห์และรายงานต่อคณะกรรมการบริหาร เพื่อวางแผนพัฒนาหลักสูตร ปรับปรุงการเรียนการสอน และเสริมสร้างทักษะที่จำเป็นให้กับนักศึกษารุ่นต่อไป
                            </p>
                        </div>
                    </div>

                    {/* Item 4: การรักษาความลับ */}
                    <div className="flex gap-4 items-start md:col-span-2">
                        <div className="w-1.5 bg-[#4A90E2] rounded-full h-10 shrink-0 mt-1"></div>
                        <div>
                            <h3 className="text-[#2C4B85] text-lg font-semibold mb-2">การรักษาความลับ</h3>
                            <p className="text-gray-600 text-sm font-light leading-relaxed">
                                ข้อมูลทั้งหมดจะถูกเก็บเป็นความลับและใช้เพื่อการวิเคราะห์ทางสถิติเท่านั้น จะไม่มีการเปิดเผยข้อมูลส่วนบุคคล
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* 3. Footer Action Bar */}
            <div className="mt-8 mx-6 md:mx-12 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                
                {/* ปุ่มย้อนกลับ */}
                <Link href="/news" className="flex items-center gap-2 text-gray-500 hover:text-[#18305D] text-[12px] font-medium border border-gray-200 px-5 py-2.5 rounded-full hover:border-[#18305D] hover:bg-gray-50 transition-all self-start md:self-auto shadow-sm group">
                    <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                    ย้อนกลับ
                </Link>
                
                {/* Social Share */}
                <div className="flex items-center gap-4 self-end md:self-auto bg-gray-50 px-6 py-2 rounded-full">
                    <span className="text-gray-400 text-[11px] font-medium mr-2 flex items-center gap-1">
                        <Share2 size={12} /> แชร์ข่าวนี้:
                    </span>
                    
                    {/* Facebook */}
                    <button className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all">
                        <Facebook size={16} fill="white" />
                    </button>
                    
                    {/* Line (จำลองสีเขียว) */}
                    <button className="w-8 h-8 rounded-full bg-[#06C755] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all">
                        <MessageCircle size={16} fill="white" />
                    </button>

                    {/* Copy Link */}
                    <button className="w-8 h-8 rounded-full bg-[#2AB6C9] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all" title="Copy Link">
                        <Copy size={16} />
                    </button>
                </div>
            </div>

        </article>
      </main>

    </div>
  );
}