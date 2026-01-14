// src/app/(graduate)/graduate/page.tsx

'use client';

import { useState } from 'react'; // 1. Import useState
import { useAuth } from '@/context/AuthContext';
// Import Component ทั้งหมด (รวม SurveyStatusContent ด้วย)
import { GraduateSidebar, GraduateProfileContent } from '@/components/graduate';
import SurveyStatusContent from '@/components/graduate/SurveyStatusContent'; // ตรวจสอบ path import ให้ถูกต้องตามโปรเจกต์คุณ

export default function GraduateProfilePage() {
  const { user, logout } = useAuth();
  
  // 2. สร้าง State สำหรับสลับ Tab
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="font-['Prompt'] bg-[#F8F9FA] min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* 3. ส่ง State ไปให้ Sidebar ควบคุม */}
            <GraduateSidebar 
                user={user} 
                logout={logout} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
            />

            {/* 4. แสดงผลตาม Tab ที่เลือก */}
            {activeTab === 'profile' ? (
                <GraduateProfileContent user={user} />
            ) : (
                <SurveyStatusContent />
            )}

        </div>
      </div>
    </div>
  );
}