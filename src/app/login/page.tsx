'use client';

import { LoginBanner, LoginForm } from '@/components/login';

export default function LoginPage() {
  return (
    <div className="font-['Prompt'] bg-[#F8F9FA] min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
      
      {/* Main Card Container */}
      <div className="bg-white rounded-[40px] shadow-lg border border-gray-100 p-4 md:p-6 flex flex-col md:flex-row w-full max-w-250 min-h-150 gap-8">
        
        {/* ฝั่งซ้าย */}
        <LoginBanner />

        {/* ฝั่งขวา (รวม Logic การสลับ Tab ไว้ข้างในแล้ว) */}
        <LoginForm />

      </div>
    </div>
  );
}