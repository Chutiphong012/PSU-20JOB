// src/components/layout/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, GraduationCap } from 'lucide-react';
import { usePathname } from 'next/navigation';
import psuLogo from '../../assets/psu3.png'; 

const navItems = [
  { label: 'หน้าแรก', href: '/' },
  { label: 'ข่าวประชาสัมพันธ์', href: '/#news' },
  { label: 'รายงาน', href: '/#reports' },
  { label: 'ติดต่อเรา', href: '/contact' },
  { label: 'Dashboard', href: '/dashboard' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<'TH' | 'EN'>('TH');
  
  const pathname = usePathname();
  const [activeNav, setActiveNav] = useState('/');

  useEffect(() => {
    if (pathname) {
      setActiveNav(pathname);
    }
  }, [pathname]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    setActiveNav(href);
    if (href.includes('#')) {
      const targetId = href.replace(/.*\#/, "");
      const elem = document.getElementById(targetId);

      if (elem) {
        e.preventDefault();
        // ปรับ Offset ตามขนาดหน้าจอ (มือถือ header เตี้ยกว่า PC)
        const headerOffset = window.innerWidth < 1024 ? 64 : 100; 
        const elementPosition = elem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        setIsMenuOpen(false);
      } else {
        setIsMenuOpen(false);
      }
    } else {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 w-full bg-white z-50 font-['Prompt'] border-b border-gray-100 shadow-sm transition-all duration-300">
      {/* Responsive Padding:
        - px-4 (Mobile)
        - sm:px-6 (Tablet)
        - lg:px-8 (PC)
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Responsive Height:
          - h-16 (64px) สำหรับ Mobile
          - md:h-20 (80px) สำหรับ Tablet
          - lg:h-24 (96px) สำหรับ PC
        */}
        <div className="flex justify-between items-center h-16 md:h-20 lg:h-24 transition-all duration-300"> 
          
          {/* --- ส่วน Logo --- */}
          <div className="flex items-center gap-4 shrink-0"> {/* shrink-0 ป้องกันโลโก้บีบ */}
            <Link href="/" className="flex items-center" onClick={() => setActiveNav('/')}>
              <Image 
                src={psuLogo} 
                alt="PSU Logo" 
                // Responsive Logo Size:
                
                className="h-10 md:h-14 lg:h-22.5 w-auto object-contain transition-all duration-300"
                width={240} 
                height={90}
                priority 
              />
            </Link>
          </div>

          {/* --- ส่วนเมนู (Desktop Only: >= 1024px) --- */}
          {/* ซ่อนใน Mobile/Tablet (hidden) แสดงใน PC (lg:flex) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => {
              const isActive = activeNav === item.href || (item.href !== '/' && activeNav.startsWith(item.href) && !item.href.includes('#'));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className={`
                    font-medium text-base transition-all duration-200 py-1 border-b-2 whitespace-nowrap
                    ${isActive 
                      ? 'text-[#2323E6] border-[#2323E6]' 
                      : 'text-[#292A34] border-transparent hover:text-[#0038B2] hover:border-[#0038B2]'
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* --- ส่วนปุ่มขวา (Desktop Only: >= 1024px) --- */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            
            {/* Language Toggle */}
            <div className="flex bg-gray-100 rounded-md p-1">
              <button 
                onClick={() => setActiveLang('TH')}
                className={`px-3 py-1 rounded text-xs font-bold transition-all duration-200 ${
                  activeLang === 'TH' ? 'bg-[#2323E6] text-white shadow-sm' : 'text-[#2323E6] hover:bg-gray-200'
                }`}
              >
                TH
              </button>
              <button 
                onClick={() => setActiveLang('EN')}
                className={`px-3 py-1 rounded text-xs font-bold transition-all duration-200 ${
                  activeLang === 'EN' ? 'bg-[#2323E6] text-white shadow-sm' : 'text-[#2323E6] hover:bg-gray-200'
                }`}
              >
                EN
              </button>
            </div>

            {/* ปุ่ม Sign In */}
            <Link 
              href="/login" 
              className="flex items-center gap-2 border border-[#2323E6] text-[#2323E6] px-5 py-2 rounded-lg hover:bg-[#2323E6] hover:text-white transition-all duration-300 font-medium text-sm whitespace-nowrap"
            >
              <GraduationCap size={18} />
              Sign In
            </Link>
          </div>

          {/* --- ปุ่มเมนูมือถือ & Tablet (< 1024px) --- */}
          <div className="lg:hidden flex items-center gap-2 sm:gap-3">
             {/* ปุ่ม Sign In ฉบับย่อสำหรับ Mobile */}
             <Link 
              href="/login" 
              className="border border-[#2323E6] text-[#2323E6] px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-[10px] sm:text-xs font-medium flex items-center gap-1 hover:bg-blue-50 transition-colors"
            >
              <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4" />
              Sign In
            </Link>

            {/* Hamburger Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-[#2323E6] focus:outline-none p-1 rounded-md active:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} className="sm:w-7 sm:h-7" /> : <Menu size={24} className="sm:w-7 sm:h-7" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile/Tablet Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl flex flex-col z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="p-4 flex flex-col gap-2">
            {navItems.map((item) => {
               const isActive = activeNav === item.href;
               return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className={`
                    px-4 py-3 rounded-lg font-medium text-sm transition-all
                    ${isActive 
                      ? 'text-[#2323E6] bg-blue-50 font-bold' 
                      : 'text-gray-600 hover:text-[#2323E6] hover:bg-gray-50'
                    }
                  `}
                >
                  {item.label}
                </Link>
               );
            })}
          </div>
          
          <div className="border-t border-gray-100 p-4 bg-gray-50 flex justify-center">
             <div className="flex bg-white rounded-md p-1 w-fit shadow-sm border border-gray-100">
              <button 
                onClick={() => setActiveLang('TH')}
                className={`px-6 py-2 rounded text-sm font-bold transition-all ${
                  activeLang === 'TH' ? 'bg-[#2323E6] text-white' : 'text-gray-500'
                }`}
              >
                TH
              </button>
              <button 
                onClick={() => setActiveLang('EN')}
                className={`px-6 py-2 rounded text-sm font-bold transition-all ${
                  activeLang === 'EN' ? 'bg-[#2323E6] text-white' : 'text-gray-500'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}