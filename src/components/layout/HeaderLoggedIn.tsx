// src/components/layout/HeaderLoggedIn.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, LogOut, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import psuLogo from '../../assets/psu3.png';

const navItems = [
  { label: 'หน้าแรก', href: '/' },
  { label: 'ข่าวประชาสัมพันธ์', href: '/news' },
  { label: 'รายงาน', href: '/news?category=รายงาน' },
  { label: 'ติดต่อเรา', href: '/contact' },
  { label: 'Dashboard', href: '/dashboard' },
];

export default function HeaderLoggedIn() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<'TH' | 'EN'>('TH');

  const pathname = usePathname();
  const [activeNav, setActiveNav] = useState('/');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname) {
      setActiveNav(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    setActiveNav(href);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 w-full bg-white z-50 font-['Prompt'] border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16 md:h-20 lg:h-24 transition-all duration-300">

          {/* --- Logo --- */}
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/" className="flex items-center" onClick={() => setActiveNav('/')}>
              <Image
                src={psuLogo}
                alt="PSU Logo"
                className="h-10 md:h-14 lg:h-22.5 w-auto object-contain transition-all duration-300"
                width={240}
                height={90}
                priority
              />
            </Link>
          </div>

          {/* --- Desktop Menu --- */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => {
              const isActive = activeNav === item.href || (item.href !== '/' && activeNav.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className={`
                    font-medium text-base transition-all duration-200 py-1 border-b-2 whitespace-nowrap
                    ${isActive
                      ? 'text-[#2323E6] border-[#2323E6]'
                      : 'text-[#292A34] border-transparent hover:text-[#2323E6] hover:border-[#2323E6]'
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* --- Right Section (Language & Profile) --- */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">

            {/* Language Toggle */}
            <div className="flex bg-gray-100 rounded-md p-1">
              <button onClick={() => setActiveLang('TH')} className={`px-3 py-1 rounded text-xs font-bold transition-all duration-200 ${activeLang === 'TH' ? 'bg-[#2323E6] text-white shadow-sm' : 'text-[#2323E6] hover:bg-gray-200'}`}>TH</button>
              <button onClick={() => setActiveLang('EN')} className={`px-3 py-1 rounded text-xs font-bold transition-all duration-200 ${activeLang === 'EN' ? 'bg-[#2323E6] text-white shadow-sm' : 'text-[#2323E6] hover:bg-gray-200'}`}>EN</button>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`flex items-center gap-3 px-2 py-1.5 rounded-xl border transition-all duration-200 group
                        ${isDropdownOpen
                            ? 'bg-white border-[#2323E6] text-[#292A34]' // Active: ขาว ขอบน้ำเงิน ตัวหนังสือดำ (ตามรูปตอนเปิด)
                            : 'bg-[#2323E6] border-[#2323E6] text-white hover:bg-[#1e1eb8]' // Default: น้ำเงินทึบ ตัวหนังสือขาว
                        }
                    `}
                >
                    {/* Icon Circle */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
                        ${isDropdownOpen ? 'bg-gray-100 text-[#555]' : 'bg-white/20 text-white'}
                    `}>
                        <User size={18} />
                    </div>

                    {/* Name */}
                    <span className="text-sm font-medium max-w-30 truncate pr-1">
                        {user?.name || "User"}
                    </span>

                    {/* Arrow */}
                    <ChevronDown size={16} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[#292A34]' : 'text-white'}`} />
                </button>

                {/* Dropdown Menu (แสดงเฉพาะเมนูตามรูป) */}
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                        <div className="py-2">
                            {/* เมนู 1: ข้อมูลส่วนตัว */}
                            <Link href="/graduate" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:text-[#2323E6] hover:bg-blue-50 transition-colors">
                                <div className="bg-gray-100 p-1 rounded-full"><User size={16} /></div>
                                ข้อมูลส่วนตัว
                            </Link>

                            <div className="mx-3 my-1 border-t border-gray-100"></div>

                            {/* เมนู 2: ออกจากระบบ */}
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors text-left"
                            >
                                <div className="bg-gray-100 p-1 rounded-full"><LogOut size={16} /></div>
                                ออกจากระบบ
                            </button>
                        </div>
                    </div>
                )}
            </div>
          </div>

          {/* --- Mobile Menu Button --- */}
          <div className="lg:hidden flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#2323E6] border border-gray-200">
                <User size={16} />
             </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-[#2323E6] focus:outline-none p-1">
              {isMenuOpen ? <X size={24} className="sm:w-7 sm:h-7" /> : <Menu size={24} className="sm:w-7 sm:h-7" />}
            </button>
          </div>

        </div>
      </div>

      {/* --- Mobile Menu Overlay --- */}
      {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl py-4 px-4 flex flex-col gap-2 z-50 h-[calc(100vh-64px)] overflow-y-auto animate-in slide-in-from-top-2">
              <div className="bg-blue-50 p-4 rounded-xl flex items-center gap-3 mb-2 border border-blue-100">
                <div className="bg-[#2323E6] w-12 h-12 rounded-full flex items-center justify-center shadow-md">
                    <User size={24} className="text-white"/>
                </div>
                <div className="overflow-hidden">
                    <div className="font-bold text-lg text-[#292A34] truncate">{user?.name || "User"}</div>
                    <div className="text-xs text-[#2323E6]">{user?.role || "บัณฑิต"}</div>
                </div>
             </div>

             {navItems.map((item) => {
                const isActive = activeNav === item.href;
                return (
                    <Link key={item.href} href={item.href} onClick={(e) => handleScroll(e, item.href)}
                        className={`px-4 py-3 rounded-lg font-medium text-sm transition-all
                        ${isActive ? 'text-[#2323E6] bg-blue-50 font-bold' : 'text-gray-600 hover:text-[#2323E6] hover:bg-gray-50'}`}
                    >
                        {item.label}
                    </Link>
                )
             })}

             <div className="border-t border-gray-100 my-2"></div>

             <Link href="/graduate" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-lg text-gray-600 hover:text-[#2323E6] hover:bg-blue-50 flex items-center gap-2 text-sm font-medium">
                <User size={18}/> ข้อมูลส่วนตัว
             </Link>

             <button onClick={handleLogout} className="px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 text-left flex items-center gap-2 w-full text-sm font-medium">
                <LogOut size={18} /> ออกจากระบบ
             </button>

             <div className="mt-4 flex justify-center">
                <div className="flex bg-gray-100 rounded-md p-1 w-fit">
                    <button onClick={() => setActiveLang('TH')} className={`px-6 py-2 rounded text-sm font-bold transition-all ${activeLang === 'TH' ? 'bg-[#2323E6] text-white' : 'text-gray-500'}`}>TH</button>
                    <button onClick={() => setActiveLang('EN')} className={`px-6 py-2 rounded text-sm font-bold transition-all ${activeLang === 'EN' ? 'bg-[#2323E6] text-white' : 'text-gray-500'}`}>EN</button>
                </div>
             </div>
          </div>
      )}
    </header>
  );
}