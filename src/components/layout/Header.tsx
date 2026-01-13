// src/components/layout/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation'; // เพิ่ม usePathname เพื่อเช็คหน้าปัจจุบัน
import psuLogo from '../../assets/psu1.png'; 

const navItems = [
  { label: 'หน้าแรก', href: '/' },
  // { label: 'คำชี้แจง', href: '#' },
  { label: 'ข่าวประชาสัมพันธ์', href: '/#news' },
  { label: 'รายงาน', href: '/#reports' },
  { label: 'ติดต่อเรา', href: '/contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<'TH' | 'EN'>('TH');
  const pathname = usePathname(); // ดึง path ปัจจุบันมาเช็ค

  // --- ฟังก์ชันจัดการการเลื่อนแบบ Smooth ---
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    // 1. เช็คว่าเป็น Link แบบ Anchor (มี #) หรือไม่
    if (href.includes('#')) {
      const targetId = href.replace(/.*\#/, ""); // ดึงเฉพาะชื่อ id หลัง #
      const elem = document.getElementById(targetId);

      // 2. ถ้าเจอ Element ในหน้านี้ ให้เลื่อนไปหา
      if (elem) {
        e.preventDefault(); // ห้ามเปลี่ยนหน้า (ถ้าอยู่หน้าเดิม)
        
        // ความสูงของ Header (ประมาณ 100px หรือ h-25) เพื่อไม่ให้ Header บังเนื้อหา
        const headerOffset = 100; 
        const elementPosition = elem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth" // สั่งให้เลื่อนแบบนุ่มนวล
        });

        setIsMenuOpen(false); // ปิดเมนูมือถือ (ถ้าเปิดอยู่)
      } else {
        // 3. ถ้าไม่เจอ Element (เช่น อยู่หน้า /contact แล้วจะกดไป /#news)
        // ปล่อยให้ Next.js เปลี่ยนหน้าตามปกติ
        setIsMenuOpen(false);
      }
    } else {
      // Link ธรรมดา
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 w-full bg-white z-50 font-['Prompt']">
      <div className="max-w-360 mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-25">
          
          {/* --- ส่วน Logo --- */}
          <div className="flex items-center gap-5">
            <Link href="/" className="flex items-center">
              <Image 
                src={psuLogo} 
                alt="PSU Logo" 
                className="h-13 w-auto object-contain"
                width={70}
                height={70}
              />
            </Link>
            <div className="hidden xl:flex flex-col justify-center">
              <h1 className="text-[#001C54] text-lg font-bold tracking-tight leading-tight">
                ภาวะการมีงานทำของบัณฑิต
              </h1>
            </div>
          </div>

          {/* --- ส่วนเมนู (Desktop) --- */}
          <div className="hidden lg:flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                // เพิ่ม onClick เพื่อเรียกใช้ Smooth Scroll
                onClick={(e) => handleScroll(e, item.href)}
                className="bg-white text-gray-600 px-6 py-2.5 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.12)] hover:text-[#2666B0] hover:-translate-y-0.5 transition-all duration-300 text-sm font-medium whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* --- ส่วนปุ่มขวา (Desktop) --- */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="text-sm font-semibold flex items-center gap-4 text-gray-400">
              <button 
                onClick={() => setActiveLang('TH')}
                className={`transition-colors duration-200 ${activeLang === 'TH' ? 'text-[#2666B0]' : 'hover:text-gray-600'}`}
              >
                TH
              </button>
              <div className="h-4 w-px bg-gray-200"></div>
              <button 
                onClick={() => setActiveLang('EN')}
                className={`transition-colors duration-200 ${activeLang === 'EN' ? 'text-[#2666B0]' : 'hover:text-gray-600'}`}
              >
                EN
              </button>
            </div>

            <Link 
              href="/login" 
              className="bg-linear-to-r from-[#2666B0] to-[#08155F] text-white px-9 py-3 rounded-full shadow-lg shadow-[#08155F]/20 hover:shadow-xl hover:shadow-[#08155F]/30 transform hover:-translate-y-0.5 transition-all duration-300 font-medium text-sm whitespace-nowrap"
            >
              เข้าสู่ระบบ
            </Link>
          </div>

          {/* --- ปุ่มเมนูมือถือ --- */}
          <div className="lg:hidden flex items-center gap-3">
             <Link 
              href="/login" 
              className="bg-linear-to-r from-[#2666B0] to-[#08155F] text-white px-5 py-2 rounded-full shadow-md text-xs font-medium"
            >
              เข้าสู่ระบบ
            </Link>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-[#2666B0] focus:outline-none p-1"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl py-4 px-4 flex flex-col gap-2 z-50 animate-in slide-in-from-top-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              // เพิ่ม onClick ให้ Mobile Menu ด้วย
              onClick={(e) => handleScroll(e, item.href)}
              className="text-gray-600 hover:text-[#2666B0] hover:bg-blue-50/50 px-4 py-3 rounded-xl font-medium text-sm transition-all"
            >
              {item.label}
            </Link>
          ))}
          <div className="border-t border-gray-100 my-2 pt-2 flex justify-center gap-4 text-sm font-medium">
             <button 
                onClick={() => setActiveLang('TH')}
                className={`${activeLang === 'TH' ? 'text-[#2666B0] font-bold' : 'text-gray-500'}`}
             >
                TH
             </button>
             <span className="text-gray-300">|</span>
             <button 
                onClick={() => setActiveLang('EN')}
                className={`${activeLang === 'EN' ? 'text-[#2666B0] font-bold' : 'text-gray-500'}`}
             >
                EN
             </button>
          </div>
        </div>
      )}
    </header>
  );
}