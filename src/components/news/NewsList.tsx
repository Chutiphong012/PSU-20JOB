'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; 
import { Search, Filter, Calendar, ArrowRight } from 'lucide-react';

export default function NewsList() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");

  useEffect(() => {
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl);
    } else {
      setActiveCategory("ทั้งหมด");
    }
  }, [categoryFromUrl]);

  // Mock Data
  const newsItems = [
    {
      id: 1,
      date: "10 พฤศจิกายน 2567",
      title: "บริการให้คำปรึกษาการพัฒนาทักษะและการหางาน",
      desc: "สำนักงานพัฒนาและศึกษานักศึกษาเปิดให้บริการปรึกษาด้านการพัฒนาทักษะอาชีพ...",
      category: "ประกาศ",
      themeColor: "bg-[#2541B2]" 
    },
    {
      id: 2,
      date: "12 พฤศจิกายน 2567",
      title: "กำหนดการซ้อมรับปริญญาบัตร ประจำปี 2567",
      desc: "มหาวิทยาลัยขอแจ้งกำหนดการฝึกซ้อมย่อยและซ้อมใหญ่...",
      category: "ประกาศ",
      themeColor: "bg-[#28A8D8]" 
    },
    {
      id: 4,
      date: "20 พฤศจิกายน 2567",
      title: "สรุปผลการสำรวจภาวะการมีงานทำ ปี 2566",
      desc: "รายงานสรุปผลสถิติการมีงานทำของบัณฑิตรุ่นปีการศึกษา 2566...",
      category: "รายงาน",
      themeColor: "bg-[#B822C8]" 
    },
    {
      id: 5,
      date: "25 พฤศจิกายน 2567",
      title: "สถิติเงินเดือนเฉลี่ยบัณฑิตจบใหม่",
      desc: "เปิดเผยข้อมูลฐานเงินเดือนเฉลี่ยของบัณฑิตจบใหม่แต่ละคณะ เพื่อเป็นข้อมูลประกอบการตัดสินใจ",
      category: "รายงาน",
      themeColor: "bg-[#D4145A]" 
    },
  ];

  const filteredNews = activeCategory === "ทั้งหมด" 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);

  return (
    <div>
        <p className="text-gray-500 font-light text-sm mb-6 -mt-6">{filteredNews.length} รายการ</p>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
            <div className="relative w-full md:max-w-2xl">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search size={20} strokeWidth={1.5} />
                </div>
                <input type="text" placeholder="ค้นหาข่าว..." className="w-full pl-12 pr-6 py-3 rounded-full border border-gray-400 text-sm text-gray-600 bg-white focus:outline-none focus:border-[#18305D]" />
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                <div className="flex items-center gap-3">
                    {["ทั้งหมด", "ประกาศ", "รายงาน"].map((cat) => (
                        <button 
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all shadow-sm ${
                                activeCategory === cat 
                                ? "bg-[#1D3557] text-white shadow-md" 
                                : "bg-white text-[#052A55] border border-gray-200 hover:shadow-md"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Grid แสดงรายการ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
            {filteredNews.map((item) => (
              <div key={item.id} className="bg-white rounded-4xl overflow-hidden shadow-lg flex flex-col group cursor-pointer hover:-translate-y-1 transition-transform duration-300 border border-gray-100">
                {/* ส่วนหัวสีๆ */}
                <div className={`${item.themeColor} h-48 relative flex items-center justify-center`}>
                    <div className="absolute top-4 right-4 bg-[#18305D] text-white text-[10px] px-3 py-1 rounded-full font-light z-10">
                        {item.category}
                    </div>
                    <div className="w-40 h-24 bg-white/20 backdrop-blur-sm rounded-xl transform -rotate-3 shadow-sm border border-white/30 flex items-center justify-center">
                        <span className="text-white text-sm font-light tracking-wide">PSU News</span>
                    </div>
                </div>

                {/* เนื้อหาการ์ด */}
                <div className="p-8 flex flex-col grow">
                    <div className="flex items-center gap-2 text-[#18305D] text-sm mb-3 font-medium">
                        <Calendar size={18} />
                        <span>{item.date}</span>
                    </div>
                    <h4 className="text-[#18305D] text-lg font-semibold mb-3 leading-snug">{item.title}</h4>
                    <p className="text-gray-500 text-xs font-light leading-relaxed mb-6 grow line-clamp-3">{item.desc}</p>
                    
                    {/* ✅ แก้ไขตรงนี้: เช็ค category เพื่อเปลี่ยนเส้นทาง */}
                    <Link 
                        href={item.category === 'รายงาน' ? '/report/detail' : '/news/detail'} 
                        className="flex items-center gap-2 text-[#18305D] text-sm font-medium group-hover:gap-3 transition-all mt-auto"
                    >
                        อ่านเพิ่มเติม <ArrowRight size={18} />
                    </Link>
                </div>
              </div>
            ))}
        </div>
    </div>
  );
}