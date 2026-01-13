// src/components/home/NewsSection.tsx
'use client';

import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

const mockNews = [
  {
    id: '1',
    title: 'โครงการพัฒนาศักยภาพบัณฑิตสู่ตลาดแรงงาน',
    description: 'มหาวิทยาลัยสงขลานครินทร์จัดโครงการพัฒนาศักยภาพบัณฑิตเพื่อเตรียมความพร้อมสู่ตลาดแรงงาน',
    publishedAt: '15 มกราคม 2567', // ปรับ format ให้เข้ากับ design
    category: 'กิจกรรม',
  },
  {
    id: '2',
    title: 'สัมมนาเชิงปฏิบัติการด้านการหางาน',
    description: 'เปิดรับสมัครผู้เข้าร่วมสัมมนาเชิงปฏิบัติการด้านการหางานและพัฒนาอาชีพ',
    publishedAt: '12 มกราคม 2567',
    category: 'อบรม',
  },
  {
    id: '3',
    title: 'ผลสำรวจภาวะการมีงานทำของบัณฑิต',
    description: 'รายงานผลสำรวจภาวะการมีงานทำของบัณฑิต มหาวิทยาลัยสงขลานครินทร์ ประจำปี 2566',
    publishedAt: '08 มกราคม 2567',
    category: 'รายงาน',
  },
];

export default function NewsSection() {
  return (
    <section id="news" className="py-10 md:py-16 font-['Prompt']">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-10 md:mb-16">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 gap-2">
            <h3 className="text-[#052A55] text-xl md:text-2xl font-semibold">
              ข่าวประชาสัมพันธ์
            </h3>
            
            <Link 
              href="/news?category=ประกาศ" 
              className="text-gray-400 text-xs md:text-sm hover:text-[#18305D] transition-colors bg-white px-4 py-1 rounded-full border border-gray-200 shadow-sm hover:shadow-md self-end md:self-auto"
            >
              ทั้งหมด
            </Link>
          </div>

          {/* Divider */}
          <div className="h-1 w-full bg-[#2C526F] mb-6 md:mb-8 rounded-full"></div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockNews.map((news) => (
              <div 
                key={news.id} 
                className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100 flex flex-col h-full group"
              >
                {/* Date */}
                <div className="flex items-center gap-2 text-gray-400 text-[10px] md:text-xs mb-3 font-medium">
                  <Calendar size={14} />
                  <span>{news.publishedAt}</span>
                </div>

                {/* Title */}
                <h4 className="text-[#1D3557] text-base md:text-lg font-semibold mb-3 leading-snug group-hover:text-[#18305D] transition-colors">
                  {news.title}
                </h4>

                {/* Description */}
                <p className="text-gray-500 text-xs font-light leading-relaxed mb-6 grow line-clamp-3">
                  {news.description}
                </p>

                {/* Read More Link */}
                <Link 
                  href="/news/detail" 
                  className="flex items-center gap-2 text-[#18305D] text-sm font-medium hover:gap-3 transition-all mt-auto"
                >
                  อ่านเพิ่มเติม <ArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}