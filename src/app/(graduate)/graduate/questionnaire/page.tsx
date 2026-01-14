// src/app/(graduate)/graduate/questionnaire/page.tsx
'use client';

// Import จาก index.ts ตามที่คุณต้องการ
import { QuestionnaireSidebar, QuestionnaireForm } from '@/components/graduate';

export default function QuestionnairePage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] py-8 font-['Prompt']">
      <div className="container mx-auto px-4 max-w-350">
        
        {/* Layout: Sidebar ซ้าย - Form ขวา */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
            
            <QuestionnaireSidebar />
            
            <QuestionnaireForm />

        </div>

      </div>
    </div>
  );
}