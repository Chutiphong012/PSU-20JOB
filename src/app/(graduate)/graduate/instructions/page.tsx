// src/app/(graduate)/graduate/instructions/page.tsx
'use client';

import { InstructionContent } from '@/components/graduate'; 

export default function InstructionsPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-0 pb-10 px-0 md:px-6 font-['Prompt'] flex justify-center">
      
      <div className="w-full max-w-7xl">
        <InstructionContent />
      </div>

    </div>
  );
}