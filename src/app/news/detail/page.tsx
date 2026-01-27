'use client';

import Link from 'next/link';
import { ChevronLeft, Calendar, Facebook, MessageCircle, Copy, Share2 } from 'lucide-react';
import { mockNewsData, MultiLangString } from '@/data/newsDetailData'; // 1. นำเข้าข้อมูล
import { useTranslation } from 'react-i18next';

export default function NewsDetailPage() {
  const { t, i18n } = useTranslation('news');
  // ดึงข้อมูลมาใส่ตัวแปรให้เรียกใช้ง่ายๆ
  const news = mockNewsData;

  // Helper to get localized string or fallback
  const getLang = (obj: MultiLangString) => {
    return i18n.language === 'th' ? obj.th : obj.en;
  };

  // Helper for date formatting
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; 
    
    return date.toLocaleDateString(i18n.language === 'th' ? 'th-TH' : 'en-US', {
        day: 'numeric',
        month: 'long', 
        year: 'numeric'
    });
  };

  return (
    <div className="font-['Prompt'] bg-[#F2F4F6] min-h-screen flex flex-col">
      
      <main className="grow container mx-auto px-4 py-8 md:py-12 max-w-250">
        
        <article className="bg-white rounded-[40px] shadow-sm overflow-hidden pb-8 animate-in fade-in zoom-in-95 duration-300">
            
            {/* 1. Header Image (ปรับสีตามประเภทข่าวได้ ถ้าต้องการ) */}
            <div className={`h-60 md:h-80 relative flex items-center justify-center p-6 mx-2 mt-2 rounded-t-[36px] bg-linear-to-r ${news.type === 'announcement' ? 'from-[#2C62C7] to-[#18305D]' : 'from-[#93278F] to-[#D4145A]'}`}>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -ml-10 -mb-10"></div>
                
                <div className="w-40 h-24 md:w-56 md:h-36 bg-white/20 backdrop-blur-md rounded-2xl transform -rotate-3 shadow-lg border border-white/20 flex items-center justify-center z-10">
                     <span className="text-white text-lg md:text-2xl font-light tracking-wide">{t('decorative.psu_news')}</span>
                </div>
            </div>

            {/* 2. เนื้อหาข่าว */}
            <div className="px-6 md:px-16 py-10">
                
                {/* วันที่ และ Badge */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="bg-[#E6F0FF] text-[#2541B2] px-3 py-1 rounded-full font-medium text-xs">
                        {t(`list.categories.${news.type}`)}
                    </span>
                    <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm font-medium">
                        <Calendar size={16} />
                        <span>{formatDate(news.date)}</span>
                    </div>
                </div>

                {/* หัวข้อใหญ่ */}
                <h1 className="text-[#18305D] text-2xl md:text-3xl font-bold leading-snug mb-8">
                    {getLang(news.title)}
                </h1>

                {/* กล่องข้อความ Highlight */}
                <div className="bg-[#EBF3FA] border-l-[6px] border-[#18305D] py-5 px-6 rounded-r-xl mb-12 shadow-sm">
                    <p className="text-[#334D7E] text-sm md:text-base font-light leading-relaxed">
                        {getLang(news.highlightText)}
                    </p>
                </div>

                {/* Dynamic Content Grid (วนลูปสร้างเนื้อหาจาก Data) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    
                    {news.sections.map((section, index) => (
                        <div key={index} className={`flex gap-4 items-start ${section.isFullWidth ? 'md:col-span-2' : ''}`}>
                            <div className="w-1.5 bg-[#4A90E2] rounded-full h-10 shrink-0 mt-1"></div>
                            <div className="w-full">
                                <h3 className="text-[#2C4B85] text-lg font-semibold mb-2">{getLang(section.title)}</h3>
                                
                                {/* เช็คประเภทข้อมูลเพื่อแสดงผลให้ถูกต้อง */}
                                {section.type === 'list' && Array.isArray(section.content) && (
                                    <ul className="text-gray-600 text-sm font-light space-y-2 list-disc list-inside marker:text-gray-300">
                                        {/* Need to cast because TypeScript doesn't know for sure it's MultiLangString[] inside the if check fully effectively sometimes, but simple map should work if types are right */}
                                        {(section.content as MultiLangString[]).map((item, i) => (
                                            <li key={i}>{getLang(item)}</li>
                                        ))}
                                    </ul>
                                )}

                                {section.type === 'text' && !Array.isArray(section.content) && (
                                    <p className="text-gray-600 text-sm font-light leading-relaxed">
                                        {getLang(section.content as MultiLangString)}
                                    </p>
                                )}

                                {section.type === 'html' && !Array.isArray(section.content) && (
                                    <div 
                                        className="text-gray-600 text-sm font-light leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: getLang(section.content as MultiLangString) }}
                                    />
                                )}
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            {/* 3. Footer Action Bar (เหมือนเดิม) */}
            <div className="mt-8 mx-6 md:mx-12 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <Link href="/news" className="flex items-center gap-2 text-gray-500 hover:text-[#18305D] text-[12px] font-medium border border-gray-200 px-5 py-2.5 rounded-full hover:border-[#18305D] hover:bg-gray-50 transition-all self-start md:self-auto shadow-sm group">
                    <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                    {t('detail.back')}
                </Link>
                <div className="flex items-center gap-4 self-end md:self-auto bg-gray-50 px-6 py-2 rounded-full">
                    <span className="text-gray-400 text-[11px] font-medium mr-2 flex items-center gap-1">
                        <Share2 size={12} /> {t('detail.share_label')}:
                    </span>
                    <button className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all"><Facebook size={16} fill="white" /></button>
                    <button className="w-8 h-8 rounded-full bg-[#06C755] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all"><MessageCircle size={16} fill="white" /></button>
                    <button className="w-8 h-8 rounded-full bg-[#2AB6C9] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all"><Copy size={16} /></button>
                </div>
            </div>

        </article>
      </main>
    </div>
  );
}