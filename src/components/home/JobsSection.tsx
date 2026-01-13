// src/components/home/JobsSection.tsx
'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const mockReports = [
  {
    id: '1',
    title: 'ข้อปฏิบัติการรายงานตัว',
    description: 'ข้อปฏิบัติการรายงานตัวเพื่อเข้ารับพระราชทานปริญญาบัตร ผ่าน Web ของนักศึกษาที่สำเร็จการศึกษา ปีการศึกษา 2567',
    link: '/report/detail',
  },
  {
    id: '2',
    title: 'รายงานภาวะการทำงาน',
    description: 'รายงานภาวะการทำงานของบัณฑิต สำหรับตรวจสอบข้อมูลสถิติและผลการสำรวจ',
    link: '/report/detail',
  },
];

export default function JobsSection() {
  return (
    <section className="font-['Prompt']" id="reports">
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container ตาม Design */}
        <div className="mb-8 md:mb-12 scroll-mt-24">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 gap-2">
            <h3 className="text-[#052A55] text-xl md:text-2xl font-semibold">
              รายงาน
            </h3>
            
            <Link 
              // ใช้ query string แทน state เพื่อให้รองรับ Next.js SSR ได้ดีกว่า
              href="/news?category=รายงาน"
              className="text-gray-400 text-xs md:text-sm hover:text-[#18305D] transition-colors bg-white px-4 py-1 rounded-full border border-gray-200 shadow-sm hover:shadow-md self-end md:self-auto"
            >
              ทั้งหมด
            </Link>
          </div>

          {/* Divider */}
          <div className="h-1 w-full bg-[#2C526F] mb-6 md:mb-8 rounded-full"></div>
          
          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockReports.map((report) => (
              <div 
                key={report.id} 
                className="bg-white rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100 flex flex-col h-full group"
              >
                <h4 className="text-[#1D3557] text-lg md:text-xl font-semibold mb-3 group-hover:text-[#18305D] transition-colors">
                  {report.title}
                </h4>
                
                <p className="text-gray-500 text-xs md:text-sm font-light leading-relaxed mb-6 grow">
                  {report.description}
                </p>
                
                <Link 
                  href={report.link} 
                  className="flex items-center gap-1 text-[#1D3557] text-sm font-medium hover:gap-2 transition-all mt-auto"
                >
                  อ่านเพิ่มเติม <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}