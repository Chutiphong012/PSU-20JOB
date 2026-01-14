// src/components/home/BannerSection.tsx
'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // อย่าลืมลง lucide-react หรือใช้ icon อื่น
import { bannerData } from '@/data/bannerData'; // Import ข้อมูลที่แยกไว้

export default function BannerSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // ฟังก์ชันเลื่อนรูปไปก่อนหน้า
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? bannerData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // ฟังก์ชันเลื่อนรูปไปถัดไป
  const nextSlide = () => {
    const isLastSlide = currentIndex === bannerData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // ตั้งเวลาเปลี่ยนรูปอัตโนมัติทุก 5 วินาที
  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 5000); // 5000ms = 5 วินาที

    // ล้างเวลาเมื่อ component ถูก unmount หรือ index เปลี่ยน (เพื่อไม่ให้เวลารวนเมื่อกดปุ่มเอง)
    return () => clearInterval(slideInterval);
  }, [currentIndex]);

  return (
    <div className="w-full relative group">
      {/* Container กำหนดความสูงตามดีไซน์เดิม */}
      <div className="w-full h-62.5 md:h-112.5 lg:h-137.5 relative overflow-hidden bg-gray-200">
        
        {/* Render รูปภาพทั้งหมดแต่ซ่อนตัวที่ไม่ได้เลือก */}
        {bannerData.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={banner.image}
              alt={banner.alt}
              className="w-full h-full object-cover"
            />
            {/* (Optional) ถ้าอยากใส่ Overlay เงาดำๆ ให้ตัวหนังสืออ่านง่าย */}
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        ))}
      </div>

      {/* --- ปุ่มลูกศรซ้าย/ขวา (จะโชว์เมื่อเอาเมาส์ไปชี้ที่ Banner) --- */}
      {/* ปุ่มซ้าย */}
      <button
        onClick={prevSlide}
        className="hidden group-hover:block absolute top-1/2 left-4 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 p-2 rounded-full cursor-pointer z-20 transition-all"
      >
        <ChevronLeft size={30} />
      </button>

      {/* ปุ่มขวา */}
      <button
        onClick={nextSlide}
        className="hidden group-hover:block absolute top-1/2 right-4 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 p-2 rounded-full cursor-pointer z-20 transition-all"
      >
        <ChevronRight size={30} />
      </button>

      {/* --- จุดไข่ปลาด้านล่าง (Indicators) --- */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {bannerData.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              index === currentIndex ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/80'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}