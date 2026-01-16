// src/app/(graduate)/graduate/questionnaire/page.tsx
'use client';

import { useState, useCallback } from 'react'; 
import { QuestionnaireSidebar, QuestionnaireForm } from '@/components/graduate';

export default function QuestionnairePage() {
  // เก็บ Progress แยกแต่ละ Part { 1: 50, 2: 100, 3: 0 }
  const [partsProgress, setPartsProgress] = useState<Record<number, number>>({});
  const [completedParts, setCompletedParts] = useState<number[]>([]);

  // กำหนดจำนวน Part ทั้งหมด (เพื่อเอาไปหารหาค่าเฉลี่ยรวม)
  const TOTAL_PARTS = 5;

  // คำนวณ Overall Progress (เฉลี่ยจากทุก Part)
  const overallProgress = Math.round(
    Object.values(partsProgress).reduce((a, b) => a + b, 0) / TOTAL_PARTS
  );

  // ✅ แก้ไข: ใช้ useCallback และเช็คค่าซ้ำเพื่อหยุด Infinite Loop
  const handleProgressUpdate = useCallback((partId: number, percent: number) => {
    setPartsProgress((prev) => {
      // 🔥 ถ้าค่าเดิมเท่ากับค่าใหม่เป๊ะๆ ให้ return prev (ไม่ trigger render ใหม่) -> หยุด Loop
      if (prev[partId] === percent) {
        return prev;
      }
      // ถ้าค่าเปลี่ยน ค่อยอัปเดต
      return {
        ...prev,
        [partId]: percent,
      };
    });
  }, []);

  const handlePartComplete = useCallback((partId: number) => {
    setCompletedParts((prev) => {
        if (prev.includes(partId)) return prev;
        return [...prev, partId];
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-8 font-['Prompt']">
      <div className="container mx-auto px-4 max-w-screen-2xl">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
            
            <QuestionnaireSidebar 
               // ส่งค่า Part 1 ไปโชว์ที่วงกลมเล็ก (ถ้ายังไม่มีค่าให้เป็น 0)
               part1Progress={partsProgress[1] || 0}
               completedSections={completedParts} 
               overallProgress={overallProgress} 
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