"use client";

import { useState } from "react";

// ✅ แก้ไข Import ให้เรียกจาก index.ts ตัวหลักที่สร้างไว้
import { InstructionStep, EmployerQuestionnaireForm } from "@/components/employer"; 

export default function QuestionnairePage() {
  // State สำหรับเช็คสถานะ: 'instruction' | 'form' | 'success'
  const [currentStep, setCurrentStep] = useState<'instruction' | 'form' | 'success'>('instruction');

  // ฟังก์ชันเมื่อกดเริ่มทำ (จากหน้า Instruction)
  const handleStartSurvey = () => {
    setCurrentStep('form');
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ฟังก์ชันเมื่อทำแบบสอบถามเสร็จ (จากหน้า Form)
  const handleCompleteSurvey = () => {
    setCurrentStep('success');
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#F4F9FF]"> {/* พื้นหลังสีฟ้าอ่อนรวม */}
      
      {/* 1. หน้าคำชี้แจง */}
      {currentStep === 'instruction' && (
        <InstructionStep onNext={handleStartSurvey} />
      )}

      {/* 2. หน้าฟอร์มแบบสอบถาม */}
      {currentStep === 'form' && (
        <div className="p-4 md:p-8 animate-in fade-in zoom-in-95 duration-500">
           <EmployerQuestionnaireForm onComplete={handleCompleteSurvey} />
        </div>
      )}

      {/* 3. หน้าขอบคุณ (Success) */}
      {currentStep === 'success' && (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-8 animate-in fade-in slide-in-from-bottom-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-5xl">🎉</span>
            </div>
            <h1 className="text-3xl font-bold text-[#0057D9] mb-4">ขอบคุณสำหรับการตอบแบบสอบถาม</h1>
            <p className="text-gray-500 max-w-md mx-auto">
                ข้อมูลของท่านมีประโยชน์อย่างยิ่งต่อการพัฒนาหลักสูตรและบัณฑิตของเรา
            </p>
            <button 
                onClick={() => window.location.href = '/'} // หรือลิ้งค์กลับหน้าแรกตามต้องการ
                className="mt-8 px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-black transition-all shadow-lg"
            >
                กลับสู่หน้าหลัก
            </button>
        </div>
      )}

    </main>
  );
}