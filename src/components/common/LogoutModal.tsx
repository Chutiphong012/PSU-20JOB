// src/components/common/LogoutModal.tsx

'use client';

import { LogOut, X } from 'lucide-react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  // ถ้าไม่เปิด ไม่ต้อง Render อะไรเลย
  if (!isOpen) return null;

  return (
    // Overlay พื้นหลัง: เพิ่ม transition เพื่อความนุ่มนวล
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all duration-200">
      
      {/* Container: ปรับความโค้งเป็น 40px, ปรับ padding, เพิ่ม animation ตอนเด้งขึ้นมา */}
      <div className="bg-white w-full max-w-140 rounded-[40px] px-8 py-10 relative flex flex-col items-center shadow-2xl animate-in zoom-in-95 duration-200 ease-out">
        
        {/* Close Button: ปรับตำแหน่งเล็กน้อย */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
        >
          <X size={24} />
        </button>

        {/* Icon: เพิ่มความหนาเส้น (strokeWidth) เป็น 3 */}
        <div className="mb-5 mt-2">
            <LogOut size={72} className="text-[#B91C1C]" strokeWidth={3} />
        </div>

        {/* Text Header: ปรับระยะห่างด้านล่าง (mb-3) */}
        <h3 className="text-black text-xl md:text-2xl font-bold mb-3 text-center leading-tight">
            คุณต้องการออกจากระบบใช่หรือไม่ ?
        </h3>
        
        {/* Text Subtitle: ปรับระยะห่างด้านล่างให้มากขึ้น (mb-10) */}
        <p className="text-gray-400 text-sm md:text-base font-medium mb-10 text-center">
            คุณจะต้องเข้าสู่ระบบอีกครั้งเมื่อต้องการใช้งาน
        </p>

        {/* Buttons: ปรับความสูง (py-3.5) และความโค้ง (rounded-2xl) */}
        <div className="flex gap-4 w-90 justify-center">
            {/* ปุ่ม ไม่ */}
            <button 
                onClick={onClose}
                className="flex-1 bg-[#888888] hover:bg-[#777777] text-white py-3.5 rounded-2xl font-bold text-lg transition-colors cursor-pointer shadow-sm"
            >
                ไม่
            </button>
            
            {/* ปุ่ม ใช่ */}
            <button 
                onClick={onConfirm}
                className="flex-1 bg-[#B91C1C] hover:bg-[#991b1b] text-white py-3.5 rounded-2xl font-bold text-lg transition-colors cursor-pointer shadow-sm"
            >
                ใช่
            </button>
        </div>

      </div>
    </div>
  );
}