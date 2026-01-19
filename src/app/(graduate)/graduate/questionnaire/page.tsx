// src/app/(graduate)/graduate/questionnaire/page.tsx
"use client";

import { useState, useCallback, Suspense } from "react";
import { QuestionnaireSidebar, QuestionnaireForm } from "@/components/graduate";
import { useSearchParams } from "next/navigation";

function QuestionnaireContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode"); // รับค่า ?mode=success จาก URL

  const [partsProgress, setPartsProgress] = useState<Record<number, number>>(
    {}
  );
  const [completedParts, setCompletedParts] = useState<number[]>([]);

  // ตั้งค่าเริ่มต้นของ Sidebar: ถ้า mode เป็น success ให้ซ่อนทันที
  const [showSidebar, setShowSidebar] = useState(mode !== "success");

  const TOTAL_PARTS = 5;
  const overallProgress = Math.round(
    Object.values(partsProgress).reduce((a, b) => a + b, 0) / TOTAL_PARTS
  );

  const handleProgressUpdate = useCallback(
    (partId: number, percent: number) => {
      setPartsProgress((prev) => {
        if (prev[partId] === percent) return prev;
        return { ...prev, [partId]: percent };
      });
    },
    []
  );

  const handlePartComplete = useCallback((partId: number) => {
    setCompletedParts((prev) => {
      if (prev.includes(partId)) return prev;
      return [...prev, partId];
    });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* แสดง Sidebar เฉพาะเมื่อไม่ได้อยู่ในโหมดสำเร็จ */}
      {showSidebar && (
        <div className="hidden lg:block w-75 shrink-0 transition-all duration-500">
          <QuestionnaireSidebar
            part1Progress={partsProgress[1] || 0}
            completedSections={completedParts}
            overallProgress={overallProgress}
          />
        </div>
      )}

      {/* ปรับ Main ให้เต็มจอเมื่อซ่อน Sidebar */}
      <main
        className={`flex-1 transition-all duration-500 ${
          !showSidebar ? "w-full flex justify-center" : ""
        }`}
      >
        <QuestionnaireForm
          onProgressUpdate={handleProgressUpdate}
          onPartComplete={handlePartComplete}
          onComplete={() => setShowSidebar(false)} // สั่งซ่อน Sidebar เมื่อกรอกเสร็จ
          initialStep={mode === "success" ? "success" : "check"} // กำหนดหน้าเริ่มต้นตาม URL
        />
      </main>
    </div>
  );
}

export default function QuestionnairePage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] py-8 font-['Prompt']">
      <div className="container mx-auto px-4 max-w-screen-2xl">
        <Suspense fallback={<div>Loading...</div>}>
          <QuestionnaireContent />
        </Suspense>
      </div>
    </div>
  );
}
