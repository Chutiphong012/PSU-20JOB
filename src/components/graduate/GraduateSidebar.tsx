// src/components/graduate/GraduateSidebar.tsx

'use client';

import { useState } from 'react'; // 1. เพิ่ม useState
import Link from 'next/link';
import { User, Home, FileCheck, LogOut } from 'lucide-react';
import { graduateSidebarUser } from '@/data/graduateData';

import LogoutModal from '@/components/common/LogoutModal';

interface GraduateSidebarProps {
  user: any;
  logout: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function GraduateSidebar({ user, logout, activeTab, onTabChange }: GraduateSidebarProps) {
  // 3. สร้าง State ควบคุมการเปิด/ปิด Modal
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const displayUser = {
    name: user?.name || graduateSidebarUser.name,
    studentId: user?.studentId || graduateSidebarUser.studentId,
    degree: user?.degree || graduateSidebarUser.degree 
  };

  // 4. ฟังก์ชันเมื่อกดยืนยันใน Popup
  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false); // ปิด Popup
    logout();                    // ทำการ Logout จริง
  };

  return (
    <>
      <aside className="w-full lg:w-80 shrink-0 bg-white rounded-3xl p-6 h-fit shadow-sm border border-gray-100">
        
        {/* 1. Profile Section */}
        <div className="flex items-center gap-4 mb-6">
           <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center shrink-0">
              <User size={36} className="text-white" />
           </div>
           
           <div className="flex flex-col overflow-hidden">
              <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[#18305D] font-bold text-lg leading-tight whitespace-nowrap truncate">
                      {displayUser.name}
                  </h3>
                  <span className="bg-[#18305D] text-white text-[10px] px-2 py-0.5 rounded-full shrink-0">
                      {displayUser.degree || 'ปริญญาตรี'}
                  </span>
              </div>
              <p className="text-gray-500 text-sm truncate">
                  {displayUser.studentId}
              </p>
           </div>
        </div>
  
        <hr className="border-gray-200 mb-4" />
  
        {/* 2. Menu Navigation */}
        <nav className="flex flex-col gap-1 mb-4">
            <Link href="/" className="flex items-center gap-4 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl transition-colors font-medium">
                <Home size={22} /> หน้าหลัก
            </Link>
            
            {/* เมนู: ข้อมูลส่วนตัว */}
            <button 
              onClick={() => onTabChange('profile')}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors w-full text-left cursor-pointer
                ${activeTab === 'profile' 
                  ? 'bg-[#E6F0FF] text-[#18305D] font-bold' 
                  : 'text-gray-500 hover:bg-gray-50 font-medium'
                }`}
            >
                <User size={22} /> ข้อมูลส่วนตัว
            </button>
  
            {/* เมนู: สถานะการตอบแบบสอบถาม */}
            <button 
              onClick={() => onTabChange('survey')}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors w-full text-left cursor-pointer
                ${activeTab === 'survey' 
                  ? 'bg-[#E6F0FF] text-[#18305D] font-bold' 
                  : 'text-gray-500 hover:bg-gray-50 font-medium'
                }`}
            >
                <FileCheck size={22} /> สถานะการตอบแบบสอบถาม
            </button>
        </nav>
  
        <hr className="border-gray-200 mb-4" />
  
        {/* 3. Logout Section (แก้ไข onClick ให้เปิด Modal) */}
        <button 
          onClick={() => setIsLogoutModalOpen(true)} 
          className="flex items-center gap-4 px-4 py-2 text-gray-500 hover:text-red-500 transition-colors w-full text-left font-medium cursor-pointer"
        >
            <LogOut size={22} /> ออกจากระบบ
        </button>
  
      </aside>

      {/* 5. เรียกใช้ Modal Component ตรงนี้ */}
      <LogoutModal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}