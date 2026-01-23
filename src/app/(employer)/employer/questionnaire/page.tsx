"use client";

import { useState } from "react";

// ✅ 1. import SurveySuccessStep
import { 
  InstructionStep, 
  EmployerQuestionnaireForm, 
  SurveySuccessStep 
} from "@/components/employer"; 

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

  // ✅ เพิ่มฟังก์ชัน: เมื่อกด "ปิดหน้าต่าง" ให้กลับไปหน้า Instruction
  const handleBackToInstruction = () => {
    setCurrentStep('instruction');
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
        <SurveySuccessStep 
          // ✅ ส่ง prop นี้เข้าไปเพื่อให้ปุ่มทำงานได้จริง
          onBackToInstruction={handleBackToInstruction} 
        />
      )}

    </main>
  );
}