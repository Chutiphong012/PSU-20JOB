'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; 
import { Search, Filter, Calendar, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function NewsList() {
  const { t, i18n } = useTranslation('news');
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category'); 
  
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl);
    } else {
      setActiveCategory("all");
    }
  }, [categoryFromUrl]);

  // Helper to get localized string or fallback
  const getLang = (obj: { th: string, en: string }) => {
    return i18n.language === 'th' ? obj.th : obj.en;
  };

  // Helper for date formatting
  const formatDate = (dateString: string) => {
    // Assuming dateString is "YYYY-MM-DD" or similar ISO
    // But existing data is "10 พฤศจิกายน 2567" which is problematic for Date parser
    // So let's convert mock data to ISO format first
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Fallback to original string if invalid
    
    return date.toLocaleDateString(i18n.language === 'th' ? 'th-TH' : 'en-US', {
        day: 'numeric',
        month: 'long', 
        year: 'numeric'
    });
  };

  // Mock Data (Refactored to ISO Dates and Multilingual Text)
  const newsItems = [
    {
      id: 1,
      date: "2024-11-10", 
      title: {
        th: "บริการให้คำปรึกษาการพัฒนาทักษะและการหางาน",
        en: "Skills Development and Job Counseling Service"
      },
      desc: {
        th: "สำนักงานพัฒนาและศึกษานักศึกษาเปิดให้บริการปรึกษาด้านการพัฒนาทักษะอาชีพ...",
        en: "The Student Development Office now offers counseling services for career skill development..."
      },
      category: "announcement",
      themeColor: "bg-[#2541B2]" 
    },
    {
      id: 2,
      date: "2024-11-12",
      title: {
        th: "กำหนดการซ้อมรับปริญญาบัตร ประจำปี 2567",
        en: "Rehearsal Schedule for 2024 Graduation Ceremony"
      },
      desc: {
        th: "มหาวิทยาลัยขอแจ้งกำหนดการฝึกซ้อมย่อยและซ้อมใหญ่...",
        en: "The university announces the schedule for sub-rehearsals and the grand rehearsal..."
      },
      category: "announcement",
      themeColor: "bg-[#28A8D8]" 
    },
    {
      id: 4,
      date: "2024-11-20",
      title: {
        th: "สรุปผลการสำรวจภาวะการมีงานทำ ปี 2566",
        en: "Summary of Employment Survey 2023"
      },
      desc: {
        th: "รายงานสรุปผลสถิติการมีงานทำของบัณฑิตรุ่นปีการศึกษา 2566...",
        en: "Summary report on employment statistics of graduates from the academic year 2023..."
      },
      category: "report",
      themeColor: "bg-[#B822C8]" 
    },
    {
      id: 5,
      date: "2024-11-25",
      title: {
        th: "สถิติเงินเดือนเฉลี่ยบัณฑิตจบใหม่",
        en: "Average Salary Statistics for New Graduates"
      },
      desc: {
        th: "เปิดเผยข้อมูลฐานเงินเดือนเฉลี่ยของบัณฑิตจบใหม่แต่ละคณะ เพื่อเป็นข้อมูลประกอบการตัดสินใจ",
        en: "Disclosure of average starting salary data for new graduates by faculty to assist in decision-making"
      },
      category: "report",
      themeColor: "bg-[#D4145A]" 
    },
  ];

  const filteredNews = activeCategory === "all" 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);

  const categories = ["all", "announcement", "report"];

  return (
    <div>
        <p className="text-gray-500 font-light text-sm mb-6 -mt-6">{t('list.total_items', { count: filteredNews.length })}</p>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
            <div className="relative w-full md:max-w-2xl">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                    <Search size={20} strokeWidth={1.5} />
                </div>
                <input type="text" placeholder={t('list.search_placeholder')} className="w-full pl-12 pr-6 py-3 rounded-full border border-gray-400 text-sm text-gray-600 bg-white focus:outline-none focus:border-[#18305D]" />
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                <div className="flex items-center gap-3">
                    {categories.map((cat) => (
                        <button 
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all shadow-sm ${
                                activeCategory === cat 
                                ? "bg-[#1D3557] text-white shadow-md" 
                                : "bg-white text-[#052A55] border border-gray-200 hover:shadow-md"
                            }`}
                        >
                            {t(`list.categories.${cat}`)}
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
                        {t(`list.categories.${item.category}`)}
                    </div>
                    <div className="w-40 h-24 bg-white/20 backdrop-blur-sm rounded-xl transform -rotate-3 shadow-sm border border-white/30 flex items-center justify-center">
                        <span className="text-white text-sm font-light tracking-wide">{t('decorative.psu_news')}</span>
                    </div>
                </div>

                {/* เนื้อหาการ์ด */}
                <div className="p-8 flex flex-col grow">
                    <div className="flex items-center gap-2 text-[#18305D] text-sm mb-3 font-medium">
                        <Calendar size={18} />
                        <span>{formatDate(item.date)}</span>
                    </div>
                    <h4 className="text-[#18305D] text-lg font-semibold mb-3 leading-snug">{getLang(item.title)}</h4>
                    <p className="text-gray-500 text-xs font-light leading-relaxed mb-6 grow line-clamp-3">{getLang(item.desc)}</p>
                    
                    <Link 
                        href={item.category === 'report' ? '/report/detail' : '/news/detail'} 
                        className="flex items-center gap-2 text-[#18305D] text-sm font-medium group-hover:gap-3 transition-all mt-auto"
                    >
                        {t('list.read_more')} <ArrowRight size={18} />
                    </Link>
                </div>
              </div>
            ))}
        </div>
    </div>
  );
}