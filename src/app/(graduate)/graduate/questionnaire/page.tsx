// src/app/(graduate)/graduate/questionnaire/page.tsx
"use client";

import { useState, useCallback, Suspense } from "react";
import {
  QuestionnaireSidebar,
  ProgressData,
} from "@/components/graduate/questionnaire/steps/QuestionnaireSidebar";
import { QuestionnaireForm } from "@/components/graduate/questionnaire/steps/QuestionnaireForm";
import { useSearchParams } from "next/navigation";

function QuestionnaireContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const [showSidebar, setShowSidebar] = useState(mode !== "success");

  const [progressData, setProgressData] = useState<ProgressData>({});

  // ✅ State สำหรับควบคุมการเปิด Sidebar และ Active Part
  const [currentPart, setCurrentPart] = useState(1);
  const [forceOpenSection, setForceOpenSection] = useState<number | null>(1);

  const handleProgressUpdate = useCallback((key: string, percent: number) => {
    setProgressData((prev) => {
      if (prev[key] === percent) return prev;
      return { ...prev, [key]: percent };
    });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-0 md:gap-6 items-start w-full">
      {showSidebar && (
        <div className="hidden lg:block w-fit shrink-0 transition-all duration-500">
          <QuestionnaireSidebar
            progressData={progressData}
            forceOpenSection={forceOpenSection}
            currentPart={currentPart} // ✅ ส่ง Part ปัจจุบันไป Highlight
            onNavigate={(partId) => setCurrentPart(partId)} // ✅ รับคำสั่งเปลี่ยนหน้าจาก Sidebar
          />
        </div>
      )}

      <main className="flex-1 w-full transition-all duration-500">
        <QuestionnaireForm
          onProgressUpdate={handleProgressUpdate}
          onComplete={() => setShowSidebar(false)}
          initialStep={mode === "success" ? "success" : "check"}
          onRequestOpenSidebarSection={(sec) => setForceOpenSection(sec)}
          
          // ✅ Control Props: ส่ง state และฟังก์ชันควบคุมไปที่ Form
          externalCurrentPart={currentPart} 
          onPartChange={(part) => setCurrentPart(part)}
        />
      </main>
    </div>
  );
}

export default function QuestionnairePage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] py-0 md:py-8 font-['Prompt']">
      <div className="w-full max-w-screen-2xl mx-auto px-0 md:px-4">
        <Suspense fallback={<div>Loading...</div>}>
          <QuestionnaireContent />
        </Suspense>
      </div>
    </div>
  );
}
