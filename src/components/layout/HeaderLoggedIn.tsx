'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, LogOut, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import psuLogo from '../../assets/psu1.png'; 

const navItems = [
  { label: 'หน้าแรก', href: '/' },
  { label: 'ข่าวประชาสัมพันธ์', href: '/news' },
  { label: 'รายงาน', href: '/news?category=รายงาน' },
  { label: 'ติดต่อเรา', href: '/contact' },
];

export default function HeaderLoggedIn() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<'TH' | 'EN'>('TH');
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <header className="sticky top-0 w-full bg-white z-50 font-['Prompt'] shadow-sm/50">
      <div className="max-w-360 mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-25">
          
          {/* Logo */}
          <div className="flex items-center gap-5">
            <Link href="/" className="flex items-center">
              <Image src={psuLogo} alt="PSU Logo" className="h-13 w-auto object-contain" width={70} height={70} />
            </Link>
            <div className="hidden xl:flex flex-col justify-center">
              <h1 className="text-[#001C54] text-lg font-bold tracking-tight leading-tight">ภาวะการมีงานทำของบัณฑิต</h1>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="bg-white text-gray-600 px-6 py-2.5 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.12)] hover:text-[#2666B0] hover:-translate-y-0.5 transition-all duration-300 text-sm font-medium whitespace-nowrap">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Section (Profile Dropdown) */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="text-sm font-semibold flex items-center gap-4 text-gray-400">
              <button onClick={() => setActiveLang('TH')} className={`transition-colors duration-200 ${activeLang === 'TH' ? 'text-[#2666B0]' : 'hover:text-gray-600'}`}>TH</button>
              <div className="h-4 w-px bg-gray-200"></div>
              <button onClick={() => setActiveLang('EN')} className={`transition-colors duration-200 ${activeLang === 'EN' ? 'text-[#2666B0]' : 'hover:text-gray-600'}`}>EN</button>
            </div>

            {/* ✅ ส่วนที่แก้ไข: Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`flex items-center gap-3 pl-1.5 pr-4 py-1.5 rounded-full shadow-md transition-all duration-300 group ${
                        isDropdownOpen 
                        ? 'bg-white text-gray-700 ring-2 ring-gray-100' // ⚪️ ตอนกด: สีขาว (ตามรูป)
                        : 'bg-linear-to-r from-[#2C62C7] to-[#18305D] text-white hover:shadow-lg hover:-translate-y-0.5' // 🔵 ปกติ: สีน้ำเงิน
                    }`}
                >
                    {/* ไอคอน User */}
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                        isDropdownOpen
                        ? 'bg-gray-600 text-white' // ⚪️ ตอนกด: วงกลมเทาเข้ม ไอคอนขาว
                        : 'border-2 border-white bg-white/10' // 🔵 ปกติ: วงกลมใส ขอบขาว
                    }`}>
                        <User size={20} className={isDropdownOpen ? 'text-white' : 'text-white'} />
                    </div>
                    
                    {/* ชื่อ User */}
                    <span className="text-sm font-medium tracking-wide pr-1">
                        {user?.name || "User"}
                    </span>
                    
                    {/* ลูกศร Dropdown */}
                    <ChevronDown size={16} className={`transition-transform duration-300 ${
                        isDropdownOpen ? 'rotate-180 text-gray-500' : 'text-white/90'
                    }`} />
                </button>

                {/* ✅ เมนู Dropdown (ธีมสีขาว) */}
                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 border border-gray-100 origin-top-right">
                        <div className="py-2">
                            {/* ข้อมูลส่วนตัว */}
                            <Link href="/profile" className="flex items-center gap-3 px-5 py-3 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                                <div className="bg-gray-100 p-1.5 rounded-full text-gray-500"><User size={16} /></div>
                                ข้อมูลส่วนตัว
                            </Link>
                            
                            {/* เส้นคั่นบางๆ */}
                            <div className="mx-4 my-1 border-t border-gray-100"></div>
                            
                            {/* ออกจากระบบ */}
                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-5 py-3 text-sm text-gray-600 hover:bg-gray-50 transition-colors text-left"
                            >
                                <div className="bg-gray-100 p-1.5 rounded-full text-gray-500"><LogOut size={16} /></div>
                                ออกจากระบบ
                            </button>
                        </div>
                    </div>
                )}
            </div>
          </div>

          {/* Mobile Menu Button (คงเดิม) */}
          <div className="lg:hidden flex items-center gap-3">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-[#2666B0] focus:outline-none p-1">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
          <div className="lg:hidden absolute top-25 left-0 w-full bg-white border-t border-gray-100 shadow-xl py-4 px-4 flex flex-col gap-2 z-50 h-[calc(100vh-100px)] overflow-y-auto">
             <div className="bg-[#18305D] p-4 rounded-xl flex items-center gap-3 mb-2 text-white shadow-lg">
                <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center border-2 border-white/30">
                    <User size={24} className="text-white"/>
                </div>
                <div>
                    <div className="font-bold text-lg">{user?.name || "User"}</div>
                    <div className="text-xs text-blue-200 opacity-80">{user?.role || "บัณฑิต"}</div>
                </div>
             </div>
             {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-xl text-gray-600 hover:bg-blue-50 font-medium">{item.label}</Link>
             ))}
             <div className="border-t border-gray-100 my-2"></div>
             <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 rounded-xl text-gray-600 hover:bg-blue-50 flex items-center gap-2">
                <User size={18}/> ข้อมูลส่วนตัว
             </Link>
             <button onClick={handleLogout} className="px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 text-left flex items-center gap-2 w-full">
                <LogOut size={18} /> ออกจากระบบ
             </button>
          </div>
      )}
    </header>
  );
}