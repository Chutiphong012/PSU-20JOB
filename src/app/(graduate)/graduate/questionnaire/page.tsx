// src/app/(graduate)/graduate/questionnaire/page.tsx
'use client';

import { useState } from 'react';
import { QuestionnaireSidebar, QuestionnaireForm } from '@/components/graduate';

export default function QuestionnairePage() {
  const [progressPart1, setProgressPart1] = useState(0);
  const [completedParts, setCompletedParts] = useState<number[]>([]);

  // สมมติว่ามีทั้งหมด 5 ตอน ให้ตอนที่ 1 มีน้ำหนัก 20% ของคะแนนรวม
  // สูตร: (Progress ตอน 1 * 0.2) + (Progress ตอน 2 * 0.2) + ...
  const overallProgress = Math.round(progressPart1 * 0.2); 

  const handleProgressUpdate = (percent: number) => {
    setProgressPart1(percent);
  };

  const handlePartComplete = (partId: number) => {
    if (!completedParts.includes(partId)) {
        setCompletedParts(prev => [...prev, partId]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-8 font-['Prompt']">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="flex flex-col lg:flex-row gap-6 items-start">
            
            <QuestionnaireSidebar 
               part1Progress={progressPart1}      // วงกลมเล็ก: แสดง 100% (เฉพาะตอน 1)
               completedSections={completedParts} 
               overallProgress={overallProgress}  // Profile Card: แสดง 20% (ภาพรวม)
            />
            
            <QuestionnaireForm 
               onProgressUpdate={handleProgressUpdate} 
               onPartComplete={handlePartComplete}     
            />

        </div>

      </div>
    </div>
  );
}