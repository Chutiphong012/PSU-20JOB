'use client';

import { useAuth } from '@/context/AuthContext'; // 1. เรียกใช้ Context
import Link from 'next/link';

export default function QRCodeThaIDPage() {
  const { login } = useAuth(); // 2. ดึงฟังก์ชัน login มาใช้

  // ฟังก์ชันจำลองการ Login เมื่อกด QR Code
  const handleLogin = () => {
    console.log("Login with ThaiID Success");
    
    // 3. ใช้ฟังก์ชัน login() แทนการ setItem เอง
    // ระบบจะจัดการทั้ง localStorage และ Redirect ให้เอง ทำให้ Header เปลี่ยนทันที
    login("Thai Citizen"); 
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#EBF3FA] relative overflow-hidden font-['Prompt']">
      
      {/* --- Header: Logo --- */}
      <div className="relative w-full p-6 md:absolute md:top-0 md:left-0 md:p-10 md:w-auto z-20 flex justify-start">
         {/* Link กลับไปหน้า Login หลัก */}
         <Link href="/login" className="flex items-center gap-2 text-[#4879C5] hover:underline font-medium text-sm">
            &lt; กลับไปหน้าเข้าสู่ระบบ
         </Link>
      </div>

      {/* --- Main Content --- */}
      <main className="grow flex flex-col items-center justify-center px-4 py-4 md:py-12 relative z-10">
        
        {/* Card Container */}
        <div className="w-full max-w-90 bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col border border-blue-100 relative mb-6">
            
            {/* 1. ส่วนหัวสีฟ้า */}
            <div className="bg-[#4879C5] text-white text-center py-6 px-6">
                <h2 className="text-xl font-medium mb-1 tracking-wide">เข้าสู่ระบบด้วย ThaiID</h2>
                <p className="text-sm font-light opacity-90 mb-4">ระบบภาวะมีงานทำของบัณฑิต</p>
                <div className="text-xs opacity-80 font-mono bg-white/10 inline-block px-3 py-1 rounded-full">
                    หมดเวลาใน : 00:55
                </div>
            </div>

            {/* 2. ส่วนแสดง QR Code (Clickable) */}
            <div className="bg-white p-6 md:p-8 flex flex-col items-center justify-center min-h-75">
                
                {/* ✅ Click เพื่อ Login ผ่าน Context */}
                <div 
                    onClick={handleLogin}
                    className="relative group cursor-pointer hover:scale-105 transition-transform duration-200"
                    title="คลิกเพื่อจำลองการสแกนสำเร็จ"
                >
                    {/* กรอบ QR Code */}
                    <div className="w-48 h-48 bg-white p-2 border-4 border-gray-800 rounded-lg flex items-center justify-center">
                        <img 
                            src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=LoginSuccess" 
                            alt="QR Code Mockup" 
                            className="w-full h-full object-contain opacity-90"
                        />
                    </div>
                    
                    {/* Logo ThaiID ตรงกลาง */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-white px-2 py-1 rounded border border-gray-200 shadow-sm">
                            <span className="text-[#3A77CD] font-bold text-sm">Thai<span className="text-[#F4A900]">D</span></span>
                        </div>
                    </div>
                </div>

                <p className="mt-6 text-gray-400 text-xs font-light text-center">
                    (คลิกที่ QR Code เพื่อจำลองการสแกนสำเร็จ)
                </p>
            </div>

            {/* 3. ส่วนท้ายการ์ด */}
            <div className="bg-[#4879C5] text-white text-center py-3 px-4 relative">
                <div className="space-y-0.5 opacity-80 text-[10px] font-light leading-tight">
                    <p>ตัวอย่างนี้จัดทำเพื่อเป็นสื่อยืนยันตัวตนทางดิจิทัล ออกให้โดย</p>
                    <p>กรมการปกครอง กระทรวงมหาดไทย</p>
                </div>
                <span className="absolute bottom-1 right-2 text-[9px] opacity-50">v.1.3.0</span>
            </div>
        </div>
      </main>


    </div>
  );
}