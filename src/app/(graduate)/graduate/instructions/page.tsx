// src/app/(graduate)/graduate/instructions/page.tsx
'use client';

import { InstructionContent } from '@/components/graduate';

export default function InstructionsPage() {
  return (
    // ปรับ py-10 ให้ระยะห่างบนล่างดูไม่อึดอัด
    <div className="min-h-screen bg-[#F8F9FA] py-5 px-4 md:px-6 font-['Prompt'] flex justify-center">
      
      {/* แก้ไขตรงนี้: 
         - เปลี่ยน max-w-5xl เป็น max-w-[1280px] (หรือ max-w-7xl) เพื่อให้กว้างเต็มตาเหมือนใน Figma
         - w-full เพื่อให้ยืดเต็มที่ในจอมือถือ
      */}
      <div className="w-full max-w-7xl">
        <InstructionContent />
      </div>

    </div>
  );
}